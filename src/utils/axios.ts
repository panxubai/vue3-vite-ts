import { message } from 'ant-design-vue';
import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {'Content-Type': 'application/json'},
    timeout: 20000,
    transformRequest(data) {
        return JSON.stringify(data);
    },
});
instance.interceptors.request.use(function (config) {
    config.headers = config.headers ? {'Content-Type': 'application/json', ...config.headers} : {'Content-Type': 'application/json'};
    //TOKEN
    // let token: string | null = getWebToken();
    // config.headers.Authentication = token;

    return Promise.resolve(config);
});
// 模拟换取token的操作
const refreshToken = () => {
    return new Promise((reject,resolve) => {
        reject('qwe')
    })
}
//是否正在刷新token
let isRefreshing:boolean = false
// 重试队列，每一项将是一个待执行的函数形式
let requests:any = []
instance.interceptors.response.use((response) => {
    let status: any = +response.data.status;
    //token 过期
    if (status === 10160001) {
        const config:any = response.config
    if (!isRefreshing) {
      isRefreshing = true
      return refreshToken().then(res => {
        const token = res;
        config.headers.Authentication = token;
        config.baseURL = ''
        // 已经刷新了token，将所有队列中的请求进行重试
        requests.forEach((cb: (arg0: any) => any) => cb(token))
        // 重试完了别忘了清空这个队列
        requests = []
        isRefreshing = false
        return instance(config)
      }).catch(res => {
        isRefreshing = false;
        requests = [];
        // 去登陆
        window.location.href = '/'
      })
    } else {
      // 正在刷新token，返回一个未执行resolve的promise
      return new Promise((resolve) => {
        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
        requests.push((token:string) => {
          config.baseURL = ''
          config.headers['X-Token'] = token
          resolve(instance(config))
        })
      })
    }
    }
    return Promise.resolve(response.data);
}, (error: any) => {
    if (axios.isCancel(error)) {
        return Promise.resolve({
            data: {
                status: 1,
                message: '取消请求',
                isCancel: true
            }
        });
    }
    return Promise.resolve({
        data: {
            status: 1,
            message: '错误请求'
        }
    });
});


export default class LiuLiAxios {
    private options: any
    constructor(options = {}) {
        this.options = options;
    }
    request<T>(options: any): Promise<any> {
        let fn = (): any => {
            return instance.request(options);
        };
        return fn();
    }
    get(url: string, params = {}, options = {}) {
        return this.request({
            method: 'get',
            url,
            params: {...params},
            ...options
        });
    }

    post(url: string, data = {}, options = {}) {
        return this.request({
            method: 'post',
            url,
            data,
            transformRequest: [($data: any) => {
                return JSON.stringify($data);
            }],
            ...options
        });
    }

    formPost(url: string, data = {}, options = {}) {
        return this.request({
            method: 'post',
            url,
            data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            ...options
        });
    }

    put(url: string, data = {}, options = {}) {
        return this.request({
            method: 'put',
            url,
            data,
            transformRequest: [($data: any) => {
                return JSON.stringify($data);
            }],
            ...options
        });
    }

    formPut(url: string, data = {}, options = {}) {
        return this.request({
            method: 'put',
            url,
            data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            ...options
        });
    }

    delete(url: string, params = {}, options = {}) {
        return this.request({
            method: 'delete',
            url,
            params: {...params},
            ...options
        });
    }

    patch(url: string, data: any, options = {}) {
        return this.request({
            method: 'patch',
            url,
            params: data ? { ...data } : {},
            ...options
        });
    }
}
const instanceAxios = new LiuLiAxios;
export const request = instanceAxios.request.bind(instanceAxios);
export const get = instanceAxios.get.bind(instanceAxios);
export const post = instanceAxios.post.bind(instanceAxios);
export const put = instanceAxios.put.bind(instanceAxios);
export const del = instanceAxios.delete.bind(instanceAxios);
export const formPost = instanceAxios.formPost.bind(instanceAxios);
