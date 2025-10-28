/* eslint-env jest */
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import SignUp from "../AuthPages/SignUp.jsx";
import SignIn from "../AuthPages/SignIn";
import ForgotPassword from "../AuthPages/ForgotPassword";
import {BrowserRouter} from "react-router-dom";

describe("Authentication Pages", () => {
    test('Sign In renders Sign In button', () => {
        render(<BrowserRouter><SignIn /></BrowserRouter>);
        expect(screen.getByRole('button', { name: /^sign in$/i })).toBeInTheDocument();
    });
    test('Sign Up renders Sign Up button', () => {
        render(<BrowserRouter><SignUp /></BrowserRouter>);
        expect(screen.getByRole('button',  { name: /^sign up$/i })).toBeInTheDocument();
    });

    test('ForgotPassword  renders Reset Password button', () => {
        render(<BrowserRouter><ForgotPassword /></BrowserRouter>);
        expect(screen.getByRole('button', { name: /^reset password$/i })).toBeInTheDocument();
    });
})