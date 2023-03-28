"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detector = void 0;
class Detector {
    checkers;
    constructor(checkers) {
        this.checkers = checkers.sort((a, b) => a.priority - b.priority);
    }
    async detect(data) {
        const result = {
            triggeredCheckers: [],
            processedValue: data,
        };
        for (const checker of this.checkers) {
            const checkerResult = await checker.processData(data);
            if (checkerResult.triggered) {
                result.triggeredCheckers.push(checkerResult);
                result.processedValue = checkerResult.processedValue;
            }
        }
        return result;
    }
}
exports.Detector = Detector;
//# sourceMappingURL=detector.js.map