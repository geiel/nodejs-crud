export const generateStudentId = () => {
    const date = new Date();
    return `${date.getFullYear()}-${Math.floor(Math.random() * 9999) + 1111}`;
};