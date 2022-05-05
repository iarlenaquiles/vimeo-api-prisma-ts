import api from './api';

async function checkTag(videoId: number, word: string) {
    const response = await api.get(`/videos/${videoId}/tags/${word}`);

    return response;
}

export default checkTag;
