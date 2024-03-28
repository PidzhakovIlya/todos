import {getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {get, getDatabase, push, query, ref, remove, set} from "firebase/database"
import {UserInfo} from "@firebase/auth";

export async function login(email: string | null | undefined, password: string | undefined ) {
    try {
        debugger
        if (email && password) {
            const oUC = await signInWithEmailAndPassword(getAuth(), email, password);
            return oUC.user
        }

    } catch (err: any) {
        return err.code
    }
}

export const logout = async () => {
    await signOut(getAuth());
}

export const add = async (user: any, deed: any) => {
    const oRef = await push(
        ref(
            getDatabase(),
            `users/${user.uid}/todos`
        )
    )
    await set(oRef, deed);
    const oSnapshot = await get(query(oRef));
    const oDeed = oSnapshot.val();
    oDeed.key = oRef.key;
    return oDeed
}

export const getList = async (user:any)=>{ debugger
    const oSnapshot = await get(query(ref(getDatabase(), `users/${user.uid}/todos`)));
    const oArr:UserInfo[] = [];
    let oDeed;
    oSnapshot.forEach(oDoc=> {
        oDeed = oDoc.val();
        oDeed.key = oDoc.key
        oArr.push(oDeed)
    });

    return oArr;
}

export const setDone = (user:UserInfo, key:string)=>{
    return set(ref(getDatabase(), `users/${user.uid}/todos/${key}/done`), true)
}
export const del = (user:UserInfo, key:string)=>{
    return remove(ref(getDatabase(), `users/${user.uid}/todos/${key}/done`))
}