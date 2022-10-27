/** @format */
import axios from 'axios'
import {Languages} from '@common'

class ApiClient {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  post(endpoint, params, headers = null) {
    return this.requestHttp('POST', this.baseUrl + endpoint, params, headers);
  }

  get(endpoint, headers = null) {
    return this.requestHttp('GET', this.baseUrl + endpoint, null, headers);
  }

  put(endpoint, params, headers = null) {
    return this.requestHttp('PUT', this.baseUrl + endpoint, params, headers);
  }

  patch(endpoint, params, headers = null) {
    return this.requestHttp('PATCH', this.baseUrl + endpoint, params, headers);
  }

  delete(endpoint, params, headers = null) {
    return this.requestHttp('DELETE', this.baseUrl + endpoint, params, headers);
  }

  requestHttp(method, url, params, headers) {
    return new Promise((resolve, reject) => {
      const options = {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      if (params) {
        options.body = JSON.stringify(params);
      }
      if (headers) {
        options.headers.Authorization = `Bearer ${headers}`;
      }
      fetch(url, options)
        .then((response) => {
          response
            .json()
            .then((body) => {
              resolve({ statusCode: response.status, body });
            })
            .catch((error) => {
              reject(Languages.errorMsgConnectServer);
            });
        })
        .catch((error) => {
          reject(Languages.errorMsgConnectServer);
        });
    });
  }

  uploadFileWithProgress(endpoint, fileData, key, params,onProgress,headers = null) {
    return new Promise((resolve, reject) => {
      var url = this.baseUrl + endpoint
      var formData = new FormData();
      formData.append(key,{type: fileData.type, name: fileData.fileName, uri: fileData.uri })
      for (var k in params) {
        formData.append(k, params[k]);
      }
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + headers
        },
        onUploadProgress: function (progressEvent) {
          var percentCompleted =progressEvent.loaded / progressEvent.total ;
          onProgress(percentCompleted)
        },
      })
        .then((responseJson) => {
          resolve({statusCode:responseJson.status,body:responseJson.data})
        })
        .catch(reject);
    })
  }
}

export default ApiClient;
