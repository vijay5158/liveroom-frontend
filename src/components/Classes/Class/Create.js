import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { useState } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createCLS, getCLS } from "../../../actions/classAction";

function CreateClass(props) {
   
    const [open, setOpen] = useState(false);
    const initialFormData = Object.freeze({
        classname: '',
        subject : '',
        standard : '',
        email: ''

    })
    const [FormData, setFormData] = useState(initialFormData);
    const handleChange = (event)=>{
        setFormData({
            ...FormData,
            [event.target.name] : event.target.value.trim(),
        });
    };
    const createClass = (event)=>{
        event.preventDefault();
        const cls = {
            class_name : FormData.classname,
            standard : FormData.standard,
            subject : FormData.subject,
            teachers : props.email
        }
        console.log(cls)
        props.createCLS(props.token,cls);
        setOpen(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseclass = () => {
        setOpen(false);
    };

    return (
        <div>
            <a  onClick={handleClickOpen}>
                Create Class
            </a>
            <Dialog open={open} onClose={handleCloseclass} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Class</DialogTitle>
                <form action="/classes/">
                    <DialogContent>
                    <DialogContentText>
                        To create a class , please enter class details.

                    </DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="classname"
                        label="Class Name"
                        type="text"
                        fullWidth
                        name="classname"
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="subject"
                        label="Subject"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        name = "subject"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="standard"
                        label="Standard"
                        type="text"
                        fullWidth
                        name="standard"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseclass} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" onClick={createClass} color="primary">
                        Create Class
                    </Button>

                </DialogActions>
                </form>
                </Dialog>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        email: state.authReducer.email,
        loading: state.authReducer.loading,
        token: state.authReducer.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createCLS: (token, cls) => dispatch(createCLS(token,cls)),
        getCLS: (token) => dispatch(getCLS(token))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateClass));