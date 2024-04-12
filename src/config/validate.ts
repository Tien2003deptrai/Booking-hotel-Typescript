// define validate name
export const validateName = (name: string) => {
    const nameValidatorRegex = /^[a-zA-Z ]{2,30}$/;
    return nameValidatorRegex.test(name);
}

export const validatePassword = (password: string) => {
    return password.length >= 8;
}

export const validateEmail = (email: string) => {
    const emailValidatorRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailValidatorRegex.test(email);
}