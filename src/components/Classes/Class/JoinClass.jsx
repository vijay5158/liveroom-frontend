import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { getCLS, joinCLS } from "../../../actions/classAction";

function JoinClass(props) {

    const [open, setOpen] = React.useState(false);
    const initialData = Object.freeze({
        slug: '',
        student_id: props.userId,
    });

    const [data, setData] = useState(initialData);
    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value.trim(),
        });

    };
    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleCloseClass = () => {
        setOpen(false);
        props.close();

    };
    function handleJoin() {
        const duplicateClass = props.classes.filter((cls) => {
            return cls.slug === data.slug
        })
        if (duplicateClass.length === 0) {
            props.joinClass(props.token, data);
        }
        else {
            alert('You are already joined.')
        }
        handleCloseClass();

    }

    // useEffect(() => {
    //     console.log(props.classes)
    // }, []);
    return (
        <div><a onClick={handleClickOpen}>
            Join Class
        </a>
            <Dialog open={open} onClose={handleCloseClass} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Join Class</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To join class , please enter class details.

                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="uniqueCode"
                        label="Enter the class unique code"
                        type="text"
                        fullWidth
                        name="slug"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseClass} id="main-div" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleJoin} color="primary">
                        Join Class
                    </Button>
                </DialogActions>
            </Dialog></div>
    );
}

const mapStateToProps = state => {
    return {
        userId: state.authReducer.userId,
        token: state.authReducer.token,
        classes: state.classReducer.classes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        joinClass: (token, data) => dispatch(joinCLS(token, data)),
        getCLS: (token) => dispatch(getCLS(token))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(JoinClass));