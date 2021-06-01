/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

  let xhr = new XMLHttpRequest();
  const method = options.method;
  xhr.responseType = options.responseType;
  const url = options.url;
  let argument;
  let formData;
  let methodGet = false;

  if (method != 'GET') {
    argument = url;
    formData = new FormData();
    for (let key in options.data) {
      formData.append(key, options.data[key]);
    }
  } else {
    methodGet = true;
    argument = '';
    argument = options.url + '?';
    for (let key in options.data) {
      argument = argument + key + '=' + options.data[key] + '&';
    }
    argument = argument.slice(0, -1);
  }

  try {
    xhr.open(method, argument);
    if (methodGet) {
      xhr.send();
    } else {
      xhr.send(formData);
    }
  } catch (err) {
    throw err;
  }

  xhr.addEventListener('load', (response, err) => {
    options.callback(response.currentTarget.response,
      new Error(response.currentTarget.response.error)
    );
  });

};