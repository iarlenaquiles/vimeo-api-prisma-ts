import { Request, Response } from 'express';
// import createVideoVimeo from '../services/createVideo';
import { PrismaClient } from '@prisma/client';
import getVideo from "../utils/getVideo";
import getAccessToken from '../services/getAccessToken';
import getTagsByVideo from '../services/getTagsByVideo';
import addTag from '../services/addTagToAVideo';

import { Vimeo } from 'vimeo';
const prisma = new PrismaClient();
const { CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN } = process.env;

let client = new Vimeo(CLIENT_ID!, CLIENT_SECRET!, ACCESS_TOKEN);
class VideoController {
    async list(_req: Request, res: Response) {
        return res.json({});
    }

    async store(req: Request, res: Response) {
        try {
            if (req.file) {
                const { postId } = req.body;

                const { originalname, path } = req.file;

                client.upload(path, {
                    name: originalname,
                    description: 'teste teste'
                }, async function (uri) {
                    await prisma.video.create({
                        data: {
                            postId: Number(postId),
                            uri
                        }
                    });
                    console.log('Your video URI is: ' + uri);
                }, function (bytes_uploaded, bytes_total) {
                    var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2);
                    console.log(bytes_uploaded, bytes_total, percentage + '%');
                }, function (error) {
                    console.log('Failed because: ' + error);
                });

                return res.json({
                    originalname,
                    path
                });
            }
            return res.json(null);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    async getLink(req: Request, res: Response) {
        const { videoId } = req.params;

        const video = await prisma.video.findUnique({
            where: {
                id: Number(videoId)
            }
        });
        let link = '';
        if (video) {
            client.request(video.uri + '?fields=link', async function (error, body, _statusCode, _headers) {
                if (error) {
                    console.log('There was an error making the request.');
                    console.log('Server reported: ' + error);
                    return
                }
                link = body;
                console.log('Your video link is: ' + body);
                return body;
            });

            return res.json({ link });
        }

        return res.json({ message: 'not found' });
    }
    async getTranscode(req: Request, res: Response) {
        const { videoId } = req.params;

        const video = await prisma.video.findUnique({
            where: {
                id: Number(videoId)
            }
        });
        if (video) {
            client.request(video.uri + '?fields=transcode.status', function (_error, body, _status_code, _headers) {
                if (body.transcode.status === 'complete') {
                    console.log('Your video finished transcoding.')
                } else if (body.transcode.status === 'in_progress') {
                    console.log('Your video is still transcoding.')
                } else {
                    console.log('Your video encountered an error during transcoding.')
                }
            });
        }
        return res.json({});
    }
    async details(req: Request, res: Response) {
        try {
            if (typeof req.query.q === "string") {
                const result = await getVideo(req.query.q);
                // console.log('################', result?.data);       

                const { uri } = result?.data;
                const uriParsed = uri.split('/')[2];
                console.log(uriParsed)
                await addTag(uriParsed, 'teste');
                return res.json({
                    video: result?.data
                });
            }
            return res.json(null);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    async getAccessToken(_req: Request, res: Response) {
        try {
            const a = await getAccessToken();
            return res.json({ a });
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    async getAllTagsByVideo(req: Request, res: Response) {
        if (typeof req.query.q === "string") {
            const result = await getTagsByVideo(req.query.q);
            console.log('################', result?.data);

            return res.json({
                video: result?.data
            });
        }
        return res.json(null);
    }
}

export default VideoController;


