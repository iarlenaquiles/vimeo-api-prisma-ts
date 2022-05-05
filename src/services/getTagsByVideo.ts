import api from './api';

async function getTagsByVideo(videoId: string) {
    const response = await api.get(`/videos/${videoId}/tags`);

    return response;
}

export default getTagsByVideo;
