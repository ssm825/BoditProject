import axios from 'axios';

const url = 'https://api.thingspeak.com';
const listUrl =
  'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a1db46b3-41b2-4a81-b7c6-5f85e7842cca/sensor-info-list.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221009%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221009T182854Z&X-Amz-Expires=86400&X-Amz-Signature=025fe3fcbbafa57ef40a76d5770ed269c3e8d1bd617c72b46040a63b1808d26c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22sensor-info-list.json%22&x-id=GetObject';

export async function getGraphApi(payload) {
  return await axios.get(
    url + '/channels/1348864/feeds.json?api_key=6SKW0U97IPV2QQV9',
    {
      params: payload,
    }
  );
}

export async function getSensorList() {
  return await axios.get(listUrl);
}
