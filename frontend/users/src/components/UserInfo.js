import React, { lazy } from 'react';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import { CurrentUserContext } from '../../../host/src/contexts/CurrentUserContext';
import api from "../utils/api";

//import "../index.css";

const AddPlacePopup = lazy(() => import('cards/AddPlacePopup').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
 );


function UserInfo({currentUser, setCurrentUser, cards, setCards}) {
  //const currentUser = React.useContext(CurrentUserContext);
  //console.log('currentUserU', currentUser);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =  React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  //const [currentUserData, setCurrentUserData] = React.useState({});
 // const [cards, setCards] = React.useState([]);

  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateAvatar(avatarUpdate) {
    api.setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateUser(userUpdate) {
    api.setUserInfo(userUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => console.log(err));
  }



/*   React.useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUserData(userData);
        
       console.log('userData', userData);
       // console.log('cardData', cardData);
      })
      .catch((err) => console.log(err));
  }, []); */

  React.useEffect(() => {
    api.getAppInfo()
      .then(([cardData, userData]) => {
        setCurrentUser(userData);
        setCards(cardData);
       // console.log('userData', userData);
       // console.log('cardData', cardData);
      })
      .catch((err) => console.log(err));
  }, []);

//console.log('currentUserData', currentUserData);
  return (
    <div>
      <section className="profile page__section">
        <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button"  onClick={handleAddPlaceClick}></button>
      </section>
      <EditAvatarPopup
             isOpen={isEditAvatarPopupOpen}
             onUpdateAvatar={handleUpdateAvatar}
             onClose={setIsEditAvatarPopupOpen}
           />
      <EditProfilePopup
         currentUser={currentUser}
         isOpen={isEditProfilePopupOpen}
         onUpdateUser={handleUpdateUser}
         onClose={setIsEditProfilePopupOpen}
       /> 
      <AddPlacePopup
         isOpen={isAddPlacePopupOpen}
         cards={cards}
         setCards={setCards}
         onClose={setIsAddPlacePopupOpen}
       />

  </div>

  );
}

export default UserInfo;
