"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evm_private_key_checker_1 = require("./checkers/evm-private-key/evm-private-key.checker");
const detector_1 = require("./detector");
describe('Detector', () => {
    test('should return true if data is a valid EVM private key', async () => {
        const detector = new detector_1.Detector([new evm_private_key_checker_1.EvmPrivateKeyChecker()]);
        expect(detector).toBeDefined();
    });
});
//# sourceMappingURL=detector.test.js.map