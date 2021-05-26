/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

  const f = function() {}, {
      method = 'GET',
      callback = f,
      responseType,
      async = true,
      data = {}
    } = options,
    xhr = new XMLHttpRequest;
    try {
      xhr.open( method, url );
      xhr.send( data );
      xhr.onload = function() {
        callback(null, xhr.response)
      }
    }
    catch ( e ) {
      // перехват сетевой ошибки
      callback( e );
    }

};
