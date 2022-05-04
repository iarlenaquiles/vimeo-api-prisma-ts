import api from './api';

async function getAccessToken() {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    const data = `${clientId}:${clientSecret}`;
    const buff = Buffer.from(data);
    const base64data = buff.toString('base64');
    console.log(base64data)

    const config = {
        headers: {
            'Authorization': `basic ${base64data}`,
            'Content-Type': `application/json`,
            'Accept': `application/vnd.vimeo.*+json;version=3.4`
        }
    };

    const response = await api.post(`/oauth/authorize/client`, {
        "grant_type": "client_credentials",
        "scope": "public"
    }, config);

    return response;
}

export default getAccessToken;
