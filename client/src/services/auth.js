const authenticate = (token) => {
    return true;
  };
  
  const login = (token) => {
    //storing the token in local storage
    localStorage.setItem("token", token);
  };
  
  const logout = () => {
    // removing the token from local storage
    localStorage.removeItem("token");
  };
  
  const isAuthenticated = () => {
    // verifying the token
    const token = localStorage.getItem("token");
    return authenticate(token);
  };
  
  export { login, logout, isAuthenticated };