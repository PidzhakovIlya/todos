import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

export type RegisterPropsType = {
    email:string
    password:string
}

const auth = getAuth()

export async function register( email:string| null | undefined, password?:string) {
    try {
    if(email && password){
    const oUC = await createUserWithEmailAndPassword(
        auth,
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