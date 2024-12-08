import React, { lazy } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';




const UserInfo = lazy(() => import('users/UserInfo').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
 );

 const CardsInfo = lazy(() => import('cards/CardsInfo').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
 );


function Main() {

  const  {currentUser, setCurrentUser, cards, setCards}  = React.useContext(CurrentUserContext)
console.log('CurrentUserContextH', CurrentUserContext)
console.log('currentUserHe',currentUser)
 

  return (
     <main className="content">
      <UserInfo currentUser={currentUser} setCurrentUser={setCurrentUser} cards={cards} setCards={setCards}/> 
     <CardsInfo currentUser={currentUser} setCurrentUser={setCurrentUser} cards={cards} setCards={setCards}/> 
    </main>
  );
}

export default Main;
