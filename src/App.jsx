import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import PrivateRoute from "./utils/PrivateRoute";
import { useAuth } from "./reducers/authReducer";
import { getCLS } from "./actions/classAction";

function App(props) {
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(authCheckState())
        if(auth.token){
            dispatch(getCLS(auth.token));
        }
        setLoading(false)
            }
    , [])
    if(auth?.loading || loading){
        return (<Loader/>)
    }
    else {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar {...props} />
                    <Routes>
                        <Route exact path='/' element={<Home />}>
                        </Route>
                        <Route exact path='/contact/' element={<Contact />}/>
                        <Route element={<PrivateRoute/>}>
                        <Route exact path='/my-account/' element={<Profile />}/>
                        <Route exact path='/classes/:slug' element={<ClassDetail />}/>
                        <Route exact path='/classes/' element={<Classes {...props}/>}>
                        </Route>
                        <Route exact path='/announcements/:slug' element={<Announcements {...props}/>}>
                        </Route>
                        </Route>
                    </Routes>
                    <Footer/>
                </div>
            </BrowserRouter>
        )
    }
}
// const mapStateToProps = state => {
//     return {
//         isAuthenticated: state.authReducer.token !== null,
//         token: state.authReducer.token,
//         loading: state.authReducer.loading
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onTryAutoSignup: () => dispatch(authCheckState())
//     };
// };

export default App;
