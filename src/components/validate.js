// ########################
// // Установка слушателей
// // ########################

// export function enableValidation(formsPrefs){
//   const allForms = document.querySelectorAll(`.${formsPrefs.formSelector}`);


//   Array.from(allForms).forEach(form => {
//     const inputFields = form.querySelectorAll(`.${formsPrefs.inputSelector}`);

//     Array.from(inputFields).forEach((field) => {
//       field.addEventListener('input', (evt) => isValid(evt, formsPrefs, form));
//       if(field.type === 'text'){
//         field.addEventListener('keydown', (evt) => isKeyValid(evt, formsPrefs));
//       }
//   });
//   });



// }

// // ########################
// // Валидация во время ввода
// // ########################

// function isValid (evt, formsPrefs, form){
//   // находим поле для вывода ошибки
//   const errField = document.querySelector(`${formsPrefs.errorFieldSelector}${evt.target.name}"]`);

//   // проверка текущего поля согласно настройкам формы в HTML
//   evt.target.validity.patternMismatch ?
//   errField.textContent = evt.target.dataset.errorMessage :
//     !evt.target.validity.valid ?
//       errField.textContent = evt.target.validationMessage :
//       errField.textContent = '';

//   // ########################
//   // ДОП. ОПЦИИ Проверки буфера обмена
//   // ########################
//   // const printed = new RegExp(evt.target.pattern, 'g');

//   // if (evt.target.value.replace(printed, "").length > 0){
//   //   evt.target.setCustomValidity(evt.target.dataset.errorMessage);
//   //   errField.textContent = evt.target.validationMessage;
//   // } else {
//   //   evt.target.setCustomValidity("");
//   //   errField.textContent = '';
//   // }

//   // стираем лишние пробелы
//   // if(evt.target.value.replace(/[\s]/g, '').length < 1){
//   //   evt.target.value="";
//   //   evt.target.setCustomValidity("Поле незаполнено");
//   //   errField.textContent = evt.target.validationMessage;
//   // } else {
//   //   evt.target.value= evt.target.value.replace(/(\s)+/g, '$1');
//   // }

//   // запускаем переключатель для submit
//   toggleButton(formsPrefs, form);
// }

// // ########################
// // ДОП. ОПЦИИ Проверка ввода символов
// // ########################

// function isKeyValid(evt, formsPrefs) {
//   // находим поле для вывода ошибки
//   const errField = document.querySelector(`${formsPrefs.errorFieldSelector}${evt.target.name}"]`);

//   errField.textContent = hasDoubleKey(evt, ' ') ?
//     "Два пробела подряд" :
//     // doubleKey(evt, '.') ? "Две точки подряд":
//     hasDoubleKey(evt, '-') ? "Два дефиса подряд": "";

//   const printed = new RegExp(evt.target.pattern, 'gi'); //[a-zа-яё\-\s]/gi;

//   if (!printed.test(evt.key)){
//     evt.preventDefault();
//   }

//   if(evt.key === 'Backspace'| evt.key === 'Delete'){
//     errField.textContent = "";
//   }
// }

// // ########################
// // ДОП. ОПЦИИ Проверка на двойные символы
// // ########################

// function hasDoubleKey(evt, key){
//   if (evt.key === key && evt.key === evt.target.value[evt.target.value.length-1] ||
//       evt.key === key && evt.key === evt.target.value[evt.target.value.length-2] ){
//     evt.preventDefault();
//     return true;
//   }
//   return false;
// }

// // ########################
// // Переключатель кнопки
// // ########################

// export function toggleButton(formsPrefs, form) {
//   const button = form.querySelector(`.${formsPrefs.submitButtonSelector}`);

//   if (hasInvalidInput(formsPrefs, form)){
//     button.classList.add(formsPrefs.inactiveButtonClass);
//     button.setAttribute('disabled','disabled');
//   } else {
//     button.classList.remove(formsPrefs.inactiveButtonClass);
//     button.removeAttribute('disabled');
//   }
// }

// // ########################
// // Проверка всех форм на невалидность
// // ########################

// function hasInvalidInput(formsPrefs, form) {
//   return Array.from(form.querySelectorAll(`.${formsPrefs.inputSelector}`)).some((el) => !el.validity.valid);
// }

export class FormValidator {
  constructor(formsPrefs, formElement){
    this._formsPrefs = formsPrefs;
    this._formElement = formElement;
  }

  // Переключатель кнопки
  toggleButton() {
    const button = this._formElement.querySelector(`.${this._formsPrefs.submitButtonSelector}`);

    if (this._hasInvalidInput(this._formsPrefs, this._formElement)){
      button.classList.add(this._formsPrefs.inactiveButtonClass);
      button.setAttribute('disabled','disabled');
    } else {
      button.classList.remove(this._formsPrefs.inactiveButtonClass);
      button.removeAttribute('disabled');
    }
  }

  // Валидация во время ввода
  _isValid (evt){
    // находим поле для вывода ошибки
    const errField = document.querySelector(`${this._formsPrefs.errorFieldSelector}${evt.target.name}"]`);

    // проверка текущего поля согласно настройкам формы в HTML
    evt.target.validity.patternMismatch ?
    errField.textContent = evt.target.dataset.errorMessage :
      !evt.target.validity.valid ?
        errField.textContent = evt.target.validationMessage :
        errField.textContent = '';

    this.toggleButton(this._formsPrefs, this._formElement);
  }

  _hasDoubleKey(evt, key){
    if (evt.key === key && evt.key === evt.target.value[evt.target.value.length-1] ||
        evt.key === key && evt.key === evt.target.value[evt.target.value.length-2] ){
      evt.preventDefault();
      return true;
    }
    return false;
  }

  _isKeyValid(evt) {
    // находим поле для вывода ошибки
    const errField = document.querySelector(`${this._formsPrefs.errorFieldSelector}${evt.target.name}"]`);

    errField.textContent = this._hasDoubleKey(evt, ' ') ?
      "Два пробела подряд" :
      this._hasDoubleKey(evt, '-') ? "Два дефиса подряд": "";

    const printed = new RegExp(evt.target.pattern, 'gi'); //[a-zа-яё\-\s]/gi;

    if (!printed.test(evt.key)){
      evt.preventDefault();
    }

    if(evt.key === 'Backspace'| evt.key === 'Delete'){
      errField.textContent = "";
    }
  }

  _hasInvalidInput() {
    return Array.from(this._formElement.querySelectorAll(`.${this._formsPrefs.inputSelector}`)).some((el) => !el.validity.valid);
  }

  enableValidation(){
    const allForms = document.querySelectorAll(`.${this._formsPrefs.formSelector}`);

    Array.from(allForms).forEach(form => {
      const inputFields = form.querySelectorAll(`.${this._formsPrefs.inputSelector}`);

      Array.from(inputFields).forEach((field) => {
        field.addEventListener('input', (evt) => this._isValid(evt, this._formsPrefs, this._formElement));
        if(field.type === 'text'){
          field.addEventListener('keydown', (evt) => this._isKeyValid(evt, this._formsPrefs));
        }
    });
    });

  }

}
