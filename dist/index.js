"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detector = void 0;
class Detector {
    checkers;
    constructor(checkers) {
        this.checkers = checkers;
    }
    async detect(data) {
        const promiseArray = this.checkers.map((checker) => checker.containData(data));
        return Promise.any(promiseArray);
    }
}
exports.Detector = Detector;
//# sourceMappingURL=index.js.map