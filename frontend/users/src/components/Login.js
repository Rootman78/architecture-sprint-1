import React from 'react';
import {  useHistory} from 'react-router-dom';
import '../blocks/login/login.css';
import * as auth from "../utils/auth.js"; 
import InfoTooltip from './InfoTooltip.js';

function Login ({setIsLoggedIn}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(null);
  const [tooltipStatus, setTooltipStatus] = React.useState("");
  

  const history = useHistory();

 // console.log('history',history);
  

  function onLogin({ email, password }) {
    auth.login(email, password)
      .then((res) => {
        console.log('res', res);
        setIsLoggedIn(true);
        setEmail(email);
       history.push("/");
      })
      .catch((err) => {
        console.log('err',err);
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  }



  function handleSubmit(e){

    e.preventDefault();
    const userData = {
      email,
      password
    }
    onLogin(userData);
  }

   // при монтировании App описан эффект, проверяющий наличие токена и его валидности
   React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log('stor', token);
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [history]);

  //setIsInfoToolTipOpen(true)

  console.log('isInfoToolTipOpen', isInfoToolTipOpen, tooltipStatus)

  return (
    <div>
        <div className="auth-form">
          <form className="auth-form__form" onSubmit={handleSubmit}>
            <div className="auth-form__wrapper">
              <h3 className="auth-form__title">Вход</h3>
              <label className="auth-form__input">
                <input type="text" name="name" id="email"
                  className="auth-form__textfield" placeholder="Email"
                  onChange={e => setEmail(e.target.value)} required  />
              </label>
              <label className="auth-form__input">
                <input type="password" name="password" id="password"
                  className="auth-form__textfield" placeholder="Пароль"
                  onChange={e => setPassword(e.target.value)} required  />
              </label>
            </div>
            <button className="auth-form__button" type="submit">Войти</button>
          </form>
        </div>
        <InfoTooltip isOpen={isInfoToolTipOpen}  onClose={setIsInfoToolTipOpen} status={tooltipStatus} />
    </div>
  )
}

export default Login;

