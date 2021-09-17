import * as actionTypes from "./actions";

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
  localStorage.removeItem("user");
  localStorage.removeItem("userdata");
  localStorage.removeItem("classConnections");
  // localStorage.removeItem("classes");
  // axios.defaults.headers['Authorization'] = null;
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

    axios.post('http://localhost:8000/rest-auth/login/', {
        email: email,
        password: password,
      }).then((res) => {
        const userData = {
          first_name: res.data.user_data.first_name,
          last_name: res.data.user_data.last_name,
          mobile: res.data.user_data.mobile,
          profile_img: res.data.user_data.profile_img,
          token: res.data.key,
          email,
          userId: res.data.user,
          is_student: res.data.user_data.is_student,
          is_teacher: res.data.user_data.is_teacher,
          expirationDate: new Date(new Date().getTime() + 36000 * 1000)
        };
        const user = {
          expirationDate: new Date(new Date().getTime() + 36000 * 1000)
        }

        localStorage.setItem("user", JSON.stringify(userData));

        dispatch(authSuccess(userData));
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

export const updateUserData = (userData, userId, token) => {
  return dispatch => {
    axios.defaults.headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };

    axios.patch(`http://localhost:8000/list/user/${userId}/`, userData)
      .then((res) => {
        console.log(res.data)
        const userData = {
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          mobile: res.data.mobile,
          profile_img: res.data.profile_img,

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
    axios.post('http://localhost:8000/register/', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        mobile: mobile,
        password: password,
        is_student: isStudent,
        is_teacher: !isStudent,
      }).then((res) => {
        console.log(res.data)

        const userData = {
          profile_img: res.data.profile_img,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          mobile: res.data.mobile,
          email: res.data.email,
          expirationDate: new Date(new Date().getTime() + 36000 * 1000),
          is_student: isStudent,
          is_teacher: !isStudent,
          token: res.data.token,
          userId: res.data.id
        };
        const user = {
          expirationDate: new Date(new Date().getTime() + 36000 * 1000)
        }
        localStorage.setItem('user', JSON.stringify(userData))
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
    const user = JSON.parse(localStorage.getItem("user"))
    if (user === undefined || user === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};