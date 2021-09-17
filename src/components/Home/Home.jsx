import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logout } from '../../actions/authAction';
import logo from "../../images/logo1.png";
import Login from "../Login/LoginDialog";
import '../Navbar/style.css';
import About from "./About";
import Contact from "./Contact";

function Home(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    let token = props.token;
    return (

        <div>
            <section className="background firstSection">
                <div className="box-main">
                    {(!token) ? <div className="firstHalf">
                        <p className="text-big1">Get more time to teach and inspire learners with <span
                            className="projName">LiveRoom</span></p>
                        <div className="main-para"><p className="text-small1">A free and easy tool helping educators
                            efficiently manage
                            and assess progress, while enhancing connections with learners from school, from home,
                            or on the go.</p>
                        </div>
                        <div className="buttons">
                            <Login text="Getting Started" />


                        </div>
                    </div> : <div className="firstHalf" style={{ alignItems: 'center' }}>
                        <p className="text-big1">Welcome back ! <span
                            className="projName">{props.firstName + ' ' + props.lastName}</span></p>

                        <div className="buttons">
                            <Link to='classes/'><button className="btn">Go to Classroom</button></Link>


                        </div>
                    </div>}


                    <div className="secondHalf">
                        <img src={logo} alt="Laptop" className="vert-move" />
                    </div>
                </div>
            </section>

            {(!token) ? <div><About /><Contact /></div> : null}



        </div>
    )
}

const mapStateToProps = state => {
    return {
        authenticated: state.authReducer.token !== null,
        token: state.authReducer.token,
        firstName: state.authReducer.firstName,
        lastName: state.authReducer.lastName,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Home))