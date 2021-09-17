import * as actionTypes from "../actions/actions";

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const initialState = {
    classes: [],
    currentClass: {},
    announcements: [],
    error: null,
    loading: false
};

const getCLSListStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const getCLSListSuccess = (state, action) => {
    return updateObject(state, {
        classes: action.classes,
        error: null,
        loading: false
    });
};

const getCLSListFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};


const getAnmntListStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const getAnmntListSuccess = (state, action) => {
    return updateObject(state, {
        announcements: action.announcements.reverse(),
        error: null,
        loading: false
    });
};

const getAnmntListFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};


const createAnmntStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const createAnmntSuccess = (state, action) => {
    const newAnmnt = [action.announcement,...state.announcements]
    return updateObject(state, {
        announcements:newAnmnt,
        error: null,
        loading: false
    });
};

const createAnmntFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const handleLogout = (state, action) => {
    return updateObject(state, {
        classes: []
    });
};

const createCLSStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const createCLSSuccess = (state, action) => {
    const newClasses = [...state.classes,action.Class]
    return updateObject(state, {
        classes: newClasses,
        error: null,
        loading: false
    });
};

const createCLSFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const joinCLSStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const joinCLSSuccess = (state, action) => {

    const newClasses = [...state.classes,action.classes]
    return updateObject(state, {
        error: null,
        classes: newClasses,
        loading: false
    });
};

const joinCLSFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const deleteCLSSuccess = (state, action) => {
    const index = state.classes.indexOf(state.classes.filter(cls=> cls.id===action.id)[0])
    state.classes.splice(index,1);
    return updateObject(state, {
        error: null,
        loading: false
    });
};


const classReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CLASSES_LIST_START:
            return getCLSListStart(state, action);
        case actionTypes.GET_CLASSES_LIST_SUCCESS:
            return getCLSListSuccess(state, action);
        case actionTypes.GET_CLASSES_LIST_FAIL:
            return getCLSListFail(state, action);
        case actionTypes.GET_ANNOUNCEMENT_LIST_START:
            return getAnmntListStart(state, action);
        case actionTypes.GET_ANNOUNCEMENT_LIST_SUCCESS:
            return getAnmntListSuccess(state, action);
        case actionTypes.GET_ANNOUNCEMENT_LIST_FAIL:
            return getAnmntListFail(state, action);
        case actionTypes.CREATE_ANNOUNCEMENT_START:
            return createAnmntStart(state, action);
        case actionTypes.CREATE_ANNOUNCEMENT_SUCCESS:
            return createAnmntSuccess(state, action);
        case actionTypes.CREATE_ANNOUNCEMENT_FAIL:
            return createAnmntFail(state, action);

        case actionTypes.JOIN_CLASS_START:
            return joinCLSStart(state, action);
        case actionTypes.JOIN_CLASS_SUCCESS:
            return joinCLSSuccess(state, action);
        case actionTypes.JOIN_CLASS_FAIL:
            return joinCLSFail(state, action);
        case actionTypes.CREATE_CLASS_START:
            return createCLSStart(state, action);
        case actionTypes.CREATE_CLASS_SUCCESS:
            return createCLSSuccess(state, action);
        case actionTypes.CREATE_CLASS_FAIL:
            return createCLSFail(state, action);
        case actionTypes.HANDLE_LOGOUT:
            return handleLogout(state, action);
        case actionTypes.DELETE_CLASS:
            return deleteCLSSuccess(state, action);


        default:
            return state;
    }
};

export default classReducer;