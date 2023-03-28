"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateChecker = void 0;
const base_checker_1 = require("../../checkers/base/base.checker");
class TemplateChecker extends base_checker_1.BaseChecker {
    name = () => 'Template checker';
    priority = () => 1;
    async detect(data) {
        console.log(data);
        return [];
    }
}
exports.TemplateChecker = TemplateChecker;
//# sourceMappingURL=template.checker.js.map