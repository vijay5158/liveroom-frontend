import * as actionTypes from "./actions";
import Cookies from "universal-cookie";

const cookies=new Cookies();

import axios from "axios";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = userData => {

  return {
    type: actionTypes.AUTH_SUCCESS,
    userData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};



export const logout = () => {

  localStorage.removeItem("classConnections");
  cookies.remove('token');
  axios.defaults.headers['Authorization'] = null;
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (email, password) => {
  return dispatch => {
    dispatch(authStart());

    axios.post('http://localhost:8000/api/login/', {
        email: email,
        password: password,
      }).then((res) => {
        const data = res.data?.user;
        const tokens = res.data?.tokens;
        const user = {
          profile_img: data?.profile_img,
          first_name: data?.first_name,
          last_name: data?.last_name,
          mobile: data?.mobile,
          email: data?.email,
          expirationDate: new Date(new Date().getTime() + 36000 * 1000),
          is_student: data?.is_student,
          is_teacher: data?.is_teacher,
          token: tokens?.access,
          refresh_token: tokens?.refresh,
          userId: data?.id
        };

        // localStorage.setItem("user", JSON.stringify(userData));

        cookies.set('token', tokens?.access);
        cookies.set('refresh_token', tokens?.refresh);
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(36000));


      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const updateUserDataSuccess = userData => {
  return {
    type: actionTypes.UPDATE_USER_DATA,
    userData
  };
}


export const getUserData = (token) => {
  return dispatch => {
    axios.defaults.headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };

    axios.get(`http://localhost:8000/api/list/user/`)
      .then((res) => {
        const data = res.data;
        const userData = {
          profileImg: data?.profile_img,
          firstName: data?.first_name,
          lastName: data?.last_name,
          mobile: data?.mobile,
          email: data?.email,
          expirationDate: new Date(new Date().getTime() + 36000 * 1000),
          is_student: data?.is_student,
          is_teacher: data?.is_teacher,
          userId: data?.id,
          error: null,
          loading: false,
        };
        dispatch(updateUserDataSuccess(userData));

        dispatch(checkAuthTimeout(36000));


      })
      .catch((error) => {
        alert(error);
        dispatch(logout());
      })
  }
}


export const updateUserData = (userData, userId, token) => {
  return dispatch => {
    axios.defaults.headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };

    axios.patch(`http://localhost:8000/api/list/user/${userId}/`, userData)
      .then((res) => {
        const userData = {
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          mobile: res.data.mobile,
          profileImg: res.data.profile_img,
          error: null,
          loading: false,
          email: res.data.email,
        };
       
        dispatch(updateUserDataSuccess(userData));



      })
      .catch((error) => {
        alert(error);
      })
  }
}

export const authSignup = (firstName, lastName, email, mobile, password, isStudent) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('http://localhost:8000/api/register/', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        mobile: mobile,
        password: password,
        is_student: isStudent,
        is_teacher: !isStudent,
      }).then((res) => {
        const data = res.data?.user;
        const tokens = res.data?.tokens;
        const userData = {
          profile_img: data?.profile_img,
          first_name: data?.first_name,
          last_name: data?.last_name,
          mobile: data?.mobile,
          email: data?.email,
          expirationDate: new Date(new Date().getTime() + 36000 * 1000),
          is_student: data?.is_student,
          is_teacher: data?.is_teacher,
          token: tokens?.access,
          refresh_token: tokens?.refresh,
          userId: data?.id
          };
        cookies.set('token', tokens?.access);
        cookies.set('refresh_token', tokens?.refresh);
        dispatch(authSuccess(userData));
        dispatch(checkAuthTimeout(36000));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = cookies.get('token');
    if (!token) {
      dispatch(logout());
    } else {
      dispatch(getUserData(token));
      // const expirationDate = new Date(user.expirationDate);
      // if (expirationDate <= new Date()) {
      //   dispatch(logout());
      // } else {
      //   dispatch(authSuccess(user));
      //   dispatch(
      //     checkAuthTimeout(
      //       (expirationDate.getTime() - new Date().getTime()) / 1000
      //     )
      //   );
      // }
    }
  };
};
