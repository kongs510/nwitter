import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import Home2 from "routes/Home2";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedIn ?
                    <div style={{
                        maxWidth: 890,
                        width: "100%",
                        margin: "0 auto",
                        marginTop: 80,
                        display: "flex",
                        justifyContent: "center",
                    }}>
                        <Route exact path="/">
                            {/* <Home1 userObj={userObj} /> */}
                            <Home2 userObj={userObj} />
                        </Route>
                        <Route exact path="/Profile">
                            <Profile userObj={userObj} refreshUser={refreshUser} />
                        </Route>
                    </div>
                    :
                    <Route exact path="/">
                        <Auth />
                    </Route>
                }
            </Switch>
        </Router>
    );
};

export default AppRouter;
