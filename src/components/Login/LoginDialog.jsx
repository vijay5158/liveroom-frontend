import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import Signup from "./Signup";
import './style.css';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));


export default function LoginDialog(props) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div id='dialogDiv'>
            <Button className="btn" style={{ textTransform: 'capitalize', color: 'white', fontFamily: 'Audiowide' }} onClick={handleClickOpen}>
                {props.text}
            </Button>

            <Dialog fullScreen open={open} onClose={handleClose} >
                <a href="/"><IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                </IconButton></a>

                <Signup onClose={setOpen} />
            </Dialog>
        </div>
    );
}
