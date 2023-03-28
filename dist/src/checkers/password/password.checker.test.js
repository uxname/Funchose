"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const password_checker_1 = require("../../checkers/password/password.checker");
describe('Password checker', () => {
    let checker;
    beforeAll(() => {
        checker = new password_checker_1.PasswordChecker();
    });
    test('should filter passwords', async () => {
        const STRINGS_WITH_PASSWORD = [
            'password',
            'string with password',
            'string with password in the middle',
        ];
        const STRINGS_WITHOUT_PASSWORD = ['just a text', 'simple string'];
        for (const string of STRINGS_WITH_PASSWORD) {
            const result = await checker.processData(string);
            console.log({ result });
            expect(result.triggered).toBe(true);
            expect(result.processedValue).toBe('<String with password was removed by Password checker>');
        }
        for (const string of STRINGS_WITHOUT_PASSWORD) {
            const result = await checker.processData(string);
            expect(result.triggered).toBe(false);
            expect(result.processedValue).toBe(string);
        }
    });
});
//# sourceMappingURL=password.checker.test.js.map