import getVimeoVideo from "./getVimeoVideo";

async function getVideo(text: string) {
    const vimeoId = text.match(/\d{9}/)?.[0];
    console.log(vimeoId)
  
    const result = await getVimeoVideo(vimeoId!);
    console.log(result)

    return result;
  }
  
  export default getVideo;