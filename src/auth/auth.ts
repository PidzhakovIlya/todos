import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

type RegisterPropsType = {
    email:string
    password:string
}

export async function register( email:string, password:string) {
    try {
        const oUC = await createUserWithEmailAndPassword(
            getAuth(),
            email,
            password
        )
        return oUC.user;
    }
    catch (err:any){
        return err.code
    }
}