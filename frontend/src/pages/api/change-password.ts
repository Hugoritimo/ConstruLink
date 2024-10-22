import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { findUserByUsername, updateUserPassword } from "./storage";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { username, oldPassword, newPassword } = req.body;

        const user = findUserByUsername(username);

        if (user) {
            const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
            if (isOldPasswordValid) {
                const hashedNewPassword = await bcrypt.hash(newPassword, 10);
                updateUserPassword(username, hashedNewPassword);
                res.status(200).json({ success: true, message: "Senha alterada com sucesso" });
            } else {
                res.status(401).json({ success: false, message: "Senha antiga incorreta" });
            }
        } else {
            res.status(404).json({ success: false, message: "Usuário não encontrado" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
