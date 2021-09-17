import { Button, Input } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    AddCommentRounded
} from "@material-ui/icons";
import React, { useState } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createComment, getComment } from "../../actions/postAction";
import postbg from '../../images/postbg.jpg';
import Comment from "./Comment";
import PostData from "./PostData";
import './poststyle.css';


const useStyles1 = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: '1 0 auto',
        borderRadius: '10px',
        boxShadow: 'box-shadow: 2px 10px 20px rgba(0,0,0, 0.4)'
    },
    cover: {
        width: 101,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

        marginTop: '1.5rem',

    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: '60vw',
        boxShadow: 'box-shadow: 2px 10px 20px rgba(0,0,0, 0.4)',
        backgroundImage: `url(${postbg})`
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));



function Post(props) {
    const [expand, setExpand] = useState(false);
    const postData = Object.freeze({
        text: '',
        post: props.post_id
    });

    const [post, setPost] = useState(postData);
    const classes = useStyles();
    const classes1 = useStyles1();
    let postComments = props.comments.filter((cmnt) => cmnt.post === props.post_id);
    function showComments() {
        setExpand(true);
    }
    function hideComments() {
        setExpand(false);
    }
    function textChange(event) {
        setPost({
            ...post,
            [event.target.name]: event.target.value.trim(),
        });

    }


    async function createCmnt(e) {
        if (post.text.length === 0) {
            alert('please fill in some text.')
        }
        else {

            setPost(postData);
            document.getElementById(`text${props.post_id}`).value = '';
            props.createComment(props.token, post);
        }
    }

    return (
        <>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid >
                        <Grid item>
                            <div style={{ display: 'flex' }}>
                                <Avatar src={props.profileImg} alt='user' />
                                <Typography style={{ marginLeft: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} gutterBottom variant="subtitle1">
                                    <span style={{ fontSize: '1rem' }}>{props.firstName + ' ' + props.lastName}</span>
                                    <span style={{ fontSize: '0.7rem', color: 'gray' }}>{props.date + "  " + props.time.slice(0, 8)}</span>
                                </Typography>

                            </div>
                        </Grid>
                        <Grid item>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '1rem' }}>
                                <Typography gutterBottom variant="subtitle1" style={{ marginLeft: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} >
                                    <span style={{ fontSize: '0.8rem', marginBottom: '0.8rem', color: 'dimgray' }}>{props.text}</span>
                                    {/*<object data={props.file} width="300" height="200" type="">*/}
                                    {(props.file) ?
                                        <PostData fileName={props.file_name} file={props.file} />


                                        : null}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item>
                            <div className="comment-div" style={{ margin: '1rem', display: 'flex', flexDirection: 'row' }}>
                                <Input id={"text" + props.post_id} name="text" onChange={textChange} fullWidth={true} placeholder="post a comment" />
                                <Button type='reset'>
                                    <AddCommentRounded onClick={createCmnt} style={{ color: '#f74754' }} />
                                </Button>
                            </div>
                            <br />

                            <div className="comment-count">
                                <p>Comments</p>
                                {(expand) ?
                                    <Button onClick={hideComments} style={{
                                        boxShadow: '2px 10px 20px rgba(0,0,0, 0.2)',
                                        padding: '0.3rem',
                                        borderRadius: '0.3rem'
                                    }}><span style={{ fontSize: '0.8rem' }}
                                        className='projName'> Hide Comments</span></Button>
                                    : <Button onClick={showComments} style={{
                                        boxShadow: '2px 10px 20px rgba(0,0,0, 0.2)',
                                        padding: '0.3rem',
                                        borderRadius: '0.3rem'
                                    }}><span style={{ fontSize: '0.8rem' }}
                                        className='projName'> Show Comments</span></Button>
                                }
                            </div>
                            {/*<br/>*/}
                            <p style={{ margin: '1rem', textAlign: 'start' }}>{postComments.length} comments</p>
                            <hr />
                            {(expand) ? <div style={{ marginTop: '2rem' }}>

                                <div className="show-comments">
                                    {props.comments.filter((cmnt) => cmnt.post === props.post_id).map((comment, index) => <Comment key={index} userImg={comment.User.profile_img} name={comment.User.first_name + ' ' + comment.User.last_name} text={comment.text} time={comment.time} date={comment.date} />)}
                                </div> </div> : null}
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.postReducer.loading,
        token: state.authReducer.token,
        comments: state.postReducer.comments,


    };
};

const mapDispatchToProps = dispatch => {
    return {

        createComment: (token, comment) => dispatch(createComment(token, comment)),
        getComment: (token, slug) => dispatch(getComment(token, slug))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Post));
