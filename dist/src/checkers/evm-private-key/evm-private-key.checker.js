"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvmPrivateKeyChecker = void 0;
class EvmPrivateKeyChecker {
    name = 'EVM private key checker';
    priority = 1;
    constructor(replaceFunction) {
        this.replaceFunction = this.replaceFunction || replaceFunction;
    }
    async processData(data) {
        const regex = new RegExp(/(0x)?[\dA-Fa-f]{64}/g);
        if (regex.test(data)) {
            const foundParts = data
                .match(regex)
                ?.map((value) => ({
                value,
            }));
            if (foundParts) {
                return {
                    checkerName: this.name,
                    triggered: true,
                    processedValue: await this.replaceFunction({
                        sourceValue: data,
                        foundParts,
                    }),
                };
            }
        }
        return {
            checkerName: this.name,
            triggered: false,
            processedValue: data,
        };
    }
    async replaceFunction(parameters) {
        const PLACEHOLDER = `<Private key was removed by ${this.name}>`;
        let processedValue = parameters.sourceValue;
        for (const part of parameters.foundParts) {
            processedValue = processedValue.replace(part.value, PLACEHOLDER);
        }
        return processedValue;
    }
}
exports.EvmPrivateKeyChecker = EvmPrivateKeyChecker;
//# sourceMappingURL=evm-private-key.checker.js.map