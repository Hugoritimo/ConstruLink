"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfController = void 0;
const common_1 = require("@nestjs/common");
const pdf_service_1 = require("./pdf.service");
let PdfController = class PdfController {
    constructor(pdfService) {
        this.pdfService = pdfService;
    }
    async generatePdf(res, body) {
        try {
            if (!body.htmlContent) {
                return res.status(400).json({ message: 'HTML content is required' });
            }
            const pdfBuffer = await this.pdfService.generatePdfFromHtml(body.htmlContent);
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="relatorio-diario.pdf"',
            });
            res.send(pdfBuffer);
        }
        catch (error) {
            console.error('Erro no controller:', error);
            res.status(500).json({ message: 'Erro ao gerar o PDF' });
        }
    }
};
exports.PdfController = PdfController;
__decorate([
    (0, common_1.Post)('generate'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "generatePdf", null);
exports.PdfController = PdfController = __decorate([
    (0, common_1.Controller)('pdf'),
    __metadata("design:paramtypes", [pdf_service_1.PdfService])
], PdfController);
//# sourceMappingURL=pdf.controller.js.map