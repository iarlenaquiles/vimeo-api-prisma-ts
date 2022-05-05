import api from './api';

async function addTag(videoId: number, word: string) {
    const response = await api.put(`/videos/${videoId}/tags/${word}`);

    return response;
}

export default addTag;
