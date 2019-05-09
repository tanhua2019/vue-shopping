import axios from 'axios'
import store from '../store'
import router from '../router/client'
import QS from 'qs';

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://localhost:3000';

// http request 拦截器
axios.interceptors.request.use(
	config => {
	    if (store.state.clientToken) { // 判断是否存在token，如果存在的话，则每个http header都加上token
	        config.headers.Authorization = `Bearer ${store.state.clientToken}`;
	    }
	    return config;
	},
	err => {
	    return Promise.reject(err);
	}
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(clientLogout);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
  return new Promise((resolve, reject) =>{
      axios.get(url, {
          params: params
      })
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
    })
    .then((json)=>{
      if(json.code===0){
              resolve(json.data);
          }else{
              reject(json.message);
          }
    })
    .catch((e)=>{
      reject(e.toString())
    })
  });
}
/**
* post方法，对应post请求
* @param {String} url [请求的url地址]
* @param {Object} params [请求时携带的参数]
*/
export function post(url, params) {
  return new Promise((resolve, reject) => {
      axios.post(url, QS.stringify(params))
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
    })
    .then((json)=>{
      if(json.code===0){
              resolve(json.data);
          }else{
              reject(json.message);
          }
    })
    .catch((e)=>{
      reject(e.toString())
    })
  });
}
/**
 * delete方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function deletes(url, params){
  return new Promise((resolve, reject) =>{
      axios.delete(url, {
          params: params
      })
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
    })
    .then((json)=>{
      if(json.code===0){
              resolve();
          }else{
              reject(json.message);
          }
    })
    .catch((e)=>{
      reject(e.toString())
    })
  });
}
