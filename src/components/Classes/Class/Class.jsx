import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import clsx from "clsx";
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import Cardbg from '../../../images/classcardbg.jpg';
import Coa from "../../../images/coa.jpg";
import './class.css';

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'Audiowide',
        maxWidth: 345,
        backgroundImage: `url(${Cardbg})`,
        boxShadow: '2px 10px 20px rgba(0,0,0, 0.5)'
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        fontFamily: 'Audiowide'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));


function Class(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>

            <Box p={1}>
                <Link id='card-link' style={{ textDecoration: 'none', fontFamily: 'Audiowide' }} to={props.slug}  >
                    <div>
                        <Card className={classes.root}>
                            <CardHeader
                                style={{ width: '300px', marginTop: '1rem', height: '60px', fontFamily: 'Audiowide, cursive' }}
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        {props.subject.charAt(0)}
                                    </Avatar>
                                }
                                title={<p className='projName' style={{ fontSize: '1rem' }}>{props.subject}</p>}
                                subheader={<p>{props.classname + " " + props.standard}</p>}
                            />
                            <CardMedia
                                className={classes.media}
                                image={Coa}
                                title={props.subject}
                            />
                            <CardContent>
                                <p>      Teacher : {props.teacher}</p>

                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <p>{"Teacher - " + props.teacher}</p>

                                </CardContent>
                            </Collapse>
                        </Card>
                    </div>
                </Link>

            </Box>

        </>

    );
}

export default Class;
