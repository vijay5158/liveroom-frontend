import { Card, CardActions, Container, Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import FormData from 'form-data';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { getAnmnt, getCLS } from "../../../actions/classAction";
import { createCommentSuccess, createPost, createPostSuccess, getComment, getPost } from "../../../actions/postAction";
import Cardbg from '../../../images/classcardbg.jpg';
import Loader from "../../Loader/Loader";
import Post from "../../Post/Post";
import './cardStyle.css';
import SideBar from "./SideBar";




const useStyles = makeStyles((theme) => (
    {
        root: {
            minWidth: 275,
            backgroundImage: `url(${Cardbg})`,
            width: '70vw'
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        cardMedia: {
            paddingTop: '56.25%', // 16:9
        },
        link: {
            margin: theme.spacing(1, 1.5),
        },
        cardHeader: {
            backgroundColor:
                theme.palette.type === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[700],
        },
        postTitle: {
            fontSize: '16px',
            textAlign: 'left',
        },
        postText: {
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'baseline',
            fontSize: '12px',
            textAlign: 'left',
            marginBottom: theme.spacing(2),
        }
    }));
function ClassDetail(props) {
    let webSocket = undefined;
    const Classes = props.classes;
    const { slug } = useParams();
    const [expand, setExpand] = useState(false);
    const history = useHistory();
    const Class = Classes.filter((cls) => {

        return cls.slug === slug

    })
    useEffect(() => {
        window.scrollTo(0, 0)
        props.getPost(props.token, slug)
        props.getComment(props.token, slug)
        props.getAnmnt(props.token, slug)
        if (localStorage.getItem('classConnections') != null) {

            const connections = JSON.parse(localStorage.getItem('classConnections'))
            if (!connections['slugs'].includes(slug)) {
                connect(slug);
            }
        }

        else {
            connect(slug);
        }
    }, [])


    const connect = useCallback((slug) => {
        const path = `ws://localhost:8000/ws/class/${slug}/`;
        webSocket = new WebSocket(path);
        webSocket.onopen = () => {
            console.log("WebSocket open");
        };
        webSocket.onmessage = e => {
            const data = JSON.parse(e.data);
            if (data.comment != null) {
                props.createCommentSuccess(data.comment)


            }
            if (data.post != null) {
                props.createPostSuccess(data.post);

            }

        };
        webSocket.onerror = e => {
            console.log(e.message);
        };
        webSocket.onclose = () => {
            console.log("WebSocket closed let's reopen");
            //   connect();
        };

        if (localStorage.getItem('classConnections') != null) {
            let connections = JSON.parse(localStorage.getItem('classConnections'));
            let slugs = connections['slugs'];
            slugs = [...slugs, slug];
            connections = { 'slugs': slugs };
            localStorage.setItem('classConnections', JSON.stringify(connections));
        }
        else {
            const slugs = [slug];
            const connections = { 'slugs': slugs };
            localStorage.setItem('classConnections', JSON.stringify(connections));
        }
    }
        , [webSocket]);
    const disconnect = useCallback(() => {
        webSocket.close();
    }, [webSocket]);



    const classId = Class[0].id
    const initialFormData = Object.freeze({
        text: '',
        classroom: classId

    });
    const data = {
        slug: slug
    }
    const [postData, updatePostData] = useState(initialFormData);
    const [postImage, setPostImage] = useState(null);


    const handleChangeFile = (event) => {
        setPostImage({
            file: event.target.files,
            file_name: event.target.value.slice(12)
        });
    }

    const handleChange = (event) => {
        updatePostData({
            ...postData,
            [event.target.name]: event.target.value.trim(),
        });
    };
    const handleSubmit = (event) => {
        let post = new FormData();
        post.append('text', postData.text);
        post.append('classroom', postData.classroom);
        post.append('file', postImage.file[0]);
        post.append('file_name', postImage.file_name);

        props.createPost(props.token, post);

        setExpand(false)
    }
    const classes = useStyles();
    classes.cardContent = undefined;
    classes.card = undefined;
    const refresh = () => {
        props.getPost(props.token, slug)
        props.getComment(props.token, slug)
    }

    if (Classes.length === 0) {
        history.push('/')
        window.location.reload();
    }
    else {
        if (props.loading) {
            return (<Loader />)
        }
        else {
            return (
                <>
                    <SideBar slug={slug} isStudent={props.is_student} />
                    <div className='card-div'>
                        <Card className={classes.root}>

                            <CardContent>

                                <h4 style={{ color: '#58418b', fontSize: '1rem' }}>
                                    {Class[0].class_name + " " + Class[0].standard}
                                </h4>
                                <h2 className="projName" style={{ color: '#58418b', fontSize: '2rem' }}>
                                    {Class[0].subject}
                                </h2>
                                {(!props.is_student) ? <p style={{ color: 'gray', fontSize: '0.8rem' }}>
                                    Class code: {Class[0].slug}
                                </p> : <p style={{ color: 'gray', fontSize: '0.8rem' }}>
                                    Class Teacher: {Class[0].teachers}
                                </p>}

                                {/*    <Typography variant="body2" component="p">*/}
                                {/*        well meaning and kindly.*/}
                                {/*        <br />*/}
                                {/*        {'"a benevolent smile"'}*/}
                                {/*    </Typography>*/}
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={refresh}>Refresh</Button>
                            </CardActions>
                        </Card>
                    </div>
                    <div className="post-div">
                        <Container maxWidth="md" id='postContainer' component="main">
                            {(!props.is_student) ?

                                <div className="add-post">

                                    <form action="" encType="multipart/form-data" className="add-form">
                                        <div className="input-form">

                                            <Input placeholder={(expand) ? "Enter Text" : "Click to add post."} autoFocus={(expand)} onChange={handleChange} onClick={() => setExpand(true)} name="text" fullWidth={true} multiline={(expand) ? true : false} rows={2} />
                                            {(expand) ?
                                                <Button style={{ marginTop: '1rem' }}>
                                                    <Input type="file" multiple id="file"
                                                        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                                                        onChange={handleChangeFile} disableUnderline={true} name="file" /> </Button> : null}
                                        </div>
                                        {(expand) ?
                                            <div className="button-form">
                                                <Button type="reset" onClick={handleSubmit} >
                                                    <SendIcon style={{ color: '#f74754' }} />
                                                </Button>
                                                <Button onClick={() => setExpand(false)}>
                                                    <CloseIcon style={{ color: '#f74754' }} />
                                                </Button>
                                            </div>
                                            : null}
                                    </form>
                                </div> : null}
                            {props.posts.map((post, index) => <Post key={index} firstName={post.user.first_name} slug={slug} lastName={post.user.last_name} profileImg={post.user.profile_img} text={post.text} file_name={post.file_name} file={post.file} user={post.user} date={post.date} time={post.time} post_id={post.id} />)}
                        </Container>

                    </div>
                </>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        is_student: state.authReducer.is_student,
        email: state.authReducer.email,
        loading: state.classReducer.loading,
        token: state.authReducer.token,
        classes: state.classReducer.classes,
        posts: state.postReducer.posts,
        classSlug: state.postReducer.classSlug
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCLS: (token) => dispatch(getCLS(token)),
        getPost: (token, slug) => dispatch(getPost(token, slug)),
        createPost: (token, post) => dispatch(createPost(token, post)),
        getComment: (token, slug) => dispatch(getComment(token, slug)),
        getAnmnt: (token, slug) => dispatch(getAnmnt(token, slug)),
        createPostSuccess: (post) => dispatch(createPostSuccess(post)),
        createCommentSuccess: (comment) => dispatch(createCommentSuccess(comment))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ClassDetail));