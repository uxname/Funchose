"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_checker_1 = require("../../checkers/template/template.checker");
describe('Password checker', () => {
    let checker;
    beforeAll(() => {
        checker = new template_checker_1.TemplateChecker();
    });
    test('should filter data', async () => {
        expect(checker).toBeDefined();
        const DATA_WITH_SECRETS = [
            'password',
            'string with password',
            'string with password in the middle',
        ];
        const DATA_WITHOUT_SECRETS = ['just a text', 'simple string'];
        for (const string of DATA_WITH_SECRETS) {
            expect(string).toBeDefined();
        }
        for (const string of DATA_WITHOUT_SECRETS) {
            expect(string).toBeDefined();
        }
    });
});
//# sourceMappingURL=template.checker.test.js.map