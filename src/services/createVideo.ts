import api from './api';

async function createVideoVimeo(size: number) {
    const response = await api.post(`/me/videos`, {
        upload: {
            approach: "tus",
            size
        }
    });

    return response;
}

export default createVideoVimeo;
