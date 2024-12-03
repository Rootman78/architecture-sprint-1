import React from 'react';
import { Routes, Route, Link} from 'react-router-dom';
import logoPath from '../images/logo.svg';

// В корневом компоненте App описаны обработчики: onRegister, onLogin и onSignOut. Эти обработчики переданы в соответствующие компоненты: Register.js, Login.js, Header.js
function Header ({ email }) {

  function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
  }
  function handleSignOut(){
    onSignOut();
  }
  console.log(logoPath)
  return (
    <header className="header page__section">
      <img  /* src={logoPath} */  alt="Логотип проекта Mesto" className="logo header__logo" />
      <Routes>
            <Route path="/" element={ 
              <div className="header__wrapper">
                <p className="header__user">{email}</p>
                  <button className="header__logout" onClick={handleSignOut}>Выйти</button> </div> } />
            <Route path="/signup" element={ 
              <Link className="header__auth-link" to="/signin">Войти</Link> } />
            <Route path="/signin" element={ 
                <Link className="header__auth-link" to="/signup">Регистрация</Link> } />
      </Routes>
    </header>
  )
}

export default Header;
