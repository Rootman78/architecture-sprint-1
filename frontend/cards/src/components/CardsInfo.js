import React, { lazy } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function CardsInfo() {
  const currentUser = React.useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  

  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

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

  React.useEffect(() => {
    api.getCardList()
      .then((cardData) => {
        setCards(cardData);
        
       // console.log('userData', userData);
       // console.log('cardData', cardData);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    

       <section className="places page__section">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section> 
    
  );
}

export default CardsInfo;
