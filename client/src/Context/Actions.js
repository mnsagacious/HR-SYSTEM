export const LoginStart = (userCredentials) =>({
    type:"LOGIN_START"
});

export const LoginSuccess = (user) =>({
    type:"LOGIN_SUCCESS"
})

export const LoginFailure = () =>({
    type:"Login_Failure"
})

export const Logout = () =>({
    type:"LOGOUT"
})
export const UpdateStart = (userCredentials) =>{
     type:"UPDATE_START"
}
export const UpdateSuccess = (user) =>{
    type:"UPDATE_SUCCESS"
} 

export const UpdateFailure = () =>{
    type:"UPDATE_FAILURE"
}
export const CompanySwitch = (company) =>{
    type:"COMPANY_SWITCH"
}
export const CompanyRemove = (company) =>{
    type:"COMPANY_REMOVE"
}
export const CompanyData = (company) =>{
  type:"COMPANY_DATA"
}