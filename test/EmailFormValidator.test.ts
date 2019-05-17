import { CheckFormEmail } from "../src/check/CheckFormEmail";
import * as assert from 'assert';
import { ErrorFormValidator } from "../src/error/ErrorFormValidator";

const CheckEmailIsUndefinedEn: CheckFormEmail = new CheckFormEmail({
    required: true,
    type: 'email',
    value: null
}, 'en');
const CheckEmailIsUndefinedFr: CheckFormEmail = new CheckFormEmail({
    required: true,
    type: 'email',
    value: null
}, 'fr');

const CheckEmailIsNullEn: CheckFormEmail = new CheckFormEmail({
    required: true,
    type: 'email',
    value: null
}, 'en');
const CheckEmailIsNullFr: CheckFormEmail = new CheckFormEmail({
    required: true,
    type: 'email',
    value: null
}, 'fr');

const CheckEmailIsInvalidRegExpEn: CheckFormEmail = new CheckFormEmail({
    required: true,
    type: 'email',
    value: 'FEWFWEFWEF',
    regex: new RegExp('[a-z]')
}, 'en');
const CheckEmailIsInvalidRegExpFr: CheckFormEmail = new CheckFormEmail({
    required: true,
    type: 'email',
    value: 'FEWFWEFWEF',
    regex: new RegExp('[a-z]')
}, 'fr');

const CheckEmailIsInvalidEn: CheckFormEmail = new CheckFormEmail({
    required: true,
    type: 'email',
    value: 'testgmail.com'
}, 'en');
const CheckEmailIsInvalidFr: CheckFormEmail = new CheckFormEmail({
    required: true,
    type: 'email',
    value: 'testgmail.com'
}, 'fr');

const CheckEmailIsInvalid2En: CheckFormEmail = new CheckFormEmail({
    required: true,
    type: 'email',
    value: 'test@gmailcom'
}, 'en');
const CheckEmailIsInvalid2Fr: CheckFormEmail = new CheckFormEmail({
    required: true,
    type: 'email',
    value: 'test@gmailcom'
}, 'fr');

const CheckEmailIsTooLongEn: CheckFormEmail = new CheckFormEmail({
    required: true,
    type: 'email',
    value: 'tesdyqwgdyuwgduyqwdgugdquwygdquwdgqwuydgwudguyewdguqwydgdgjqwhdgjwgduywqgdyuwqdgqwuydguwygdqwuydgwttesdyqwgdyuwgduyqwdgugdquwygdquwdgqwuydgwudguyewdguqwydgdgjqwhdgjwgduywqgdyuwqdgqwuydguwygdqwuydgwt@dgwqyudgqwuydfuqwyfduwdfwqudfwyudfwqufwuydfwuydfwuydfwudfwudfwudfqwudfwqudfwqudfuwdfuwqdfuwdfwudfuqwdfuqwfdwqudwqdqwdqwdwdwqgmail.tesdyqwgdyuwgduyqwdgugdquwygdquwdgqwuydgwudguyewdguqwydgdgjqwhdgjwgduywqgdyuwqdgqwuydguwygdqwuydgwttesdyqwgdyuwgduyqwdgugdquwygdquwdgqwuydgwudguyewdguqwydgdgjqwhdgjwgduywqgdyuwqdgqwuydguwygdqwuydgwt'
}, 'en');
const CheckEmailIsTooLongFr: CheckFormEmail = new CheckFormEmail({
    required: true,
    type: 'email',
    value: 'tesdyqwgdyuwgduyqwdgugdquwygdquwdgqwuydgwudguyewdguqwydgdgjqwhdgjwgduywqgdyuwqdgqwuydguwygdqwuydgwttesdyqwgdyuwgduyqwdgugdquwygdquwdgqwuydgwudguyewdguqwydgdgjqwhdgjwgduywqgdyuwqdgqwuydguwygdqwuydgwt@dgwqyudgqwuydfuqwyfduwdfwqudfwyudfwqufwuydfwuydfwuydfwudfwudfwudfqwudfwqudfwqudfuwdfuwqdfuwdfwudfuqwdfuqwfdwqudwqdqwdqwdwdwqgmail.tesdyqwgdyuwgduyqwdgugdquwygdquwdgqwuydgwudguyewdguqwydgdgjqwhdgjwgduywqgdyuwqdgqwuydguwygdqwuydgwttesdyqwgdyuwgduyqwdgugdquwygdquwdgqwuydgwudguyewdguqwydgdgjqwhdgjwgduywqgdyuwqdgqwuydguwygdqwuydgwt'
}, 'fr');

const CheckEmailIsValid: CheckFormEmail = new CheckFormEmail({
    required: true,
    type: 'email',
    value: 'test@gmail.com'
}, 'en');

describe('Check email who\'s fail', () => {
    it('should be fail because email is undefined EN', function (done) {
        CheckEmailIsUndefinedEn.checkEmail()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Email is required.');
            }).then(done, done);
    });
    it('should be fail because email is undefined FR', function (done) {
        CheckEmailIsUndefinedFr.checkEmail()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'L\'email est requis.');
            })
            .then(done, done)
    });
    it('should be fail because email is null EN', function (done) {
        CheckEmailIsNullEn.checkEmail()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Email is required.');
            })
            .then(done, done);
    });
    it('should be fail because email is null FR', function (done) {
        CheckEmailIsNullFr.checkEmail()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'L\'email est requis.');
            })
            .then(done, done)
    });
    it('should be fail because email value doesn\'t match with Regexp EN', function (done) {
        CheckEmailIsInvalidRegExpEn.checkEmail()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'The format of the email is not valid.');
            })
            .then(done, done);
    });
    it('should be fail because email value doesn\'t match with Regexp FR', function (done) {
        CheckEmailIsInvalidRegExpFr.checkEmail()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le format de l\'email n\'est pas valide.');
            })
            .then(done, done)
    });
    it('should be fail because email miss @ EN', function (done) {
        CheckEmailIsInvalidEn.checkEmail()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'The format of the email is not valid.');
            })
            .then(done, done);
    });
    it('should be fail because email miss @ FR', function (done) {
        CheckEmailIsInvalidFr.checkEmail()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le format de l\'email n\'est pas valide.');
            })
            .then(done, done);
    });
    it('should be fail because email miss . EN', function (done) {
        CheckEmailIsInvalid2En.checkEmail()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'The format of the email is not valid.');
            })
            .then(done, done);
    });
    it('should be fail because email miss . FR', function (done) {
        CheckEmailIsInvalid2Fr.checkEmail()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le format de l\'email n\'est pas valide.');
            })
            .then(done, done);
    });
    it('should be fail because email is too long EN', function (done) {
        CheckEmailIsTooLongEn.checkEmail()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'The format of the email is not valid.');
            })
            .then(done, done);
    });
    it('should be fail because email is too long FR', function (done) {
        CheckEmailIsTooLongFr.checkEmail()
            .catch((err: ErrorFormValidator) => {
                assert.strictEqual(err.message, 'Le format de l\'email n\'est pas valide.');
            })
            .then(done, done);
    });
});

describe('Check email who\'s success', () => {
    it('should be success', function (done) {
        CheckEmailIsValid.checkEmail()
            .then(() => {
               assert.strictEqual('', '')
            })
            .then(done, done);
    });
})