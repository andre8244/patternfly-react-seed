import axios from 'axios';

export async function get(url) {
  return axios({
    url,
    method: 'GET',
  })
}
