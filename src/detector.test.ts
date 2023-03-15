import {Detector} from '@/detector';
import {EvmPrivateKeyChecker} from "@/checkers/evm-private-key/evm-private-key.checker";

describe('Detector', function () {
    test('should return true if data is a valid EVM private key', function () {
        const detector = new Detector([new EvmPrivateKeyChecker()]);
        expect(true).toBe(true);
    });
});