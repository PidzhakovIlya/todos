import React from "react";
import {Todolist} from "./Todolist";

const date1 = new Date(2024, 3, 14, 14, 5)
const date2 = new Date(2024, 3, 14, 15, 5)

export type InitialDataType = Array<TaskType>
export type InitialStateType = { data: Array<TaskType> }

type TaskType = {
    title: string
    desc: string
    image: string
    done: boolean
    createdAt: string
    key: number
}

const initialData: InitialDataType = [
    {
        title: "Learn React",
        desc: "Побыстрее",
        image: "",
        done: true,
        createdAt: date1.toLocaleDateString(),
        key: date1.getTime()
    },
    {
        title: "Изучить классы",
        desc: "Побыстрее",
        image: "",
        done: false,
        createdAt: date2.toLocaleDateString(),
        key: date2.getTime()
    }
]

class App extends React.Component<any, InitialStateType> {
    state: InitialStateType

    constructor(props: any) {
        super(props);
        this.state = {data: initialData}
        this.setDown = this.setDown.bind(this)
        this.delete = this.delete.bind(this)
    }

    delete(key: number) {
        const newData = this.state.data.filter(t => t.key !== key)
        this.setState({data: newData})
    }

    setDown(key: number) {
        const deed: TaskType = this.state.data.find((t: any) => t.key === key) as TaskType
        if (deed) deed.done = true;
        this.setState((state: InitialStateType) => ({}))
    }

    render() {
        return (
            <div>
                <nav className="navbar is-light ">
                    <div className="navbar-brand">
        <span className={"navbar-item is-uppercase"}>
            Todos
        </span>
                    </div>
                </nav>
                <main className="content px-6 mt-6">
                    <Todolist list={this.state.data}
                              setDown={this.setDown}
                              delete={this.delete}/>
                </main>
            </div>
        );
    }
}

export default App;
