import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class PdfService {
    private pageCount = 0; // Contador interno de páginas

    async generateRdo(data: any): Promise<string> {
        const outputPath = join(process.cwd(), `RDO_${data.date}.pdf`);
        const doc = new PDFDocument({
            size: 'A4',
            margin: 50
        });

        const stream = fs.createWriteStream(outputPath);
        doc.pipe(stream);

        // Primeira página
        this.pageCount = 1;
        this.drawHeader(doc, data);
        this.drawFooter(doc);
        doc.moveDown();

        // Conteúdo do PDF
        this.addInitialInfo(doc, data);

        // Próxima página (Efetivo em Horas)
        this.addNewPage(doc);
        this.addTableSection(doc, 'Efetivo em Horas',
            ['Função', 'Efetivo', 'Horas Normais', 'HE 50%', 'HE 100%'],
            data.effectiveHours,
            [150, 80, 80, 80, 80]
        );

        // Próxima página (Atividades Diárias)
        this.addNewPage(doc);
        this.addTableSection(doc, 'Atividades Diárias',
            ['Plano', 'Real', 'Status'],
            data.activities,
            [200, 200, 100]
        );

        // Próxima página (Observações)
        this.addNewPage(doc);
        this.addObservations(doc, data.observations);

        // Próxima página (Assinaturas)
        this.addNewPage(doc);
        this.addSignatures(doc);

        doc.end();

        return new Promise((resolve, reject) => {
            stream.on('finish', () => resolve(outputPath));
            stream.on('error', reject);
        });
    }

    private addNewPage(doc: PDFKit.PDFDocument) {
        doc.addPage();
        this.pageCount++;
        this.drawHeader(doc, {});
        this.drawFooter(doc);
        doc.moveDown();
    }

    private drawHeader(doc: PDFKit.PDFDocument, data: any) {
        const margin = doc.options.margin as number;
        const logoPath = join(process.cwd(), 'logo.png'); // Ajuste se necessário

        // Cabeçalho
        if (fs.existsSync(logoPath)) {
            doc.image(logoPath, margin, 15, { width: 50 });
        }

        doc.font('Helvetica-Bold').fontSize(14).fillColor('#333333');
        doc.text('RELATÓRIO DIÁRIO DE OBRA', margin + 60, 20, { align: 'left' });

        if (data?.date) {
            doc.font('Helvetica').fontSize(10).fillColor('#666666');
            doc.text(`Data: ${data.date}`, doc.page.width - margin - 100, 30, { align: 'right' });
        }

        doc.strokeColor('#AAAAAA')
            .lineWidth(1)
            .moveTo(margin, 60)
            .lineTo(doc.page.width - margin, 60)
            .stroke();
    }

    private drawFooter(doc: PDFKit.PDFDocument) {
        const margin = doc.options.margin as number;
        const bottom = doc.page.height - margin;

        doc.strokeColor('#AAAAAA')
            .lineWidth(1)
            .moveTo(margin, bottom)
            .lineTo(doc.page.width - margin, bottom)
            .stroke();

        doc.font('Helvetica').fontSize(10).fillColor('#666666');
        doc.text(`Página ${this.pageCount}`, margin, bottom + 10, { align: 'left' });
        doc.text('Empresa XYZ - Confidencial', doc.page.width - margin - 100, bottom + 10, { align: 'right' });
    }

    private addInitialInfo(doc: PDFKit.PDFDocument, data: any) {
        doc.font('Helvetica-Bold').fontSize(14).fillColor('#000000').text('Informações Iniciais', { underline: true });
        doc.moveDown(0.5);
        doc.font('Helvetica').fontSize(12).fillColor('#333333');
        doc.text(`Descrição dos Serviços: ${data.description}`, { lineGap: 4 });
        doc.text(`Empresa: ${data.company}`, { lineGap: 4 });
        doc.text(`Cliente: ${data.client}`, { lineGap: 4 });
        doc.text(`Data Início da Obra: ${data.startDate}`, { lineGap: 4 });
        doc.text(`Data Término da Obra: ${data.endDate}`, { lineGap: 4 });
        doc.text(`Condições Climáticas: Manhã: ${data.weather?.morning || 'N/A'}, Tarde: ${data.weather?.afternoon || 'N/A'}`, { lineGap: 4 });
        doc.text(`Horas Trabalhadas Neste Dia: ${data.workHours}`, { lineGap: 4 });
    }

    private addTableSection(doc: PDFKit.PDFDocument, title: string, headers: string[], rows: any[], columnWidths: number[]) {
        doc.font('Helvetica-Bold').fontSize(14).fillColor('#000000').text(title, { underline: true });
        doc.moveDown(1);

        this.drawStylizedTable(doc, headers, rows, columnWidths);
    }

    private addObservations(doc: PDFKit.PDFDocument, observations: string) {
        doc.font('Helvetica-Bold').fontSize(14).fillColor('#000000').text('Observações', { underline: true });
        doc.moveDown(0.5);
        doc.font('Helvetica').fontSize(12).fillColor('#333333').text(observations || 'Nenhuma observação registrada.', { lineGap: 4 });
    }

    private addSignatures(doc: PDFKit.PDFDocument) {
        doc.font('Helvetica-Bold').fontSize(14).fillColor('#000000').text('Assinaturas', { underline: true });
        doc.moveDown(2);

        doc.font('Helvetica').fontSize(12).fillColor('#333333');
        doc.text('Responsável PROJETA: ____________________', { lineGap: 10 });
        doc.text('Planejamento PROJETA: ____________________', { lineGap: 10 });
        doc.text('Fiscalização Alumar: ____________________', { lineGap: 10 });
    }

    private drawStylizedTable(doc: PDFKit.PDFDocument, headers: string[], rows: any[], columnWidths: number[]) {
        const startX = 50;
        let y = doc.y;
        const rowHeight = 20;
        const headerHeight = 25;
        const tableWidth = columnWidths.reduce((a, b) => a + b, 0);

        // Cabeçalho da tabela
        doc.rect(startX, y, tableWidth, headerHeight)
            .fillColor('#D8D8D8')
            .fill();

        doc.font('Helvetica-Bold').fontSize(10).fillColor('#000000');
        let x = startX;
        headers.forEach((header, i) => {
            doc.text(header, x + 5, y + 7, { width: columnWidths[i], align: 'center' });
            x += columnWidths[i];
        });

        y += headerHeight;
        doc.font('Helvetica').fontSize(10).fillColor('#333333');

        rows.forEach((rowData, rowIndex) => {
            const isEvenRow = rowIndex % 2 === 0;
            if (isEvenRow) {
                doc.rect(startX, y, tableWidth, rowHeight)
                    .fillColor('#F3F3F3')
                    .fill();
            }

            x = startX;
            rowData.forEach((cell: string, i: number) => {
                doc.fillColor('#333333')
                    .text(cell, x + 5, y + 7, { width: columnWidths[i], align: 'center' });
                x += columnWidths[i];
            });

            y += rowHeight;

            // Verifica se precisa de nova página
            if (y > doc.page.height - 100) {
                this.addNewPage(doc);  // agora adicionamos a nova página manualmente
                y = doc.y;

                // Redesenhar cabeçalho na nova página
                doc.rect(startX, y, tableWidth, headerHeight)
                    .fillColor('#D8D8D8')
                    .fill();

                doc.font('Helvetica-Bold').fontSize(10).fillColor('#000000');
                x = startX;
                headers.forEach((header, i) => {
                    doc.text(header, x + 5, y + 7, { width: columnWidths[i], align: 'center' });
                    x += columnWidths[i];
                });

                y += headerHeight;
                doc.font('Helvetica').fontSize(10).fillColor('#333333');
            }
        });

        doc.moveDown();
    }
}
