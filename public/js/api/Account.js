/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback){
    
    createRequest({
      url: this.URL + `/account/${id}`,
      method: 'GET',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.account) {
          this.setCurrent(response.account);
        }
        callback(err, response);
      }
    });

  }
}
