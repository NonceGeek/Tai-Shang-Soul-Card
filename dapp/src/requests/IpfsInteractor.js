import axios from '@/utils/axiosUtils';
export const get_data = (data) =>
  axios.post('/api/v1/run?name=IpfsInteractor&func_name=get_data', data);
export const put_data = (data) =>
  axios.post('/api/v1/run?name=IpfsInteractor&func_name=put_data', data);
