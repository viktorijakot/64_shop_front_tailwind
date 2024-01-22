import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  email: "",
  login(email, token) {},
  logout() {},
  isUserLoggedIn: false,
});

AuthContext.displayName = "MusuAutentifikacija";

function AuthCtxProvider({ children }) {
  const [authState, setAuthState] = useState({
    token: "",
    email: "",
  });

  function login(email, token) {
    // console.log(email, token);
    setAuthState({
      token,
      email,
    });
  }

  function logout() {
    setAuthState({
      token: "",
      email: "",
    });
  }

  const isUserLoggedIn = !!authState.token;

  //   console.log(isUserLoggedIn);

  const ctxValue = {
    isUserLoggedIn,
    token: authState.token,
    email: authState.email,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}

export default AuthCtxProvider;

export function useAuthContext() {
  return useContext(AuthContext);
}
