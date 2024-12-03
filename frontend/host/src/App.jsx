import React, { lazy, useState }  from "react";
import {  BrowserRouter as Router, useNavigate, Routes, Route} from "react-router-dom";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
//import PopupWithForm from "./PopupWithForm";
//import ImagePopup from "./ImagePopup";
import api from "./utils/api";

//import EditProfilePopup from "./EditProfilePopup";
//import EditAvatarPopup from "./EditAvatarPopup";
//import AddPlacePopup from "./AddPlacePopup";

import * as auth from "./utils/auth.js"; 

import "./index.css";

const Login = lazy(() => import('users/Login').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
 );

 const Register = lazy(() => import('users/Register').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
 );

 const ProtectedRoute = lazy(() => import('users/ProtectedRoute').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
 );
 ProtectedRoute



 const Card = lazy(() => import('cards/Card').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
 );




  const App = () => {

 // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
 const [currentUser, setCurrentUser] = useState({});

 const [isLoggedIn, setIsLoggedIn] = useState(false);
 //В компоненты добавлены новые стейт-переменные: email — в компонент App
 const [email, setEmail] = useState("");

 const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =  useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

 

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState("");



   const history = useNavigate();

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

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userUpdate) {
    api.setUserInfo(userUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarUpdate) {
    api.setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
      .then((newCardFull) => {
        setCards([newCardFull, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }



  



    return (
  

    // В компонент App внедрён контекст через CurrentUserContext.Provider
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header email={email}  />
         <Routes>
           <ProtectedRoute
            exact
            path="/"
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={isLoggedIn}
          /> 
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login/>} />
       
        </Routes> 
        <Footer />
      {/*    <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
        />
        <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          status={tooltipStatus}
        />  */}
      </div>
    </CurrentUserContext.Provider>
  );
  }

  const rootElement = document.getElementById("app")
  if (!rootElement) throw new Error("Failed to find the root element")
  
  const root = ReactDOM.createRoot(rootElement)
  
  root.render(  
  
    <Router>
          <App />
    </Router>
   )



