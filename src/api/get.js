import axios from 'axios';
const url = 'https://api.thingspeak.com';
const listUrl =
  'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a1db46b3-41b2-4a81-b7c6-5f85e7842cca/sensor-info-list.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221008%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221008T122603Z&X-Amz-Expires=86400&X-Amz-Signature=afbcdb4a7f6463671d3738c13fa2d62f971a4f3142489de697b85743ee1b9a5e&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22sensor-info-list.json%22&x-id=GetObject';

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
