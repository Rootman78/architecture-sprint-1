import React from 'react';
//import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from "../utils/api";


function UserInfo({   onAddPlace   }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =  React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [currentUserData, setCurrentUserData] = React.useState({});

  const imageStyle = { backgroundImage: `url(${currentUserData.avatar})` };
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  React.useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUserData(userData);
        
       // console.log('userData', userData);
       // console.log('cardData', cardData);
      })
      .catch((err) => console.log(err));
  }, []);


  return (

      <section className="profile page__section">
        <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUserData.name}</h1>
          <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
          <p className="profile__description">{currentUserData.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={handleAddPlaceClick}></button>
      </section>

  );
}

export default UserInfo;
