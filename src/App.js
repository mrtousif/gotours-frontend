import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    // withRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Copyright from "./components/Copyright";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Tour from "./pages/Tour";
import UserProvider from "./contexts/UserProvider";

function ScrollToTop() {
    const { pathname } = useLocation();

    React.useEffect(() => {
        console.log(pathname);
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    return (
        <div>
            <Router>
                <ScrollToTop />
                <UserProvider>
                    <NavBar />

                    <Switch>
                        <Route exact path="/" render={(props) => <Home {...props} />} />
                        {/* <ScrollToTop> */}
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/tours/:id" component={Tour} />
                        {/* </ScrollToTop> */}
                    </Switch>

                    <Copyright />
                </UserProvider>
            </Router>
        </div>
    );
}

export default App;
