import { BaseChecker } from '@/checkers/base/base.checker';
import { IFoundPart } from '@/checkers/base/i-base-checker';

export class TemplateChecker extends BaseChecker {
  name = () => 'Template checker';
  priority = () => 1;

  async detect(data: string): Promise<Array<IFoundPart>> {
    console.log(data);
    return [];
  }
}
