import axios from 'axios';

const instance = axios;

export const HelperAPI = async (
  url,
  method,
  params,
  data,
  cancelToken,
  headers,
) => {
  const service = await instance({
    url: url,
    method: method,
    params: params,
    data: data,
    cancelToken: cancelToken,
    headers: headers,
  });

  return service;
};
