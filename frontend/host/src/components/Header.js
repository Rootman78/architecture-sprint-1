import React, { useContext } from 'react';
import {  Route, Link, useHistory} from 'react-router-dom';
import logoPath from '../images/logo.svg';
import * as auth from "../utils/auth.js"; 
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

// В корневом компоненте App описаны обработчики: onRegister, onLogin и onSignOut. Эти обработчики переданы в соответствующие компоненты: Register.js, Login.js, Header.js
function Header ({setIsLoggedIn}) {

  const  currentUser  = useContext(CurrentUserContext)
  //console.log('currentUser',currentUser);
  const [email, setEmail] = React.useState('');

  const history = useHistory();
  

  function onSignOut(history) {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
  }
  function handleSignOut(){
    onSignOut(history);
  }

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
                   
        })
        .catch((err) => {
    
      localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, []);

  
 
  return (
    <header className="header page__section">
      <img   src={logoPath}   alt="Логотип проекта Mesto" className="logo header__logo" />
      <Route exact path="/">
        <div className="header__wrapper">
          <p className="header__user">{ email }</p>
          <button className="header__logout" onClick={handleSignOut}>Выйти</button>
        </div>
      </Route>
      <Route path="/signup">
        <Link className="header__auth-link" to="signin">Войти</Link>
      </Route>
      <Route path="/signin">
        <Link className="header__auth-link" to="signup">Регистрация</Link>
      </Route>
    </header>
  )
}

export default Header;
