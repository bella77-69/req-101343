const TOKEN_KEY = "jwt";

export const login = () => {
  fetch("http://localhost:5000/admin").then((response) => {
    console.log(response);
    localStorage.setItem(TOKEN_KEY, "token");
  });
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
};
