"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordChecker = void 0;
const base_checker_1 = require("../../checkers/base/base.checker");
class PasswordChecker extends base_checker_1.BaseChecker {
    name = () => 'Password checker';
    priority = () => 1;
    async detect(data) {
        const TRIGGER_WORDS = [
            'password',
            'pass',
            'pwd',
            'passwd',
            'passphrase',
            'passcode',
            'pass key',
            'secret',
            'key',
            'lock',
            'unlock',
            'authorization',
            'credentials',
            'pin',
            'token',
            'cipher',
            'hash',
            'salt',
        ];
        const foundParts = [];
        for (const word of TRIGGER_WORDS) {
            let position = data.indexOf(word);
            while (position !== -1) {
                foundParts.push({
                    value: word,
                    positionStart: position,
                    positionEnd: position + word.length,
                });
                position = data.indexOf(word, position + 1);
            }
        }
        return foundParts;
    }
}
exports.PasswordChecker = PasswordChecker;
//# sourceMappingURL=password.checker.js.map