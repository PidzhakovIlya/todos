import React from 'react';
import {useParams} from "react-router-dom";
import {TaskType} from "../App";

type PropsType = {
    getDeed: (key: string) => TaskType | null | undefined
}

export const TodoDetail = (props: PropsType) => {
    console.log(typeof useParams<{key: string}>())
    const {key} = useParams<{key: string}>();
    const deed = props.getDeed(String(key));

    if (!deed) {
        return (
            <div className="notification is-danger">
                <p>Deed with key={key} not found</p>
            </div>
        );
    }

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
