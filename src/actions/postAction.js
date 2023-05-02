import * as actionTypes from "./actions";
import axios from "axios";


const createPostStart = () => {
    return {
        type: actionTypes.CREATE_POST_START
    };
};

export const createPostSuccess = post => {
    return {
        type: actionTypes.CREATE_POST_SUCCESS,
        post
    };
};


const createPostFail = error => {
    return {
        type: actionTypes.CREATE_POST_FAIL,
        error: error
    };
};

export const createPost = (token, post) => {
    return dispatch => {
        dispatch(createPostStart());
        axios.post('http://localhost:8000/api/class/post/', post, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${post._boundary}`,
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                // alert(res.data)
                // dispatch(createPostSuccess(res.data));
            })
            .catch(err => {
                dispatch(createPostFail(err));
            });
    };
};

const getPostListStart = () => {
    return {
        type: actionTypes.GET_POSTS_LIST_START
    };
};

const getPostListSuccess = (posts, slug) => {
    return {
        type: actionTypes.GET_POSTS_LIST_SUCCESS,
        posts,
        slug
    };
};

const getPostListFail = error => {
    return {
        type: actionTypes.GET_POSTS_LIST_FAIL,
        error: error
    };
};
export const handlePostLogout = () => {
    // localStorage.removeItem("classes");
    // axios.defaults.headers['Authorization'] = null;
    return {
        type: actionTypes.HANDLE_POSTS_LOGOUT
    };
}

export const getPost = (token, slug) => {
    return dispatch => {

        dispatch(getPostListStart());
        axios.defaults.headers = {
            Authorization: `Bearer ${token}`
        };
        const url = `http://localhost:8000/api/class/post/?slug=${slug}`
        axios
            .get(url)
            .then(res => {
                console.log(res.data);
                const posts = res.data;
                dispatch(getPostListSuccess(posts, slug));
            })
            .catch(err => {
                dispatch(getPostListFail(err));
                alert(err);
            });

    };
};

function getCommentListSuccess(comments) {
    return {
        type: actionTypes.GET_COMMENTS_LIST_SUCCESS,
        comments
    };
}

export const getComment = (token, slug) => {
    return dispatch => {


        axios.defaults.headers = {
            Authorization: `Bearer ${token}`
        };
        const url = `http://localhost:8000/api/class/comment/?slug=${slug}`
        axios
            .get(url)
            .then(res => {
                console.log(res.data);
                const comments = res.data;
                dispatch(getCommentListSuccess(comments));
            })
            .catch(err => {
                alert(err);
            });
    };
};


export const createCommentSuccess = (comment) => {
    return {
        type: actionTypes.CREATE_COMMENT_SUCCESS,
        comment
    };
}

export const createComment = (token, comment) => {
    return dispatch => {
        axios.post('http://localhost:8000/api/class/comment/', comment, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                // alert(res.data)
                // dispatch(createCommentSuccess(res.data));
            })
            .catch(err => {
                alert(err)
            });
    };
};