"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseChecker = void 0;
class BaseChecker {
    replace;
    constructor(replaceFunction) {
        this.replaceFunction = this.replaceFunction || replaceFunction;
    }
    async processData(data) {
        const detectedItems = await this.detect(data);
        if (detectedItems.length === 0) {
            return {
                checkerName: this.name(),
                triggered: false,
                valueOut: data,
                valueIn: data,
            };
        }
        const valueOut = await this.replaceFunction({
            sourceValue: data,
            foundParts: detectedItems,
        });
        return {
            valueIn: data,
            checkerName: this.name(),
            triggered: valueOut !== data,
            valueOut,
        };
    }
    async replaceFunction(parameters) {
        if (this.replace) {
            return this.replace(parameters.sourceValue, parameters.foundParts);
        }
        const PLACEHOLDER = `<Sensitive data was removed by ${this.name()}>`;
        let replacedData = parameters.sourceValue;
        let offset = 0;
        for (const foundPart of parameters.foundParts) {
            const { positionStart, positionEnd } = foundPart;
            const foundStringLength = positionEnd - positionStart;
            const replacedStringLength = PLACEHOLDER.length;
            const newStart = positionStart + offset;
            const beforeString = replacedData.slice(0, newStart);
            const afterString = replacedData.slice(newStart + foundStringLength);
            replacedData = beforeString + PLACEHOLDER + afterString;
            offset += replacedStringLength - foundStringLength;
        }
        return replacedData;
    }
}
exports.BaseChecker = BaseChecker;
//# sourceMappingURL=base.checker.js.map