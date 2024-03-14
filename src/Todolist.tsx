import React from "react";
import {InitialDataType} from "./App";


type TodoPropsTyp = {
    list: InitialDataType
    setDown: (key: number) => void
    delete: (key: number) => void
}

export function Todolist(props: TodoPropsTyp) {
    return (
        <section>
            <h1>Задачи</h1>
            <table className={"table is-hoverable if-fullwidth"}>
                <tbody>
                {props.list.map(t => (
                    <tr key={t.key}>
                        <td>
                            {t.done && <del>{t.title}</del>}
                            {!t.done && t.title}
                        </td>
                        <td>
                            <button className="button is-success"
                                    title="Поместить как сделанное"
                                    disabled={t.done}
                                    onClick={() => props.setDown(t.key)}>&#9745;</button>
                        </td>
                        <td>
                            <button className="button is-danger" title="Удалить"
                                    onClick={() => props.delete(t.key)}>&#9746;</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
}



