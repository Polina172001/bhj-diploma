/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    url: this.url + '/user/login',
    method = 'POST',
    responseType = 'json',
    data = user = () => {
      user.id = this.id,
      user.name = this.name
    },
    callback (err, response) = () => {
      if (response && response.user) {
        this.setCurrent(response.user);
      }
      callback(err, response);
    };

  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    url: this.url + '/user/login',
    method = 'DELETE',
    responseType = 'json',
    data = user = () => {
      user.id = this.id,
      user.name = this.name
    },
    callback (err, response) = () => {
      if (response && response.user) {
        this.setCurrent(response.user);
      }
      callback(err, response);
    };

  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    url: this.url + '/user/login',
    method = 'POST',
    responseType = 'json',
    data = user = () => {
      user.id = this.id,
      user.name = this.name
    },
    callback (err, response) = () => {
      if (response && response.user) {
        this.setCurrent(response.user);
      }
      callback(err, response);
    };
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({
      url: this.URL + '/current',
      method: 'GET',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this(response.user);
        }
        callback(err, response);
      }
    });

  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback) {
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });

  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.unsetCurrent(response.user);
        }
        callback(err, response);
      }
    });

  }
}
