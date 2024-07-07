import axios from "axios";
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: '/api',
  timeout: 60000,
});

instance.interceptors.response.use((response) => {
  if (response.status === 200) {
    const data = response.data;
    if (data.code !== 200) {
      ElMessage.error(data.message);
      return Promise.reject(data.message);
    }
    ElMessage.success(data.message);
    return data.payload;
  } else {
    ElMessage.error({message: '请求失败',});
  }
}, (error) => {
  return Promise.reject(error);
});

export default instance;
