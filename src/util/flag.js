import api from './axios'


export default {
  // 查看flag列表
  apiGetFlagList: params => api.get('/flag/list', { params }),
  apiNewFlag: data => api.post('', {data})
};
