import express from 'express';
import 'dotenv/config';
const app = express();
import getVideo from "./utils/getVideo";

import { PrismaClient } from '@prisma/client';
// import { Vimeo } from 'vimeo';

// const CONFIG = {
//     CLIENT_ID: process.env.CLIENT_ID as string,
//     CLIENT_SECRET: process.env.CLIENT_SECRET as string,
//     ACCESS_TOKEN: process.env.ACCESS_TOKEN as string,
// }

// const client = new Vimeo(CONFIG.CLIENT_ID, CONFIG.CLIENT_SECRET, CONFIG.ACCESS_TOKEN);

const prisma = new PrismaClient();
app.use(express.json());

app.get(`/`, async (_req, res) => {
    const users = await prisma.user.findMany();

    res.json({ users });
});

app.post(`/`, async (req, res) => {
    const { name, email } = req.body;

    const user = await prisma.user.create({
        data: {
            name,
            email
        }
    });

    res.json({ user });
});

app.post(`/post`, async (req, res) => {
    const { authorId, title, content } = req.body;

    const post = await prisma.post.create({
        data: {
            authorId,
            title,
            content
        }
    });

    res.json({ post });
});

app.get(`/post`, async (_req, res) => {
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

    res.json({ posts });
});

app.get("/video", async (req, res) => {
    if (typeof req.query.q === "string") {
        const result = await getVideo(req.query.q);
        console.log('################', result?.data)

        const {
            uri,
            name,
            link,
            description,
            tags,
            pictures

        } = result?.data;

        return res.json({
            uri, name, link, description,
            tags,
            pictures
        });
    }
    return res.json(null);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
