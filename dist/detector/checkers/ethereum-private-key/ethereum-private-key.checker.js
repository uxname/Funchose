"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumPrivateKeyChecker = void 0;
class EthereumPrivateKeyChecker {
    name;
    priority;
    containData(data) {
        return Promise.resolve({
            checkerName: this.name,
            processedValue: data,
            reason: 'reason',
            trigger: true,
        });
    }
}
exports.EthereumPrivateKeyChecker = EthereumPrivateKeyChecker;
//# sourceMappingURL=evm-private-key.checker.js.map