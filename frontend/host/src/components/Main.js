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
 

  return (
     <main className="content">
      <UserInfo/> 
     <CardsInfo/> 
    </main>
  );
}

export default Main;
