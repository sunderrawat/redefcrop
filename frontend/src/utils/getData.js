import getCookie from './getCookie';
import apiUrl from './../apiUrl';

async function getData(url, method='GET') {
  let token = getCookie('token');
  const res = await fetch(`${apiUrl}${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    // console.log(res);
    return 'error';
  }
  if(method==='DELETE'){
    return 'success'
  }
  const data = await res.json();
//   console.log(data);
  return data;
}

export default getData;
