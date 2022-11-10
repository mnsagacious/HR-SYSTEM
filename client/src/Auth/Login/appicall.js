import axios from "axios";
const url ='/auth/login'

export  const loginCall = async(userCredientials,dispatch) =>{
    dispatch({type:"LOGIN_START"});
    
    try{
         const response = await axios.post(url,userCredientials)
         dispatch({type:"LOGIN_SUCCESS",payload:response.data})
         return response
    }catch(error){

     dispatch({type:"LOGIN_FAILURE",payload:error})
    }
}
