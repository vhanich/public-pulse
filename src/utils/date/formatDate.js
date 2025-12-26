export const formatDate = (date) => {
    if (!(date instanceof Date)) {
        throw new Error('formatDate expects Date');
    }

    return date.toLocaleDateString('en-CA');
};
