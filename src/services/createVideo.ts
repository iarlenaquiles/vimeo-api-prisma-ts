import api from './api';

async function createVideoVimeo(size: number) {
    const key = process.env.VIMEO_API_KEY;

    const config = {
        headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': `application/json`,
        'Accept': `application/vnd.vimeo.*+json;version=3.4`
    }};

    const response = await api.post(`/me/videos`, {
        upload: {
            approach: "tus",
            size
        }
    }, config);

return response;
}

export default createVideoVimeo;
