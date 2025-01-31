const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function mergePDFs(pdfFiles) {
  const mergedPdf = await PDFDocument.create();
  for (const file of pdfFiles) {
    const pdfBytes = fs.readFileSync(file);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    pages.forEach((page) => mergedPdf.addPage(page));
  }
  const mergedPdfBytes = await mergedPdf.save();
  fs.writeFileSync('merged.pdf', mergedPdfBytes);
}

module.exports = { mergePDFs };
