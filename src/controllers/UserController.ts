import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UserController {
    async list(_req: Request, res: Response) {
        const users = await prisma.user.findMany();
        return res.json({ users });
    }

    async store(req: Request, res: Response) {
        const { name, email } = req.body;

        const user = await prisma.user.create({
            data: {
                name,
                email
            }
        });

        return res.json({ user });
    }
}

export default UserController;
