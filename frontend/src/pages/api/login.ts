// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type User = {
    username: string;
    password: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método não permitido" });
    }

    const { username, password } = req.body;

    // Obter as credenciais dos usuários da variável de ambiente
    const users: User[] = JSON.parse(process.env.USER_CREDENTIALS || "[]");

    // Verificar se o usuário existe
    const user = users.find(
        (user) => user.username === username && user.password === password
    );

    if (user) {
        // Aqui você pode gerar um token ou iniciar uma sessão
        return res.status(200).json({ message: "Login bem-sucedido" });
    } else {
        return res.status(401).json({ message: "Credenciais inválidas" });
    }
}
