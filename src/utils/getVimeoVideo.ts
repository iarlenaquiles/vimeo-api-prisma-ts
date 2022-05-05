import api from '../services/api';

async function fetchFromVimeo(id: string) { 
    const response = await api.get(`/videos/${id}`);
    return response;
}

async function getVimeoVideo(id: string) {
    const video = await fetchFromVimeo(id);

    console.log(video)
    if (!video) {
        return null;
    }
    
    return video;
}

export default getVimeoVideo;