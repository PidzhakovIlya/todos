import React from 'react';
import {logout} from "../api/api";
import {Navigate} from "react-router-dom";
import {InitialStateType} from "../App";


type LogoutPropsType = Omit<InitialStateType, 'data' | 'showMenu'>

export const Logout = (props: LogoutPropsType) => {
   if(props.currentUser){
       logout()
       return null
   }else{
       return <Navigate to='/login' replace/>

   }
};
