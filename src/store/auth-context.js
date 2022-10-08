import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;
const AuthContext = React.createContext({
  token:'',
  isLoggedin: false,
  login: (token) => {},
  logout: () => {}
})

const calculateRemainingTime = (expTime) => {
  const currentTime = newDate().getTime();
  const adjustExpTime= newDate(expTime).getTime();

  const remainingDuration= adjustExpTime - currentTime
  return remainingDuration
};

const retrieveStoredToken = () =>{
  const storedToken=localStorage.getItem('token');
  const storeExpDate = localStorage.getItem('expTime')

  const remainingTime = calculateRemainingTime(storedExpDate)

  if (remainingTime < 0) {
    localStorage.removeItem('token')
    localStorage.removeItem('expTime')
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime
  }
}

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if(tokenData){
    initialToken = tokenData.token
  }

  const [token, setToken] = useState(initialToken)

  const userIsLoggedIn = !!token;

  const logoutHandler =  useCallback(() =>{
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('expTime')

    if(logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }, [])

  const loginHandler = (token, expTime) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expTime', expTime);
    const remainingTime = calculateRemainingTime(expTime)

    logoutTimer = setTimeout(logoutHandler, remainingTime)
  };

  useEffect(()=> {
    if(tokenData){
      console.log(tokenData.duration)
      logoutTimer = setTimeout(logoutHandler, tokenData.duration)
    }
  }, [tokenData, logoutHandler])

  const contextValue= {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logoutHandler: logoutHandler
  }

  return (
    <AuthContext.Provider value = {contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext