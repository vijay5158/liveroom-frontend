import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { authCheckState } from "./actions/authAction";
import './App.css';
import Announcements from "./components/Announcements/Announcements";
import ClassDetail from "./components/Classes/ClassDetail/ClassDetail";
import Classes from "./components/Classes/Classes";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Home/Contact";
import Home from "./components/Home/Home";
import Loader from "./components/Loader/Loader";
import Navbar from './components/Navbar/Navbar';
import Profile from "./components/Profile/Profile";

function App(props) {
    const [loading, setLoading] = useState(true);
    useEffect(()=> {
        props.onTryAutoSignup()
        setLoading(false)
            }
    , [])
    if(props.loading || loading){
        return (<Loader/>)
    }
    else {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar {...props} />
                    <Switch>

                        <Route exact path='/'>
                            <Home {...props}/>
                        </Route>
                        <Route exact path='/contact/' component={Contact}/>
                        <Route exact path='/my-account/' component={Profile}/>
                        <Route exact path='/classes/:slug' children={ClassDetail}/>
                        <Route exact path='/classes/'>
                            <Classes {...props}/>
                        </Route>
                        <Route exact path='/announcements/:slug'>
                            <Announcements {...props}/>
                        </Route>
                    </Switch>
                    <Footer/>
                </div>
            </BrowserRouter>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null,
        token: state.authReducer.token,
        loading: state.authReducer.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(authCheckState())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
