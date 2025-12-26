import {Outlet} from "react-router-dom";
import Header from "../components/Header";

export default function AppLayout() {

    return (
        <div className="flex h-screen  overflow-hidden bg-gradient-to-tl ">

            <div className="flex flex-col flex-1 min-w-0 ">
                <Header/>

                <main className="flex-1 overflow-y-auto p-4  bg-white/80 backdrop-blur-md border-b border-gray-100 flex justify-center ">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}
