import { Input } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useParams, withRouter } from 'react-router-dom';
import { createAnmnt, getAnmnt } from '../../actions/classAction';
import LoginDialog from "../Login/LoginDialog";
import './style.css';

function Announcements(props) {

    const { slug } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const Class = props.classes.filter((cls) => {

        return cls.slug === slug

    })
    const classId = Class[0].id
    const initialFormData = Object.freeze({
        announcement: '',
        classroom: classId,
    });

    const [anmnt, setAnmnt] = useState(initialFormData);

    const handleChange = (event) => {
        setAnmnt({
            ...anmnt,
            [event.target.name]: event.target.value.trim(),
        });

    }
    const handleSubmit = (e) => {
        props.createAnmnt(props.token, anmnt);
    }

    if (props.token) {
        return (
            <div style={{ marginTop: '20px' }}>
                <div className="bulletins">
                    <div class="wrap">
                        <div>
                            <span className="title projName" > Announcements </span>

                        </div>

                    </div>


                </div>
                {(!props.is_student) ? <div className="announcement" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    <form action="" className="announcement-form" style={{ display: 'flex', flexDirection: 'row', width: '90%', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="input-form">

                            <Input placeholder="Enter Announcement" autoFocus={true} onChange={handleChange} name="announcement" id='announcement' fullWidth={true} multiline={true} rows={2} />

                        </div>

                        <div className="button-form">
                            <Button type="reset" onClick={handleSubmit} >
                                <SendIcon style={{ color: '#f74754' }} />
                            </Button>
                        </div>
                    </form>
                </div>
                    : null}
                <div className="bulletins">
                    <div className="wrap">

                        {props.announcements.map((anmnt) => <div className="announcement" style={{ marginTop: "20px", width: '90%', display: 'flex', margin: 'auto', alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray' }}>
                            <p> {anmnt.announcement}</p></div>
                        )}

                    </div>


                </div>


            </div>
        );
    }
    else {
        return (
            <div>
                <h1 style={{ marginTop: '20px' }}>Login to see your announcements.</h1>
                <LoginDialog text="Login" />
            </div>
        )
    };
}

const mapStateToProps = state => {
    return {
        authenticated: state.authReducer.token !== null,
        token: state.authReducer.token,
        classes: state.classReducer.classes,
        is_student: state.authReducer.is_student,
        email: state.authReducer.email,
        announcements: state.classReducer.announcements
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createAnmnt: (token, Anmnt) => dispatch(createAnmnt(token, Anmnt)),
        getAnmnt: (token, slug) => dispatch(getAnmnt(token, slug))
        // logout: () => dispatch(logout()),
        // handleLogout: ()=> dispatch(handleLogout())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Announcements))
