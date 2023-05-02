import { useSelector } from "react-redux";
import * as actionTypes from "../actions/actions";
import Cookies from "universal-cookie";

const cookies=new Cookies();
const token= cookies.get('token')

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

const initialState = {
  firstName:null,
  lastName:null,
  profileImg:null,
  mobile:null,
  token: token,
  refresh_token:null,
  email: null,
  name: null,
  is_student: null,
  is_teacher: null,
  userId: null,
  error: null,
  loading: false
};

const updateUserData = (state, action) =>{
  console.log(action.userData,'ffgg');
  return updateObject(state,action.userData)
}


const authSuccess = (state, action) => {
  return updateObject(state, {
    firstName: action.userData.first_name,
    lastName: action.userData.last_name,
    profileImg: action.userData.profile_img,
    mobile: action.userData.mobile,
    token: action.userData.token,
    refresh_token: action.userData.refresh_token,
    email: action.userData.email,
    is_student: action.userData.is_student,
    is_teacher: action.userData.is_teacher,
    userId: action.userData.userId,
    error: null,
    loading: false
  });
};
const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null
  });
};

export const useAuth = () => useSelector(root => root?.authReducer);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.UPDATE_USER_DATA:
      return updateUserData(state,action)
    default:
      return state;
  }
};

export default reducer;