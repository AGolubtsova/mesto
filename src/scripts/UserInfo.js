export default class UserInfo {
    constructor({ userNameSelector, userJobSelector }) {
      this._username = document.querySelector(userNameSelector);
      this._userJob = document.querySelector(userJobSelector);
    }

    // Метод возвращает объект с данными пользователя
    getUserInfo() {
      return {
        username: this._username.textContent,
        profession: this._userJob.textContent,
    };
  } 
  
    // Метод принимает новые данные пользователя и добавляет их на страницу
    setUserInfo({ username, profession }) {
      this._username.textContent = username;
      this._userJob.textContent = profession;
   }
}  