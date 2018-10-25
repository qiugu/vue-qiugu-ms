import axios from 'axios'
import router from '../router';
import {Message} from 'element-ui'
import store from '@/store/index'

const service = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
});

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.resultCode === "-2") {
      Message({
        message: 'token已过期,请重新登录',
        type: 'error',
        duration: 5 * 1000
      });
      sessionStorage.clear()
      router.push({name: 'Login'});
      // window.vm.$router.push({name: 'Login'});
      // location.href = '/';
    } else {
      return response
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error)
  }
);

export default service
