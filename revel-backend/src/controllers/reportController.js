const Document = require('../models/Document');

// Helper — builds a plain text report body from a document
const buildReportText = (document) => {
  const clauses = (document.extractedClauses || [])
    .map(c => `  - [${c.type}] ${c.title}: ${c.content}`)
    .join('\n');

  return `
REVEL AI — CONTRACT ANALYSIS REPORT
=====================================
Document   : ${document.name}
Status     : ${document.status}
Risk Score : ${document.riskScore} / 100
Generated  : ${new Date().toUTCString()}

EXTRACTED CLAUSES
-----------------
${clauses || '  No clauses extracted yet. Run analysis first.'}

RISK ASSESSMENT
---------------
  Overall Risk: ${document.riskScore >= 70 ? 'HIGH' : document.riskScore >= 40 ? 'MEDIUM' : 'LOW'}

=====================================
  `.trim();
};

// 1. POST /pdf/:id — generates a plain-text PDF-like response
//    (Real PDF needs pdfkit — install with: npm install pdfkit)
const generatePDFReport = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const reportText = buildReportText(document);

    // Attempt to use pdfkit if installed, otherwise return plain text
    try {
      const PDFDocument = require('pdfkit');
      const doc = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${document.name}-report.pdf"`);
      doc.pipe(res);
      doc.fontSize(16).text('REVEL AI — CONTRACT ANALYSIS REPORT', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Document: ${document.name}`);
      doc.text(`Status: ${document.status}`);
      doc.text(`Risk Score: ${document.riskScore} / 100`);
      doc.text(`Generated: ${new Date().toUTCString()}`);
      doc.moveDown();
      doc.fontSize(14).text('Extracted Clauses');
      (document.extractedClauses || []).forEach(c => {
        doc.fontSize(11).text(`[${c.type}] ${c.title}: ${c.content}`);
      });
      doc.end();
    } catch {
      // pdfkit not installed — send plain text fallback
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Disposition', `attachment; filename="${document.name}-report.txt"`);
      res.send(reportText);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. POST /word/:id — exports as plain text (real Word needs officegen/docx)
const exportWord = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const reportText = buildReportText(document);
    res.setHeader('Content-Type', 'application/msword');
    res.setHeader('Content-Disposition', `attachment; filename="${document.name}-report.doc"`);
    res.send(reportText);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. POST /json/:id — export full document analysis as JSON
const exportJSON = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const report = {
      reportGeneratedAt: new Date().toISOString(),
      document: {
        id: document._id,
        name: document.name,
        status: document.status,
        riskScore: document.riskScore,
        riskLevel: document.riskScore >= 70 ? 'HIGH' : document.riskScore >= 40 ? 'MEDIUM' : 'LOW',
        isFavorite: document.isFavorite,
        extractedClauses: document.extractedClauses,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
      },
    };

    res.setHeader('Content-Disposition', `attachment; filename="${document.name}-report.json"`);
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. POST /share/:id — generate a shareable summary
const shareReport = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    // In production, generate a signed URL or a share token stored in DB
    const shareToken = Buffer.from(`${document._id}:${Date.now()}`).toString('base64');
    res.json({
      message: 'Shareable link generated',
      shareUrl: `/api/v1/reports/shared/${shareToken}`,
      expiresIn: '7 days',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. GET /print/:id — returns HTML-formatted report for printing
const printReport = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const clausesHtml = (document.extractedClauses || [])
      .map(c => `<tr><td><b>${c.title}</b></td><td>${c.content}</td><td>${c.type}</td></tr>`)
      .join('');

    const html = `
<!DOCTYPE html>
<html>
<head><title>${document.name} — Analysis Report</title>
<style>body{font-family:sans-serif;padding:20px} table{width:100%;border-collapse:collapse} td,th{border:1px solid #ccc;padding:8px}</style>
</head>
<body>
  <h1>Revel AI — Contract Analysis Report</h1>
  <p><b>Document:</b> ${document.name}</p>
  <p><b>Status:</b> ${document.status}</p>
  <p><b>Risk Score:</b> ${document.riskScore} / 100</p>
  <p><b>Generated:</b> ${new Date().toUTCString()}</p>
  <h2>Extracted Clauses</h2>
  <table><tr><th>Title</th><th>Content</th><th>Type</th></tr>${clausesHtml || '<tr><td colspan="3">No clauses extracted</td></tr>'}</table>
</body></html>`;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. GET /download-analysis/:id — downloads the full analysis as JSON attachment
const downloadAnalysis = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const analysis = {
      exportedAt: new Date().toISOString(),
      id: document._id,
      name: document.name,
      status: document.status,
      riskScore: document.riskScore,
      extractedClauses: document.extractedClauses,
    };

    res.setHeader('Content-Disposition', `attachment; filename="${document.name}-analysis.json"`);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generatePDFReport, exportWord, exportJSON, shareReport, printReport, downloadAnalysis };
