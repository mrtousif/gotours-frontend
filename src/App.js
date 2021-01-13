import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    // withRouter,
    // Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Copyright from "./components/Copyright";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Tour from "./pages/Tour";
import UserProvider from "./contexts/UserProvider";
import NotFound from "./pages/NotFound";
import { Provider } from "use-http";

// function PrivateRoute({ children, ...rest }) {
//     // let auth = useAuth();
//     const auth = {};

//     return (
//         <Route
//             {...rest}
//             render={({ location }) =>
//                 auth.user ? (
//                     children
//                 ) : (
//                     <Redirect
//                         to={{
//                             pathname: "/login",
//                             state: { from: location },
//                         }}
//                     />
//                 )
//             }
//         />
//     );
// }

function ScrollToTop() {
    const { pathname } = useLocation();

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

let url = "";
if (process.env.NODE_ENV === "production") {
    url = "https://gotours-touring-app-101.herokuapp.com/api/v1";
} else if (process.env.NODE_ENV === "development") {
    url = "http://localhost:5000/api/v1";
}

function App() {
    return (
        <div>
            <Provider url={url}>
                <Router>
                    <ScrollToTop />
                    <UserProvider>
                        <NavBar />

                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={(props) => <Home {...props} />}
                            />
                            {/* <ScrollToTop> */}
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                            <Route exact path="/tours/:id" component={Tour} />
                            <Route path="*" component={NotFound} />

                            {/* </ScrollToTop> */}
                        </Switch>

                        <Copyright />
                    </UserProvider>
                </Router>
            </Provider>
        </div>
    );
}

export default App;
