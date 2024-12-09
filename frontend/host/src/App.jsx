import React, { lazy, Suspense }  from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, useHistory, Switch } from "react-router-dom";
import Header from "./components/Header";
import  ProtectedRoute from "./components/ProtectedRoute";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import api from "./utils/api";
import * as auth from "./utils/auth.js"; 


const Login = lazy(() => import('users/Login').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
 );

 const Register = lazy(() => import('users/Register').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
 );

 

function App() {

  // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.

  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState('');


  const history = useHistory();

     // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
    React.useEffect(() => {
    api.getAppInfo()
      .then(([cardData, userData]) => {
        setCurrentUser(userData);
        setCards(cardData);

      })
      .catch((err) => console.log(err));
  }, []);   

   // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => {
    
      localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [isLoggedIn]);   

 
  return (
     // В компонент App внедрён контекст через CurrentUserContext.Provider
     <CurrentUserContext.Provider value={{currentUser, setCurrentUser, cards, setCards}}>
     <div className="page__content">
        <Header setIsLoggedIn={setIsLoggedIn} email={email} setEmail={setEmail}/> 
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute
              exact
              path="/"
              component={Main}
              loggedIn={isLoggedIn}
            />   
                <Route path="/signup">
                  <Register  />
                </Route>
                <Route path="/signin">
                  <Login  setIsLoggedIn = {setIsLoggedIn}  />
                </Route>
          </Suspense>
       </Switch> 
       <Footer />
     </div>
   </CurrentUserContext.Provider>


);
} export default App

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
</BrowserRouter>
</React.StrictMode>)