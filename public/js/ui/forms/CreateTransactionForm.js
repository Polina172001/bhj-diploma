

/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (response, err) => {
      if(response.success) {
        let strHTML = "";
        response.data.forEach((item) => {
          strHTML += `<option value="${item.id}">${item.name}</option>`
        });
        this.element.querySelector('.accounts-select').innerHTML = strHTML;
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (response, err) => {
      if (response.success) {
        this.element.reset();
        let closest = this.element.closest('.modal');
        let modal = App.getModal(closest.dataset.modalId);
        modal.close();
        App.update();
      }
    });
  }
}