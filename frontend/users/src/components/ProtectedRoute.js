import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
  console.log(props)
  return (
/*     <Route exact>
      {
        () => props.loggedIn ? <Component {...props} /> : <Redirect to="./signin" />
      }
    </Route> */
    props.loggedIn ?
    <Route path="/signin" element={ 
      <Component {...props} /> } />:
    {/* <Route {...props} 
    element={props.loggedIn ? <Component {...props} /> : <Navigate to="/signin" />} /> */}
)}

export default ProtectedRoute;