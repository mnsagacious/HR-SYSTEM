const Reducer  = (state,action) =>{
  
    switch(action.type){

        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
              };
         case "LOGIN_SUCCESS":
           return{
            user:action.payload,
            isFetching:false,
            error:false
           };
         case "LOGIN_FAILURE":
            return{
                user:null,
                isFetching:false,
                error:true
            };
         
            case"UPDATE_START":
              return{
                ...state,
                isFetching:true,
                error:false
              } ;
             case "UPDATE_SUCCESS":
              return{
                user:action.payload,
                isFetching:false,
                error:false
              }
             case"UPDATE_FAILURE":
               return{ 
                user :state.user,
                isFetching:false,
                error:true
             };
             case "LOGOUT":
              return{
                user:null,
                company:null,
                companydata:null,
                isFetching:false,
                error:false
              };
              case"COMPANY_SWITCH":
              return{
                ...state,
                company:action.payload,
                error:false
              };
              case"COMPANY_REMOVE":
              return{
                
                company:null
              }
             case"COMPANY_DATA":
             return{
              ...state,
              companydata:action.payload,
              error:false
             } 
          default:
          return state
        
        
    }
    
}

export default Reducer