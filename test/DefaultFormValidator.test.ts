import FormValidator  from "../FormValidator";
import * as assert from 'assert';
import { ErrorFormValidator } from "../src/error/ErrorFormValidator";
import { CheckFormPassword } from "../src/check/CheckFormPassword";
import { CheckFormDefault } from "../src/check/CheckFormDefault";

const DefaultRegexError: CheckFormDefault = new CheckFormDefault({
    type: 'text',
    required: true,
    value: 'bnoufel',
    regex: new RegExp('[A-Z]')
}, 'en', 'login');

const DefaultTypeRegexError: CheckFormDefault = new CheckFormDefault({
    type: 'text',
    required: true,
    value: 'bnoufel',
    regex: {
        uppercase: false,
        lowercase: false,
        number: false,
        specialCharacters: false,
    }
}, 'en', 'login');

const DefaultLengthError: CheckFormDefault = new CheckFormDefault({
    type: 'text',
    required: true,
    value: 'bnoufel',
    length: {
        min: 50,
        max: 90
    }
}, 'en', 'login');

const DefaultIsNullError: CheckFormDefault = new CheckFormDefault({
    type: 'text',
    required: true,
    value: null,
}, 'en', 'login');

const DefaultIsNullButNoRequired: CheckFormDefault = new CheckFormDefault({
    type: 'text',
    required: false,
    value: null,
}, 'en', 'login');

const DefaultOkWithRegex: CheckFormDefault = new CheckFormDefault({
    type: 'text',
    required: true,
    value: 'bnoufel',
    regex: new RegExp('[a-z]')
}, 'en', 'login');

const DefaultOk: CheckFormDefault = new CheckFormDefault({
    type: 'text',
    required: true,
    value: 'bnoufel',
}, 'en', 'login');

describe('Input is null', () => {
    it('should be fail because value is null or undefined', function (done) {
        DefaultIsNullError.checkForm()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'The field login is required.')
            })
            .then(done, done)
    });
})

describe('Regex error', () => {
    it('should be fail because value don\'t respect regex', function (done) {
        DefaultRegexError.checkForm()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'The format of the input is not valid.')
            })
            .then(done, done)
    });
    it('should be fail because value don\'t respect type regex', function (done) {
        DefaultTypeRegexError.checkForm()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Only RegExp are available.')
            })
            .then(done, done)
    });
    it('should be fail because value don\'t respect length', function (done) {
        DefaultLengthError.checkForm()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'The field must be between 50 and 90 characters.')
            })
            .then(done, done)
    });
})

describe('Test success', () => {
    it('should success because value is null but no required', function (done) {
        DefaultIsNullButNoRequired.checkForm()
            .then(() => {
                assert.strictEqual(1, 1);
            })
            .then(done, done)
    });

    it('should success because Regex is good', function (done) {
        DefaultOkWithRegex.checkForm()
            .then(() => {
                assert.strictEqual(1, 1);
            })
            .then(done, done)
    });

    it('should success because all is good', function (done) {
        DefaultOk.checkForm()
            .then(() => {
                assert.strictEqual(1, 1);
            })
            .then(done, done)
    });
})