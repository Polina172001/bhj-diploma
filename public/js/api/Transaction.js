/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction extends Entity {

  constructor(props) {
    super(props);

    createRequest({
      url: this.URL + `/transaction`,
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

