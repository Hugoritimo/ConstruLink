import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { htmlContent } = req.body;

    try {
        const response = await axios.post(
            'https://api.pdfshift.io/v3/convert/pdf',
            { source: htmlContent },
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        `api:${process.env.PDFSHIFT_API_KEY}`
                    ).toString('base64')}`,
                    'Content-Type': 'application/json',
                },
                responseType: 'arraybuffer',
            }
        );

        res.setHeader('Content-Type', 'application/pdf');
        res.send(response.data);
    } catch (error) {
        console.error('Erro ao gerar o PDF:', error);
        res.status(500).json({ error: 'Erro ao gerar o PDF' });
    }
}
