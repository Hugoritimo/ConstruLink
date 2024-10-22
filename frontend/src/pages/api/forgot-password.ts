import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const email = 'victor.sousa@projetacs.com';  // Substitua pelo e-mail fixo desejado

        // Geração de um token de recuperação de senha (exemplo simples, deve ser seguro em produção)
        const token = Math.random().toString(36).substr(2);

        // Configurar o transporte de e-mail com Nodemailer usando o servidor SMTP personalizado
        const transporter = nodemailer.createTransport({
            host: 'nspro120.hostgator.com.br', // Substitua pelo host do seu servidor SMTP
            port: 465, // Pode ser 465 para SSL, 587 para TLS, ou 25 para não seguro
            secure: false, // true para 465, false para outros (TLS)
            auth: {
                user: process.env.EMAIL_USER, // Defina isso no seu arquivo .env
                pass: process.env.EMAIL_PASSWORD, // Defina isso no seu arquivo .env
            },
            tls: {
                rejectUnauthorized: false, // Use isso se o servidor SMTP usar um certificado autoassinado
            },
        });

        // Configurar o conteúdo do e-mail
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Recuperação de Senha',
            text: `Solicitação de recuperação de senha. Token gerado: ${token}`,
            html: `<p>Foi solicitada uma recuperação de senha. Token gerado: ${token}</p>`,
        };

        try {
            // Enviar o e-mail
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'E-mail de recuperação enviado!' });
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
            return res.status(500).json({ message: 'Erro ao enviar e-mail' });
        }
    } else {
        return res.status(405).json({ message: 'Método não permitido' });
    }
}
