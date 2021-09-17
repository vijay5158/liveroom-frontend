import axios from "axios";
import * as actionTypes from "./actions";

const getCLSListStart = () => {
    return {
        type: actionTypes.GET_CLASSES_LIST_START
    };
};

const getCLSListSuccess = classes => {
    return {
        type: actionTypes.GET_CLASSES_LIST_SUCCESS,
        classes
    };
};

const getCLSListFail = error => {
    return {
        type: actionTypes.GET_CLASSES_LIST_FAIL,
        error: error
    };
};
export const handleLogout = () => {
    return {
        type: actionTypes.HANDLE_LOGOUT
    };
}
export const getCLS = token => {
    return dispatch => {
        dispatch(getCLSListStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios
            .get("http://localhost:8000/class/classes/")
            .then(res => {
                const classes = res.data;
                localStorage.setItem('classes', JSON.stringify(classes));
                dispatch(getCLSListSuccess(classes));
            })
            .catch(err => {
                dispatch(getCLSListFail(err));
                alert(err);
            });
    };
};


const getAnmntListStart = () => {
    return {
        type: actionTypes.GET_ANNOUNCEMENT_LIST_START
    };
};

const getAnmntListSuccess = announcements => {
    return {
        type: actionTypes.GET_ANNOUNCEMENT_LIST_SUCCESS,
        announcements
    };
};

const getAnmntListFail = error => {
    return {
        type: actionTypes.GET_ANNOUNCEMENT_LIST_FAIL,
        error: error
    };
};

export const getAnmnt = (token,slug) => {
    return dispatch => {
        dispatch(getAnmntListStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios
            .get(`http://localhost:8000/class/announcement/${slug}`)
            .then(res => {
                const announcements = res.data;
                localStorage.setItem('announcements', JSON.stringify(announcements));
                dispatch(getAnmntListSuccess(announcements));
            })
            .catch(err => {
                dispatch(getAnmntListFail(err));
                alert(err);
            });
    };
};





const createAnmntStart = () => {
    return {
        type: actionTypes.CREATE_ANNOUNCEMENT_START
    };
};

const createAnmntSuccess = announcement => {
    return {
        type: actionTypes.CREATE_ANNOUNCEMENT_SUCCESS,
        announcement
    };
};

const createAnmntFail = error => {
    return {
        type: actionTypes.CREATE_ANNOUNCEMENT_FAIL,
        error: error
    };
};


export const createAnmnt = (token, Anmnt) => {
    return dispatch => {
        dispatch(createAnmntStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios.post(`http://localhost:8000/class/announcement/`, Anmnt)
            .then(res => {
                console.log(res.data)

                const announcement = res.data
                dispatch(createAnmntSuccess(announcement));
            })
            .catch(err => {
                dispatch(createAnmntFail(err));
            });
    };
};


const createCLSStart = () => {
    return {
        type: actionTypes.CREATE_CLASS_START
    };
};
const createCLSSuccess = Class => {
    return {
        type: actionTypes.CREATE_CLASS_SUCCESS,
        Class
    };
};

const createCLSFail = error => {
    return {
        type: actionTypes.CREATE_CLASS_FAIL,
        error: error
    };
};

export const createCLS = (token, cls) => {
    return dispatch => {
        dispatch(createCLSStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios.post(`http://localhost:8000/class/classes/`, cls)
            .then(res => {
                console.log(res.data)
                
                dispatch(createCLSSuccess(res.data));
            })
            .catch(err => {
                dispatch(createCLSFail(err));
            });
    };
};



const joinCLSStart = () => {
    return {
        type: actionTypes.JOIN_CLASS_START
    };
};

const joinCLSSuccess = classes => {
    return {
        type: actionTypes.JOIN_CLASS_SUCCESS,
        classes
    };
};

const joinCLSFail = error => {
    return {
        type: actionTypes.JOIN_CLASS_FAIL,
        error: error
    };
};

export const joinCLS = (token, data) => {
    const slug = data['slug'];
    const student = {"students" : [data['student_id']]}
    return dispatch => {
        dispatch(joinCLSStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios.patch(`http://localhost:8000/class/classes/${slug}/`,student)
            .then(res => {
                // const Class = [res.data]
                console.log(res.data);
                dispatch(joinCLSSuccess(res.data));
            })
            .catch(err => {
                dispatch(joinCLSFail(err));
                alert(err);
            });
    };
};

const deleteCLSSuccess = id =>{
    return {
        type: actionTypes.DELETE_CLASS,
        id
    };
}

export const deleteCLS = (token, data) => {
    const slug = data['slug'];
    const id = data['id']
    return dispatch => {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios.delete(`http://localhost:8000/class/classes/${slug}/`)
            .then(res => {
                console.log(res.data);
                dispatch(deleteCLSSuccess(id))
                alert("Class deleted");
            })
            .catch(err => {

                alert(err);
            });
    };
};

