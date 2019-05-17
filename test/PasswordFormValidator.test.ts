import * as assert from 'assert';
import md5 from 'md5';
import sha1 from 'sha1';
import sha256 from 'sha256';
import bcrypt from 'bcrypt';
import { CheckFormPassword } from '../src/check/CheckFormPassword';
import { ErrorFormValidator } from '../src/error/ErrorFormValidator';
import {IResFormValidator, IResultFormValidator} from "../src/interfaces/FormValidatorInterface";

/**
 * Test if password is null | undefined with an error message
 */

const PasswordIsNullWithAMessageError: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'bcrypt',
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
}, 'en');

/**
 * Test if password is null | undefined with no error message
 */

const PasswordIsNullWithNoMessageErrorEn: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
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
}, 'en');
const PasswordIsNullWithNoMessageErrorFr: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
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
}, 'fr');

/**
 * Test password is a wrong hash
 */

const PasswordCheckHashUnkownEn: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'mdd5',
    value: 'qwertyuFEWFW33###iop',
    confirmPassword: 'qwertyuFEWFW33###iop',
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
}, 'en');
const PasswordCheckHashUnkownFr: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'mdd5',
    value: 'qwertyuFEWFW33###iop',
    confirmPassword: 'qwertyuFEWFW33###iop',
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
}, 'fr');


/**
 * Test password is a good hash
 */

const PasswordCheckHashMd5: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'qwertyuFEWFW33###iop',
    confirmPassword: 'qwertyuFEWFW33###iop',
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
}, 'en');
const PasswordCheckHashSha1: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'sha1',
    value: 'qwertyuFEWFW33###iop',
    confirmPassword: 'qwertyuFEWFW33###iop',
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
}, 'en');
const PasswordCheckHashSha256: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'sha256',
    value: 'fewfewfew###iopW2',
    confirmPassword: 'fewfewfew###iopW2',
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
    },
}, 'en');
const PasswordCheckHashBcrypt: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'bcrypt',
    value: 'qwertyuFEWFW33###iop',
    confirmPassword: 'qwertyuFEWFW33###iop',
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
}, 'en');
const PasswordCheckHashPerso: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: () => {return 'lol'},
    value: 'qwertyuFEWFW33###iop',
    confirmPassword: 'qwertyuFEWFW33###iop',
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
}, 'en');

/**
 * Test password regex lowercase with no error message
 */

const PasswordCheckRegexLowerEn: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'FQFQWWFQWFWF',
    confirmPassword: 'FQFQWWFQWFWF',
    regex: {
        uppercase: false,
        lowercase: true,
        number: false,
        specialCharacters: false,
        length: {
            min: 2,
            max: 70,
            error: 'Le password doit avoir entre 2 et 70 char'
        }
    }
}, 'en');
const PasswordCheckRegexLowerFr: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'FQFQWWFQWFWF',
    confirmPassword: 'FQFQWWFQWFWF',
    regex: {
        uppercase: false,
        lowercase: true,
        number: false,
        specialCharacters: false,
        length: {
            min: 2,
            max: 70,
            error: 'Le password doit avoir entre 2 et 70 char'
        }
    }
}, 'fr');

/**
 * Test password regex lowercase with an error message
 */

const PasswordCheckRegexLowerError: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'EFWFWEFWEFWEFWEWF',
    confirmPassword: 'EFWFWEFWEFWEFWEWF',
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
}, 'en');

/**
 * Test password regex length min with no error message
 */

const PasswordCheckRegexLenMinEn: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'q',
    confirmPassword: 'q',
    regex: {
        uppercase: false,
        lowercase: false,
        number: false,
        specialCharacters: false,
        error: 'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial',
        length: {
            min: 2,
            max: 70,
        }
    }
}, 'en');
const PasswordCheckRegexLenMinFr: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'q',
    confirmPassword: 'q',
    regex: {
        uppercase: false,
        lowercase: false,
        number: false,
        specialCharacters: false,
        error: 'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial',
        length: {
            min: 2,
            max: 70,
        }
    }
}, 'fr');

/**
 * Test password regex length min/max with an error message
 */

const PasswordCheckRegexLenMin: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'qefwef4f23fegyfegfueguywfgufyg',
    confirmPassword: 'qefwef4f23fegyfegfueguywfgufyg',
    regex: {
        uppercase: false,
        lowercase: false,
        number: false,
        specialCharacters: false,
        error: 'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial',
        length: {
            min: 200,
            max: 1000,
            error: 'Le password doit avoir entre 2 et 70 char'
        }
    }
}, 'en');
const PasswordCheckRegexLenMax: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'qefwef4f23fegyfegfueguywfgufyg',
    confirmPassword: 'qefwef4f23fegyfegfueguywfgufyg',
    regex: {
        uppercase: false,
        lowercase: false,
        number: false,
        specialCharacters: false,
        error: 'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial',
        length: {
            min: 2,
            max: 10,
            error: 'Le password doit avoir entre 2 et 70 char'
        }
    }
}, 'en');

/**
 * Test password regex length max with no error message
 */

const PasswordCheckRegexLenMaxNoErrorEn: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'qefwef4f23fegyfegfueguywfgufyg',
    confirmPassword: 'qefwef4f23fegyfegfueguywfgufyg',
    regex: {
        uppercase: false,
        lowercase: false,
        number: false,
        specialCharacters: false,
        error: 'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial',
        length: {
            min: 2,
            max: 10
        }
    }
}, 'en');
const PasswordCheckRegexLenMaxNoErrorFr: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'qefwef4f23fegyfegfueguywfgufyg',
    confirmPassword: 'qefwef4f23fegyfegfueguywfgufyg',
    regex: {
        uppercase: false,
        lowercase: false,
        number: false,
        specialCharacters: false,
        error: 'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial',
        length: {
            min: 2,
            max: 10
        }
    }
}, 'fr');

/**
 * Test password regex lowercase and uppercase with an error message
 */
const PasswordCheckRegexLowerUpper: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'qwertyuiop',
    confirmPassword: 'qwertyuiop',
    regex: {
        uppercase: true,
        lowercase: true,
        number: false,
        specialCharacters: false,
        error: 'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial',
        length: {
            min: 2,
            max: 70,
            error: 'Le password doit avoir entre 2 et 70 char'
        }
    }
}, 'en');

/**
 * Test password regex lowercase and uppercase with No error message
 */

const PasswordCheckRegexLowerUpperEn: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'DWDQWDWQDW',
    confirmPassword: 'DWDQWDWQDW',
    regex: {
        uppercase: true,
        lowercase: true,
        number: false,
        specialCharacters: false,
        length: {
            min: 2,
            max: 70,
            error: 'Le password doit avoir entre 2 et 70 char'
        }
    }
}, 'en');
const PasswordCheckRegexLowerUpperFr: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'DWDQWDWQDW',
    confirmPassword: 'DWDQWDWQDW',
    regex: {
        uppercase: true,
        lowercase: true,
        number: false,
        specialCharacters: false,
        length: {
            min: 2,
            max: 70,
            error: 'Le password doit avoir entre 2 et 70 char'
        }
    }
}, 'fr');


/**
 * Test password regex lowercase and uppercase and number with and error message
 */

const PasswordCheckRegexLowerUpperNumberError: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'fewwefewFWEFEWFWF',
    confirmPassword: 'fewwefewFWEFEWFWF',
    regex: {
        uppercase: true,
        lowercase: true,
        number: true,
        specialCharacters: false,
        error: "Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial.",
        length: {
            min: 2,
            max: 70,
            error: 'Le password doit avoir entre 2 et 70 char'
        }
    }
}, 'en');
/**
 * Test password regex lowercase and uppercase and number with no error message
 */

const PasswordCheckRegexLowerUpperNumberErrorEn: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'fewwefewFWEFEWFWF',
    confirmPassword: 'fewwefewFWEFEWFWF',
    regex: {
        uppercase: true,
        lowercase: true,
        number: true,
        specialCharacters: false,
        length: {
            min: 2,
            max: 70,
            error: 'Le password doit avoir entre 2 et 70 char'
        }
    }
}, 'en');
const PasswordCheckRegexLowerUpperNumberErrorFr: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'fewwefewFWEFEWFWF',
    confirmPassword: 'fewwefewFWEFEWFWF',
    regex: {
        uppercase: true,
        lowercase: true,
        number: true,
        specialCharacters: false,
        length: {
            min: 2,
            max: 70,
            error: 'Le password doit avoir entre 2 et 70 char'
        }
    }
}, 'fr');

/**
 * Test password all regex  with an error message
 */
const PasswordCheckAllRegexError: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: '14562dsgsdSDGGSDGSD45515455',
    confirmPassword: '14562dsgsdSDGGSDGSD45515455',
    regex: {
        uppercase: true,
        lowercase: true,
        number: true,
        specialCharacters: true,
        error: "Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial.",
        length: {
            min: 2,
            max: 70,
            error: 'Le password doit avoir entre 2 et 70 char'
        }
    }
}, 'en');

/**
 * Test password all regex  with no error message
 */

const PasswordCheckAllRegexErrorEn: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: '14562dsgsdSDGGSDGSD45515455',
    confirmPassword: '14562dsgsdSDGGSDGSD45515455',
    regex: {
        uppercase: true,
        lowercase: true,
        number: true,
        specialCharacters: true,
        length: {
            min: 2,
            max: 70,
            error: 'Le password doit avoir entre 2 et 70 char'
        }
    }
}, 'en');
const PasswordCheckAllRegexErrorFr: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: '14562dsgsdSDGGSDGSD45515455',
    confirmPassword: '14562dsgsdSDGGSDGSD45515455',
    regex: {
        uppercase: true,
        lowercase: true,
        number: true,
        specialCharacters: true,
        length: {
            min: 2,
            max: 70,
            error: 'Le password doit avoir entre 2 et 70 char'
        }
    }
}, 'fr');

/**
 * Test password if match with confirmPassword with an error message
 */

const PasswordCheckPasswordMatchErrorEn: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'qwertyuFEWFW33###iop',
    confirmPassword: 'qwertyuFFW33###iopd',
    regex: {
        uppercase: true,
        lowercase: true,
        number: false,
        specialCharacters: false,
        error: 'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial',
        length: {
            min: 2,
            max: 70,
            error: 'Le password doit avoir entre 2 et 70 char'
        }
    }
}, 'en');
const PasswordCheckPasswordMatchErrorFr: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'qwertyuFEWFW33###iop',
    confirmPassword: 'qwertyuFFW33###iopd',
    regex: {
        uppercase: true,
        lowercase: true,
        number: false,
        specialCharacters: false,
        error: 'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial',
        length: {
            min: 2,
            max: 70,
            error: 'Le password doit avoir entre 2 et 70 char'
        }
    }
}, 'fr');

/**
 * Test password length min with an error message
 */

const PasswordCheckNoRegexLenMin: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'q',
    confirmPassword: 'q',
    length: {
        min: 2,
        max: 70,
        error: 'min 2 char'
    }
}, 'en');

/**
 * Test password length min with no error message
 */

const PasswordCheckNoRegexLenMinNoErrorEn: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'q',
    confirmPassword: 'q',
    length: {
        min: 2,
        max: 70
    }
}, 'en');
const PasswordCheckNoRegexLenMinNoErrorFr: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'q',
    confirmPassword: 'q',
    length: {
        min: 2,
        max: 70
    }
}, 'fr');

/**
 * Test password length max with an error message
 */

const PasswordCheckNoRegexLenMax: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'qefwef4f23fegyfegfueguywfgufyg',
    confirmPassword: 'qefwef4f23fegyfegfueguywfgufyg',
    length: {
        min: 2,
        max: 10,
        error: 'max 10 char.'
    }
}, 'en');
/**
 * Test password length max with no error message
 */

const PasswordCheckNoRegexLenMaxNoErrorEn: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'qefwef4f23fegyfegfueguywfgufyg',
    confirmPassword: 'qefwef4f23fegyfegfueguywfgufyg',
    length: {
        min: 2,
        max: 10
    }
}, 'en');
const PasswordCheckNoRegexLenMaxNoErrorFr: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'qefwef4f23fegyfegfueguywfgufyg',
    confirmPassword: 'qefwef4f23fegyfegfueguywfgufyg',
    length: {
        min: 2,
        max: 10
    }
}, 'fr');



/**
 * A perfect test all success
 */

const PasswordCheckPasswordMatchSuccess: CheckFormPassword = new CheckFormPassword({
    required: true,
    type: 'password',
    hash: 'md5',
    value: 'qwertyuFEWFW33###iop',
    confirmPassword: 'qwertyuFEWFW33###iop',
    regex: {
        uppercase: true,
        lowercase: true,
        number: false,
        specialCharacters: false,
        error: 'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial',
        length: {
            min: 2,
            max: 70,
            error: 'Le password doit avoir entre 2 et 70 char'
        }
    }
}, 'en');

describe('Test password if match with confirmPassword with an error message', () => {
    it('should be fail because password is null', function (done) {
        PasswordIsNullWithAMessageError.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le mot de passe est requis.');
            })
            .then(done, done)
    });
});

describe('Test if password is null | undefined with no error message EN', () => {
    it('should be fail because password is null with EN error', function (done) {
        PasswordIsNullWithNoMessageErrorEn.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Password is required.');
            })
            .then(done, done)
    });
});
describe('Test if password is null | undefined with no error message FR', () => {
    it('should be fail because password is null with FR error', function (done) {
        PasswordIsNullWithNoMessageErrorFr.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le mot de passe est requis.');
            })
            .then(done, done)
    });
});
describe('Test if a wrong hash', () => {
    it('should be fail because the hash is bad with EN error', function (done) {
        PasswordCheckHashUnkownEn.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'The type of hash is unknown.');
            })
            .then(done, done)
    });
    it('should be fail because the hash is bad with FR error', function (done) {
        PasswordCheckHashUnkownFr.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le type de hash est inconnu.');
            })
            .then(done, done)
    });
});

describe('Test if hash md5 / sha1 / sha256 / bcrypt / Personnal', () => {
    it('should be success with md5 hash', function (done) {
        PasswordCheckHashMd5.checkPassword()
            .then((res: IResFormValidator) => {
                assert.strictEqual((res as IResultFormValidator).password.hash, md5((res as IResultFormValidator).password.value as string));
            })
            .then(done, done)
    });
    it('should be success with sha1 hash', function (done) {
        PasswordCheckHashSha1.checkPassword()
            .then((res: IResFormValidator) => {
                assert.strictEqual((res as IResultFormValidator).password.hash, sha1((res as IResultFormValidator).password.value as string));
            })
            .then(done, done)
    });
    it('should be success with sha256 hash', function (done) {
        PasswordCheckHashSha256.checkPassword()
            .then((res: IResFormValidator) => {
                assert.strictEqual((res as IResultFormValidator).password.hash, sha256((res as IResultFormValidator).password.value as string));
            })
            .then(done, done)
    });
    it('should be success with bcrypt hash', async () => {
        await PasswordCheckHashBcrypt.checkPassword()
            .then(async (res: IResFormValidator) => {
                const hash = bcrypt.hashSync((res as IResultFormValidator).password.value, 10);
                const value = bcrypt.compareSync((res as IResultFormValidator).password.value, hash);
                if (value) {
                    assert.strictEqual(value, true);
                } else {
                    assert.strictEqual(value, true);
                }
            })

    });
    it('should be success with personnal hash', function (done) {
        PasswordCheckHashPerso.checkPassword()
            .then((res: IResFormValidator) => {
                assert.strictEqual((res as IResultFormValidator).password.hash, 'lol');
            })
            .then(done, done)
    });
});

describe('Test password regex lowercase with no error message', () => {
    it('should be fail because they\'ren\'t lowercase with EN error', function (done) {
        PasswordCheckRegexLowerEn.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Password must contain at least a lowercase, an uppercase, a number and a special character.');
            })
            .then(done, done)
    });
    it('should be fail because they\'ren\'t lowercase with FR error', function (done) {
        PasswordCheckRegexLowerFr.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial.');
            })
            .then(done, done)
    });
});
describe('Test password regex lowercase with an error message', () => {
    it('should be fail because they\'ren\'t lowercase with an error EN', function (done) {
        PasswordCheckRegexLowerError.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le password doit avoir au moins 1 Majuscule, 1 Minuscule, 1 chiffre et 1 char spe');
            })
            .then(done, done)
    });
});

describe('Test password regex Length min with no error message', () => {
    it('should be fail because Length min > value length with EN error', function (done) {
        PasswordCheckRegexLenMinEn.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'The field must be between 2 and 70 characters.');
            })
            .then(done, done)
    });
    it('should be fail because Length min > value length with FR error', function (done) {
        PasswordCheckRegexLenMinFr.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le champ doit être entre 2 et 70 caractères.');
            })
            .then(done, done)
    });
});
describe('Test password regex Length min with an error message', () => {
    it('should be fail because Length min > value length', function (done) {
        PasswordCheckRegexLenMin.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le password doit avoir entre 2 et 70 char');
            })
            .then(done, done)
    });
});

describe('Test password regex Length max with no error message', () => {
    it('should be fail because Length max < value length with EN error', function (done) {
        PasswordCheckRegexLenMaxNoErrorEn.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'The field must be between 2 and 10 characters.');
            })
            .then(done, done)
    });
    it('should be fail because Length max < value length with FR error', function (done) {
        PasswordCheckRegexLenMaxNoErrorFr.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le champ doit être entre 2 et 10 caractères.');
            })
            .then(done, done)
    });
});
describe('Test password regex Length max with an error message', () => {
    it('should be fail because Length max < value length', function (done) {
        PasswordCheckRegexLenMax.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le password doit avoir entre 2 et 70 char');
            })
            .then(done, done)
    });
});
describe('Test password regex upper and lower with an error message', () => {
    it('should be fail because they\'ren\'t no uppercase', function (done) {
        PasswordCheckRegexLowerUpper.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial');
            })
            .then(done, done)
    });
});
describe('Test password regex upper and lower with no error message', () => {
    it('should be fail because they\'ren\'t no uppercase EN message', function (done) {
        PasswordCheckRegexLowerUpperEn.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Password must contain at least a lowercase, an uppercase, a number and a special character.');
            })
            .then(done, done)
    });
    it('should be fail because they\'ren\'t no uppercase FR message', function (done) {
        PasswordCheckRegexLowerUpperFr.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial.');
            })
            .then(done, done)
    });
});
describe('Test password regex upper and lower and number with an error message', () => {
    it('should be fail because they\'ren\'t no number', function (done) {
        PasswordCheckRegexLowerUpperNumberError.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial.');
            })
            .then(done, done)
    });
});
describe('Test password regex upper and lower and number with no error message', () => {
    it('should be fail because they\'ren\'t no number EN message', function (done) {
        PasswordCheckRegexLowerUpperNumberErrorEn.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Password must contain at least a lowercase, an uppercase, a number and a special character.');
            })
            .then(done, done)
    });
    it('should be fail because they\'ren\'t no number FR message', function (done) {
        PasswordCheckRegexLowerUpperNumberErrorFr.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial.');
            })
            .then(done, done)
    });
});
describe('Test password all regex with an error message', () => {
    it('should be fail because they\'ren\'t no special char', function (done) {
        PasswordCheckAllRegexError.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial.');
            })
            .then(done, done)
    });
});
describe('Test password all regex with no error message', () => {
    it('should be fail because they\'ren\'t no special char EN message', function (done) {
        PasswordCheckAllRegexErrorEn.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Password must contain at least a lowercase, an uppercase, a number and a special character.');
            })
            .then(done, done)
    });
    it('should be fail because they\'ren\'t no special char FR message', function (done) {
        PasswordCheckAllRegexErrorFr.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial.');
            })
            .then(done, done)
    });
});
describe('Test password if match with confirmPassword', () => {
    it('should be fail because password don\'t match EN message', function (done) {
        PasswordCheckPasswordMatchErrorEn.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Password confirmation doesn\'t match with Password.');
            })
            .then(done, done)
    });
    it('should be fail because password don\'t match FR message', function (done) {
        PasswordCheckPasswordMatchErrorFr.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Les mots de passe ne sont pas identiques.');
            })
            .then(done, done)
    });
});

describe('Test password Length min with no error message', () => {
    it('should be fail because Length min > value length with EN error', function (done) {
        PasswordCheckNoRegexLenMinNoErrorEn.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'The field must be between 2 and 70 characters.');
            })
            .then(done, done)
    });
    it('should be fail because Length min > value length with FR error', function (done) {
        PasswordCheckNoRegexLenMinNoErrorFr.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le champ doit être entre 2 et 70 caractères.');
            })
            .then(done, done)
    });
});
describe('Test password Length min with an error message', () => {
    it('should be fail because Length min > value length', function (done) {
        PasswordCheckNoRegexLenMin.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'min 2 char');
            })
            .then(done, done)
    });
});

describe('Test password Length max with no error message', () => {
    it('should be fail because Length max < value length with EN error', function (done) {
        PasswordCheckNoRegexLenMaxNoErrorEn.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'The field must be between 2 and 10 characters.');
            })
            .then(done, done)
    });
    it('should be fail because Length max < value length with FR error', function (done) {
        PasswordCheckNoRegexLenMaxNoErrorFr.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le champ doit être entre 2 et 10 caractères.');
            })
            .then(done, done)
    });
});
describe('Test password Length max with an error message', () => {
    it('should be fail because Length max < value length', function (done) {
        PasswordCheckNoRegexLenMax.checkPassword()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'max 10 char.');
            })
            .then(done, done)
    });
});

describe('Test password if all success', () => {
    it('should be sucess', function (done) {
        PasswordCheckPasswordMatchSuccess.checkPassword()
            .then((res: IResFormValidator) => {
                assert.strictEqual((res as IResultFormValidator).status, 200)
            })
            .then(done, done)
    });
})
