import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

export type RegisterPropsType = {
    email:string
    password:string
}

export async function register( email:string| null , password?:string) {
    try {
    if(email && password){
    const oUC = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
    )
    return oUC.user;
}

    }
    catch (err:any){
        return err.code
    }
}