import {Detector} from '@/detector';
import {EthereumPrivateKeyChecker} from "@/detector/checkers/ethereum-private-key/ethereum-private-key.checker";


const detector = new Detector([
    new EthereumPrivateKeyChecker(),
]);

async function main() {
    const data = 'data';
    const time = performance.now();
    const result = await detector.detect(data);
    console.log('time', performance.now() - time);

    console.log('result', result);
}

main().catch(console.error);