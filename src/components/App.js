import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  //console.log(authService.currentUser);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null); //log out
      }
      setInit(true);
    });
  }, [])
  const refreshUser = () => {
    const user = authService.currentUser;
    console.log(authService.currentUser.displayName);
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  }
  return (
    <> {init ? (
      <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} />
    ) : "Initizalizing..."}
      <footer className="footer">
        &copy; Nwitter{new Date().getFullYear()} made by kong510
      </footer>
    </>
  );
}
export default App;