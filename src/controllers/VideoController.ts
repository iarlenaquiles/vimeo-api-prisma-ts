import { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';
import getVideo from "../utils/getVideo";

// const prisma = new PrismaClient();

class VideoController {
    async list(_req: Request, res: Response) {
        return res.json({});
    }

    async store(req: Request, res: Response) {
        if (req.file) {
            //Se ele existir, retornamos um sucess com o payload do arquivo gerado
            //Aqui sua criatividade é o limite
            const { originalname } = req.file;
            return res.json({
                originalname
            });
        }
        return res.json(null);
    }

    async details(req: Request, res: Response) {
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


    }
}

export default VideoController;


