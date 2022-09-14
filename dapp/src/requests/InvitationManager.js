import axios from '@/utils/axiosUtils';
export const gen_invitation = (data) =>
  axios.post(
    '/api/v1/run?name=SoulCard.InvitationManager&func_name=gen_invitation',
    data,
  );
export const check_invitation = (data) =>
  axios.post(
    '/api/v1/run?name=SoulCard.InvitationManager&func_name=check_invitation',
    data,
  );
