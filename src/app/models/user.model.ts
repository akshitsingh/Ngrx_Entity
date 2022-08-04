
export interface User{
   id? : number,
   profile : Profile,
   gender : string,
   address : string,
   dob : string,
   grade : string,
   roles : Role[]
} 

interface Role{
   role : string
}

interface Profile{
    name : string,
    email : string,
    password : string,
    confirmPassword? : string,
}