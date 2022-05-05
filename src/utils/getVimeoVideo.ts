import api from '../services/api';

async function fetchFromVimeo(id: string) {
    const key = process.env.VIMEO_API_KEY;
    console.log(key);
    console.log(id);
    const config = {
        headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': `application/json`,
        'Accept': `application/vnd.vimeo.*+json;version=3.4`
    }};
    const response = await api.get(`/videos/${id}`, config);
    return response;
}

async function getVimeoVideo(id: string) {
    const video = await fetchFromVimeo(id);

    console.log(video)
    if (!video) {
        return null;
    }

    // const data = {
    //     id,
    //     title: video.name,
    //     views: video.stats.plays,
    //     likes: video.metadata.connections.likes.total,
    //     thumbnail: video.pictures.sizes[3].link,
    // };
    return video;
}

export default getVimeoVideo;