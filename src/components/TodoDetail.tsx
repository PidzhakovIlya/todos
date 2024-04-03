import React from 'react';
import {Navigate, useParams} from "react-router-dom";
import {TaskType} from "../App";
import {UserInfo} from "@firebase/auth";

type PropsType = {
    getDeed: (key: string) => TaskType | null | undefined
    currentUser: UserInfo
}

export const TodoDetail = (props: PropsType) => {
    console.log(typeof useParams<{ key: string }>())
    const {key} = useParams<{ key: string }>();
    const deed = props.getDeed(String(key));

    if (!deed) {
        return (
            <div className="notification is-danger">
                <p>Deed with key={key} not found</p>
            </div>
        );
    }
    if (!props.currentUser)
        return <Navigate to='/login' replace/>
    else
        return (
            <section>
                {deed.done &&
                    <p className='has-text-success'>
                        Выполнено
                    </p>
                }
                <h1>{deed.title}</h1>
                <p>{deed.createdAt}</p>
                {deed.desc && <p>{deed.desc}</p>}
                {deed.image && <p><img src={deed.image} alt="Иллюстрация"/></p>}
            </section>
        );
};
