import React, { lazy } from 'react';
import Card from './Card';
import ImagePopup from './ImagePopup';
import api from "../utils/api";



function CardsInfo({currentUser, setCurrentUser, cards, setCards}) {

  const [selectedCard, setSelectedCard] = React.useState(null);
 

  function handleCardClick(card) {
    setSelectedCard(card);
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

  return (
  <div>  
       <section className="places page__section">
        <ul className="places__list">
          {cards.length>0 &&
           cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              currentUser={currentUser}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section> 
      <ImagePopup card={selectedCard} onClose={setSelectedCard} /> 

   </div> 
  );
}

export default CardsInfo;
