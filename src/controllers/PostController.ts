import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class PostController {
    async list(_req: Request, res: Response) {
        const posts = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        email: true
                    }
                }
            },
            where: {
                authorId: {
                    gt: 3
                }
            }
        });

        return res.json({ posts });
    }

    async store(req: Request, res: Response) {
        const { authorId, title, content } = req.body;

        const post = await prisma.post.create({
            data: {
                authorId,
                title,
                content
            }
        });

        return res.json({ post });
    }
}

export default PostController;


