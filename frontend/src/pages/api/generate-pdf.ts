// pages/api/generate-pdf.ts
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { htmlContent } = req.body;

        try {
            const response = await axios.post(
                "https://api.pdfshift.io/v3/convert/html",
                { source: htmlContent },
                {
                    headers: {
                        Authorization: `Basic ${Buffer.from("YOUR_PDFSHIFT_API_KEY:").toString(
                            "base64"
                        )}`,
                    },
                    responseType: "arraybuffer",
                }
            );

            res.setHeader("Content-Type", "application/pdf");
            res.send(response.data);
        } catch (error) {
            console.error("Erro ao gerar o PDF no servidor:", error);

            let message = "Erro ao gerar o PDF.";

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    message += ` Status: ${error.response.status}. Data: ${JSON.stringify(
                        error.response.data
                    )}`;
                    console.error("Data da resposta:", error.response.data);
                    console.error("Status da resposta:", error.response.status);
                    console.error("Cabeçalhos da resposta:", error.response.headers);
                } else if (error.request) {
                    message += " Nenhuma resposta recebida da API PDFShift.";
                    console.error("Nenhuma resposta recebida:", error.request);
                } else {
                    message += ` Erro na configuração da requisição: ${error.message}`;
                    console.error("Erro na configuração da requisição:", error.message);
                }
            }

            res.status(500).json({ error: message });
        }
    } else {
        res.status(405).json({ error: "Método não permitido." });
    }
}
