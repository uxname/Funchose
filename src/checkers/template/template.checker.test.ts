import { TemplateChecker } from '@/checkers/template/template.checker';

describe('Password checker', () => {
  let checker: TemplateChecker;

  beforeAll(() => {
    checker = new TemplateChecker();
  });

  test('should filter data', async () => {
    expect(checker).toBeDefined();

    const DATA_WITH_SECRETS = [
      'password',
      'string with password',
      'string with password in the middle',
    ];

    const DATA_WITHOUT_SECRETS = ['just a text', 'simple string'];

    for (const string of DATA_WITH_SECRETS) {
      // Fake check:
      expect(string).toBeDefined();
      // Uncomment real checks:
      // const result = await checker.processData(string);
      // expect(result.triggered).toBe(true);
      // expect(result.valueOut).not.toBe(string);
    }

    for (const string of DATA_WITHOUT_SECRETS) {
      // Fake check:
      expect(string).toBeDefined();
      // Uncomment real checks:
      // const result = await checker.processData(string);
      // expect(result.triggered).toBe(false);
      // expect(result.valueOut).toBe(string);
    }
  });
});
