import React from "react";
import {InitialDataType} from "./App";
import {Link, Navigate} from "react-router-dom";
import {UserInfo} from "@firebase/auth";


type TodoPropsTyp = {
    list: InitialDataType
    setDown: (key: string) => void
    delete: (key: string) => void
    currentUser: UserInfo
}

export function Todolist(props: TodoPropsTyp) {
    if (!props.currentUser)
        return <Navigate to='/login' replace/>
    else
        return (
            <section>
                <h1>Задачи</h1>
                <table className={"table is-hoverable if-fullwidth"}>
                    <tbody>
                    {props.list.map(t => (
                        <tr key={t.key}>
                            <td>
                                <Link to={`/${t.key}`}>
                                    {t.done && <del>{t.title}</del>}
                                    {!t.done && t.title}
                                </Link>
                            </td>
                            <td>
                                <button className="button is-success"
                                        title="Поместить как сделанное"
                                        disabled={t.done}
                                        onClick={() => props.setDown(t.key || String(new Date().getTime()))}>&#9745;</button>
                            </td>
                            <td>
                                <button className="button is-danger" title="Удалить"
                                        onClick={() => props.delete(t.key || String(new Date().getTime()))}>&#9746;</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        );
}



