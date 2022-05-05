import api from './api';

async function getVideosByTag(word: string) {
    const response = await api.get(`/tags/${word}/videos`);

    return response;
}

export default getVideosByTag;
