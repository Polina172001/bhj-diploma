/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = "/user";
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    return localStorage.setItem("user", JSON.stringify(user));

  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem("user");
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem("user"));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback = (f) => f) {
    let options = {
      method: 'GET',
      url: this.URL + '/current',
      responseType: 'json',
      data: JSON.parse(localStorage.getItem('user')),
      callback: (response, err) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        } else {
          this.unsetCurrent();
        }
        callback(response, err);
      }
    };
    return createRequest(options);

  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback = (f) => f) {
    return createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (response, err) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(response, err);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback = (f) => f) {
    const options = { 
      method: 'POST',
      url: this.URL + '/register',
      responseType: 'json',
      data: data,
      callback: (response, err) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(response, err);
      }
    };
    return createRequest(options);

  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = (f) => f) {
    return createRequest({      
      method: 'POST',
      url: this.URL + '/logout',
      responseType: 'json',
      data: data,
      callback: (response, err) => {
        if (response && response.user) {
          this.unsetCurrent(response.user);
        }
        callback(response, err);
      }
    });

  }
}
