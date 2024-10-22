import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { addUser, findUserByUsername } from "./storage";

const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { username } = req.body;

        // Verifique se o usuário já existe
        if (findUserByUsername(username)) {
            res.status(400).json({ message: "Usuário já existe" });
            return;
        }

        const password = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(password, 10);

        // Adiciona o usuário ao armazenamento
        addUser({ username, password: hashedPassword, passwordTemporary: true });

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "victor.sousa@projetacs.com",
            subject: "Solicitação de Criação de Usuário",
            text: `Solicitação de criação de usuário:\n\nNome de Usuário: ${username}\nSenha Temporária: ${password}\n\nO usuário deverá alterar a senha no primeiro login.`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "Solicitação enviada com sucesso" });
        } catch (error) {
            console.error("Erro ao enviar e-mail:", error);
            res.status(500).json({ message: "Erro ao enviar solicitação" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
