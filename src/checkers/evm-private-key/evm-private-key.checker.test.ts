import {EvmPrivateKeyChecker} from "@/checkers/evm-private-key/evm-private-key.checker";

describe('EVM checker', function () {
    test('should return true if data is a valid EVM private key', async () => {
        const checker = new EvmPrivateKeyChecker();
        const testData = [
            'test 0x10407901cb518b309f733be88bd01d6083d00fe9e7e60e9fb2cc87ad3a415a1f test',
            '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
            '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
            '0x0123456789ABCDEF0123456789abcdef0123456789abcdef0123456789abcdef',
            '0123456789ABCDEF0123456789abcdef0123456789abcdef0123456789abcdef',
            '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789ABCDEF',
            '0123456789abcdef0123456789abcdef0123456789abcdef0123456789ABCDEF',
            '0x0123456789abcdef0123456789ABCDEF0123456789abcdef0123456789abcdef',
            '0123456789abcdef0123456789ABCDEF0123456789abcdef0123456789abcdef',
            '0x0123456789ABCDEF0123456789ABCDEF0123456789abcdef0123456789abcdef',
            '0123456789ABCDEF0123456789ABCDEF0123456789abcdef0123456789abcdef',
        ]
        for (const data of testData) {
            const result = await checker.containData(data);
            expect(result.trigger).toBe(true);
        }
    });
});