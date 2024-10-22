// routes/reportRoutes.js
import express from 'express';
import PDFDocument from 'pdfkit';
import { sendEmail } from '../services/emailService.js';
import { Lead } from '../models/leadModel.js';
import { Campaign } from '../models/campaignModel.js';
import { etlProcess } from '../services/etlService.js';
import { getDummyLeads, getDummyCampaigns } from '../services/dummyDataService.js';

const router = express.Router();

router.get('/fetch-data', async (req, res) => {
    try {
        const leads = getDummyLeads();
        const campaigns = getDummyCampaigns();

        // ETL Process
        await etlProcess(leads, campaigns);

        res.json({ leads, campaigns });
    } catch (error) {
        res.status(500).send('Error processing dummy data');
    }
});

router.post('/generate-report', async (req, res) => {
    const { email } = req.body; // User email from request body

    const leads = await Lead.find();
    const campaigns = await Campaign.find();

    const doc = new PDFDocument();
    let reportBuffer = [];
    doc.on('data', reportBuffer.push.bind(reportBuffer));
    doc.on('end', async () => {
        const report = Buffer.concat(reportBuffer);
        const reportFileName = 'report.pdf';

        // Send the PDF to the client for download
        res.setHeader('Content-Disposition', `attachment; filename="${reportFileName}"`);
        res.setHeader('Content-Type', 'application/pdf');
        res.end(report);

        // Email conditions
        const hasMoreThan3Leads = leads.length>1;
        const hasActiveCampaign = campaigns.some(campaign => campaign.status === 'Active');

        if (hasMoreThan3Leads && hasActiveCampaign) {
            const emailBody = `
                <h1>EzyMetrics Report</h1>
                <p>Here is your report:</p>
                <p>Total Leads: ${leads.length}</p>
                <p>Total Active Campaigns: ${campaigns.filter(c => c.status === 'Active').length}</p>
            `;
            await sendEmail(email, 'Your Report', emailBody, report, reportFileName);
        }
    });

    doc.fontSize(25).text('EzyMetrics Report');
    doc.text('Leads:');
    leads.forEach(lead => {
        doc.text(`Name: ${lead.name}, Email: ${lead.email}, Status: ${lead.status}`);
    });

    doc.text('Campaigns:');
    campaigns.forEach(campaign => {
        doc.text(`Title: ${campaign.title}, Status: ${campaign.status}`);
    });

    doc.end();
});

export default router;
