import { BaseChecker } from '@/checkers/base/base.checker';
import { IFoundPart } from '@/checkers/base/i-base-checker';

export class PasswordChecker extends BaseChecker {
  name = () => 'Password checker';
  priority = () => 1;

  async detect(data: string): Promise<Array<IFoundPart>> {
    const TRIGGER_WORDS = [
      'password',
      'pass',
      'pwd',
      'passwd',
      'passphrase',
      'passcode',
      'pass key',
      'secret',
      'key',
      'lock',
      'unlock',
      'authorization',
      'credentials',
      'pin',
      'token',
      'cipher',
      'hash',
      'salt',
    ];

    const foundParts: Array<IFoundPart> = [];

    for (const word of TRIGGER_WORDS) {
      let position = data.indexOf(word);
      while (position !== -1) {
        foundParts.push({
          value: word,
          positionStart: position,
          positionEnd: position + word.length,
        });
        position = data.indexOf(word, position + 1);
      }
    }

    return foundParts;
  }
}
