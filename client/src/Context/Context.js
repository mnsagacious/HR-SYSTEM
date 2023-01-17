import { createContext, useReducer } from "react";
import Reducer from "./Reducers";
import { useEffect } from "react";
import React from 'react';
import { Navigate } from "react-router-dom";

const user =  JSON.parse(localStorage.getItem("user")) 
const company = JSON.parse(localStorage.getItem("company"));
const companydata = JSON.parse(localStorage.getItem("companydata"))
const INITIAL_STATE = {
  user: user ? user :null,
  isFetching: false,
  error: false,
  company: company ? company :null,
  companydata: companydata ? companydata : null,
};
 console.log("Initial stage",INITIAL_STATE)
export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  
   useEffect(()=>{
     
       localStorage.setItem("user",JSON.stringify(state.user)); 
      if(state.user  &&  state.user.role && (state.user.role ==='HR' || state.user.role==="Employee")){
        localStorage.setItem("companydata",JSON.stringify(state.companydata));
      }
      
      if(state.user && state.user.role  ==='CEO'){
        localStorage.setItem("company",JSON.stringify(state.company));
      }
      // if(state.company){
      //   localStorage.setItem("company",JSON.stringify(state.company));
      // }
      // if(state.companydata){
      //   localStorage.setItem("companydata",JSON.stringify(state.companydata))
      // }
      
     
   },[state.user,state.company,state.companydata])

   
  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        company:state.company,
        companydata:state.companydata,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
