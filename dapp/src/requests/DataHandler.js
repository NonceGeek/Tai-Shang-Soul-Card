import axios from '@/utils/axiosUtils';
export const check_format = (data) =>
  axios.post('/api/v1/run?name=DataHandler&func_name=check_format', data);
export const get_github_white_map = () =>
  axios.post(
    '/api/v1/run?name=DataHandler&func_name=get_github_white_map',
    data,
  );
export const analyze_github = (data) =>
  axios.post('/api/v1/run?name=DataHandler&func_name=analyze_github', data);
