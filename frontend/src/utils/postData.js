import getCookie from './getCookie';
import apiUrl from './../apiUrl';

async function postData(url, bodyData, method='POST') {
  let token = getCookie('token');
  const res = await fetch(`${apiUrl}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodyData),
  });
  if (!res.ok) {
    // console.log(res);
    return 'error';
  }
  const data = await res.json();
  //   console.log(data);
  return data;
}

export default postData;
