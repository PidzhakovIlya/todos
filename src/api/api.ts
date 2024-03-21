import {getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"

export async function login(email: string, password: string) {
    try {
        const oUC = await signInWithEmailAndPassword(getAuth(), email, password);
        return oUC.user
    } catch (err: any) {
        return err.code
    }
}

export const logout = async () => {
    await signOut(getAuth());
}