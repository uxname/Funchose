"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvmPrivateKeyChecker = void 0;
const base_checker_1 = require("../../checkers/base/base.checker");
class EvmPrivateKeyChecker extends base_checker_1.BaseChecker {
    name = () => 'EVM private key checker';
    priority = () => 1;
    async detect(data) {
        const regex = new RegExp(/(0x)?[\dA-Fa-f]{64}/g);
        if (regex.test(data)) {
            return (data.match(regex)?.map((value) => ({
                value,
                positionStart: data.indexOf(value),
                positionEnd: data.indexOf(value) + value.length,
            })) || []);
        }
        return [];
    }
}
exports.EvmPrivateKeyChecker = EvmPrivateKeyChecker;
//# sourceMappingURL=evm-private-key.checker.js.map