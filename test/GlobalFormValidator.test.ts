import FormValidator  from "../FormValidator";
import * as assert from 'assert';
import { ErrorFormValidator } from "../src/error/ErrorFormValidator";
import { ResFormValidator } from '../src/interfaces/FormValidatorInterface';

const PasswordIsNullWithAMessageError: FormValidator = new FormValidator({
    email: {
        required: true,
        type: 'email',
        value: 'test@gmail.com',
    },
    login: {
        required: true,
        type: 'text',
        value: 'alo'
    },
    password: {
        required: true,
        type: 'password',
        crypt: 'bcrypt',
        value: null,
        error: 'Le mot de passe est requis.',
        regex: {
            uppercase: true,
            lowercase: true,
            number: false,
            specialCharacters: true,
            error: 'Le password doit avoir au moins 1 Majuscule, 1 Minuscule, 1 chiffre et 1 char spe',
            length: {
                min: 2,
                max: 70,
                error: 'Le password doit avoir entre 2 et 70 char'
            }
        }
    },
}, 'en');

const PasswordIsNullWithNoMessageErrorEn: FormValidator = new FormValidator({
    email: {
        required: true,
        type: 'email',
        value: 'test@gmail.com',
    },
    login: {
        required: true,
        type: 'text',
        value: 'alo'
    },
    password: {
        required: true,
        type: 'password',
        crypt: 'md5',
        value: null,
        regex: {
            uppercase: false,
            lowercase: true,
            number: false,
            specialCharacters: false,
            error: 'Le password doit avoir au moins 1 Majuscule, 1 Minuscule, 1 chiffre et 1 char spe',
            length: {
                min: 2,
                max: 70,
                error: 'Le password doit avoir entre 2 et 70 char'
            }
        }
    },
}, 'en');
const PasswordIsNullWithNoMessageErrorFr: FormValidator = new FormValidator({
    email: {
        required: true,
        type: 'email',
        value: 'test@gmail.com',
    },
    login: {
        required: true,
        type: 'text',
        value: 'alo'
    },
    password: {
        required: true,
        type: 'password',
        crypt: 'md5',
        value: null,
        regex: {
            uppercase: false,
            lowercase: true,
            number: false,
            specialCharacters: false,
            error: 'Le password doit avoir au moins 1 Majuscule, 1 Minuscule, 1 chiffre et 1 char spe',
            length: {
                min: 2,
                max: 70,
                error: 'Le password doit avoir entre 2 et 70 char'
            }
        }
    },
}, 'fr');


describe('Global test with FormValidator()', () => {
    it('should be fail because they\'ren\'t password', (done) => {
        PasswordIsNullWithAMessageError.checkAll()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le mot de passe est requis.');
            })
            .then(done, done)
    });
})

describe('Test if password is null | undefined with no error message', () => {
    it('should be fail because password is null with FR error', function (done) {
        PasswordIsNullWithNoMessageErrorFr.checkAll()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le mot de passe est requis.');
            })
            .then(done, done)
    });
    it('should be fail because password is null with EN error', function (done) {
        PasswordIsNullWithNoMessageErrorEn.checkAll()
            .then((res: ResFormValidator) => {
                console.log(res);
            })
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Password is required.');
            })
            .then(done, done)
    });
});
