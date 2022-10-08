import React, { useState, useEffect, useCallback }from 'react';

let logoutTimer;
const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {}
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime
  return remainingDuration
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate)

  if (remainingTime <= 0) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;

  }
  return {
    token: storedToken,
    duration: remainingTime
  }
}

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initalToken;
  if(tokenData){
    initalToken = tokenData.token
  } 
  const [token, setToken] = useState(initalToken)

  const userIsLoggedIn = !!token;

  
  const logOutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime')
    
    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }, [])
  
  const logInHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime)
    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logOutHandler, remainingTime)
  };

  useEffect(() => {
    if (tokenData){
      console.log(tokenData.duration)
      logoutTimer =  setTimeout(logOutHandler, tokenData.duration)
    }
  }, [tokenData, logOutHandler])
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: logInHandler,
    logout: logOutHandler
  }

  return (
  <AuthContext.Provider value={contextValue}>
    {props.children}
    </AuthContext.Provider>
    );
  }

  export default AuthContext