import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCLS } from "../../actions/classAction";
import Loader from "../Loader/Loader";
import LoginDialog from "../Login/LoginDialog";
import Class from './Class/Class';
import CreateClass from "./Class/Create";
import JoinClass from "./Class/JoinClass";



const Classes = (props) => {
    const token = props.token;
    const is_student = props.is_student;
    const classes = props.classes;
    const [anchorEl, setAnchorEl] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (token) {
            if (props.classes.length === 0) {
                props.getCLS(token)
            }
        }
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    if (props.loading) { return (<Loader />) }
    else {
        return (
            <>
                {(token) ?
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start'
                    }} >
                        {(props.classes.length === 0) ? <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', margin: 'auto', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}><h1>No Classes to show.</h1><hr />{(is_student) ? <p>Join a Class.</p> : <p>Create a Class.</p>}  </div> :
                            <Box display="flex"
                                flexWrap="wrap"
                                p={1}
                                m={1}
                                alignItems="center"
                                justifyContent="flex-start"
                                margin="auto"
                                maxWidth="1200px"
                                padding="20px"

                                marginTop='20px'
                                borderRadius='10px'
                            >

                                {props.classes.map((cls, index) => <Class key={index} clsId={cls.id} slug={cls.slug} classname={cls.class_name} subject={cls.subject} standard={cls.standard} teacher={cls.teachers} />)}

                            </Box>}
                        <Button style={{ position: 'fixed', right: '2%', marginTop: '1rem' }} aria-controls="simple-menu" aria-haspopup="true"
                            onClick={handleClick}>
                            <AddCircleOutlineRoundedIcon style={{ color: 'rgb(88,65,139)' }} fontSize='large' />
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem>
                                {(is_student) ? <JoinClass close={handleClose} /> : <CreateClass close={handleClose} />}
                            </MenuItem>


                        </Menu>

                    </div>
                    :
                    <div>
                        <h1 style={{ marginTop: '20px' }}>Login to see your classes.</h1>

                        <LoginDialog text="Login" />
                    </div>}
            </>
        )
    }
}



const mapStateToProps = state => {
    return {
        is_student: state.authReducer.is_student,
        email: state.authReducer.email,
        loading: state.classReducer.loading,
        token: state.authReducer.token,
        classes: state.classReducer.classes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCLS: (token) => dispatch(getCLS(token))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Classes));