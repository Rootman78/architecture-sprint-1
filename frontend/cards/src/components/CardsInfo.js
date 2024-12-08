import React, { lazy } from 'react';
import Card from './Card';
import ImagePopup from './ImagePopup';
//import { CurrentUserContext } from '../../../host/src/contexts/CurrentUserContext';
import api from "../utils/api";

const CurrentUserContext = lazy(() => import('host/CurrentUserContext').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
 );

function CardsInfo({currentUser, setCurrentUser, cards, setCards}) {
  //console.log('CurrentUserContext', CurrentUserContext)
 //const {currentUser, setCurrentUser, cards, setCards} = React.useContext(CurrentUserContext);
 //console.log('currentUserCa', currentUser)
  const [selectedCard, setSelectedCard] = React.useState(null);
  //const [isCardAdd, setIsCardAdd] = React.useState(false);


  

 

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

/*   React.useEffect(() => {
    api.getCardList()
      .then((cardData) => {
        setCards(cardData);
        
       // console.log('userData', userData);
        console.log('cardData', cardData);
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
  }, [cards.length]);

console.log('cards', cards.length)
  return (
  <div>  
  {/* <CardsContext.Provider value={isCardAdd}> */}
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
      {/* </CardsContext.Provider> */}
         </div> 
  );
}

export default CardsInfo;
