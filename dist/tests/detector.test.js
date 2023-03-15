"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const detector_1 = require("../detector");
const detector = new detector_1.Detector([
    new class {
        name = 'checker1';
        priority = 1;
        containData(data) {
            return Promise.resolve({
                checkerName: this.name,
                processedValue: data,
                reason: 'reason',
                trigger: true,
            });
        }
    },
]);
async function main() {
    const data = 'data';
    const time = performance.now();
    const result = await detector.detect(data);
    console.log('time', performance.now() - time);
    console.log('result', result);
}
main().catch(console.error);
//# sourceMappingURL=detector.test.js.map