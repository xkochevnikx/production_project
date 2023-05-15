import { IProfile, ValidateProfileError } from '../../types/profile';
//! функция валидации. принимает данные и валидирует строки , это простенькая валидация на несколько полей. функция возращает массив ошибок перечисленных в типах профайла
export const validateProfileData = (profile?: IProfile) => {
    if (!profile) {
        return [ValidateProfileError.NO_DATA];
    }

    const { first, lastname, age } = profile;

    const errors: ValidateProfileError[] = [];

    if (!first || !lastname) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }

    if (!age || !Number.isInteger(age)) {
        errors.push(ValidateProfileError.INCORRECT_AGE);
    }

    return errors;
};
