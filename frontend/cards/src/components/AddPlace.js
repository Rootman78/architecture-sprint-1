import React from 'react';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from "../utils/api";


function AddPlace({   onAddPlace   }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
 

 
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }




  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
      .then((newCardFull) => {
        setCards([newCardFull, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => console.log(err));
  }


  return (
    <div>
      <AddPlacePopup
         isOpen={isAddPlacePopupOpen}
         onAddPlace={handleAddPlaceSubmit}
         onClose={setIsAddPlacePopupOpen}
       />
  </div>

  );
}

export default AddPlace;
