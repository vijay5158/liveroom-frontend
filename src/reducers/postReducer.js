import { useSelector } from "react-redux";
import * as actionTypes from "../actions/actions";


const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const initialState = {
    classSlug: null,
    posts: [],
    comments:[],
    error: null,
    loading: false
};


const getPostListStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const getPostListSuccess = (state, action) => {
    return updateObject(state, {
        posts: action.posts,
        classSlug: action.slug,
        error: null,
        loading: false
    });
};

const getPostListFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};
const handlePostLogout = (state, action) => {
    return updateObject(state, {
        posts: []
    });
};


const createPostStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const createPostSuccess = (state, action) => {
    const newPosts = [action.post,...state.posts]
    return updateObject(state, {
        posts: newPosts,
        error: null,
        loading: false
    });
};

const createPostFail = (state, action) => {
    return updateObject(state, {
        
        error: action.error,
        loading: false
    });
};


const getCommentListSuccess = (state, action) => {
    return updateObject(state, {
        comments: action.comments,
        error: null,
        loading: false
    });
};

const createCommentSuccess = (state, action) => {
    const newComments = [...state.comments,action.comment]
    return updateObject(state, {
        comments: newComments,
        error: null,
        loading: false
    });
};


export const usePosts = () => useSelector(root => root?.postReducer?.posts);
export const useclassSlug = () => useSelector(root => root?.postReducer?.classSlug);
export const useComments = () => useSelector(root => root?.postReducer?.comments);
export const usePostError = () => useSelector(root => root?.postReducer?.error);
export const usePostloading = () => useSelector(root => root?.postReducer?.loading);


const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_POST_START:
            return createPostStart(state, action);
        case actionTypes.CREATE_POST_SUCCESS:
            return createPostSuccess(state, action);
        case actionTypes.CREATE_POST_FAIL:
            return createPostFail(state, action);
        case actionTypes.GET_POSTS_LIST_START:
            return getPostListStart(state, action);
        case actionTypes.GET_POSTS_LIST_SUCCESS:
            return getPostListSuccess(state, action);
        case actionTypes.GET_POSTS_LIST_FAIL:
            return getPostListFail(state, action);
        case actionTypes.GET_COMMENTS_LIST_SUCCESS:
            return getCommentListSuccess(state, action);
        case actionTypes.CREATE_COMMENT_SUCCESS:
            return createCommentSuccess(state, action);


        case actionTypes.HANDLE_POSTS_LOGOUT:
            return handlePostLogout(state, action);

        default:
            return state;
    }
};

export default postReducer;