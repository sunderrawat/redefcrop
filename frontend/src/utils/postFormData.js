import getCookie from './getCookie';
import apiUrl from './../apiUrl';

async function postFormData(url, bodyData, method='POST') {
  let token = getCookie('token');
  const res = await fetch(`${apiUrl}${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: bodyData,
  });
  if (!res.ok) {
    // console.log(res);
    return 'error';
  }
  const data = await res.json();
  //   console.log(data);
  return data;
}

export default postFormData;
