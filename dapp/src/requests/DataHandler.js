import axios from '@/utils/axiosUtils';
export const check_format = (data) =>
  axios.post(
    '/api/v1/run?name=SoulCard.DataHandler&func_name=check_format',
    data,
  );
export const get_github_white_map = () =>
  axios.post(
    '/api/v1/run?name=SoulCard.DataHandler&func_name=get_github_white_map',
    data,
  );
export const analyze_github = (data) =>
  axios.post(
    '/api/v1/run?name=SoulCard.DataHandler&func_name=analyze_github',
    data,
  );
export const rand_msg = (data) =>
  axios.post('/api/v1/run?name=SoulCard.DataHandler&func_name=rand_msg', data);

export const render_and_put_to_ipfs = (data) => {
  axios.post(
    '/api/v1/run?name=SoulCard.DataHandler&func_name=render_and_put_to_ipfs',
    data,
  );
};
