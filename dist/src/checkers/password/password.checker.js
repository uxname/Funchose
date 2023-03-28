"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordChecker = void 0;
class PasswordChecker {
    name = 'Password checker';
    priority = 1;
    constructor(replaceFunction) {
        this.replaceFunction = this.replaceFunction || replaceFunction;
    }
    async processData(data) {
        if (data.toLowerCase().includes('password')) {
            return {
                checkerName: this.name,
                triggered: true,
                processedValue: await this.replaceFunction({
                    sourceValue: data,
                    foundParts: [],
                }),
            };
        }
        return {
            checkerName: this.name,
            triggered: false,
            processedValue: data,
        };
    }
    async replaceFunction(parameters) {
        return `<String with password was removed by ${this.name}>`;
    }
}
exports.PasswordChecker = PasswordChecker;
//# sourceMappingURL=password.checker.js.map