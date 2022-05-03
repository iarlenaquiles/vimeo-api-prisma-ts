import axios from "axios";

async function makeReq(url: string) {
  try {
    const response = await axios(url);
 
      return await response;
    
  } catch {
    return null;
  }
}

export default makeReq;