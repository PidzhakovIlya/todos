import React from "react";
import {Todolist} from "./Todolist";
import {TodoAdd} from "./components/TodoAdd";
import {HashRouter, NavLink, Route, Routes} from "react-router-dom";

const date1 = new Date(2024, 3, 14, 14, 5)
const date2 = new Date(2024, 3, 14, 15, 5)

export type InitialDataType = Array<TaskType>
export type InitialStateType = { data: Array<TaskType> }

export type TaskType = {
    title?: string
    desc?: string
    image?: string
    done?: boolean
    createdAt?: string
    key?: number
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
        this.add = this.add.bind(this)
    }

    add(deed: TaskType) {
        this.state.data.push(deed)
        this.setState(() => ({}))
    };

    delete(key: number) {
        const newData = this.state.data.filter(t => t.key !== key)
        this.setState({data: newData})
    };

    setDown(key: number) {
        const deed: TaskType = this.state.data.find((t: any) => t.key === key) as TaskType
        if (deed) deed.done = true;
        this.setState((state: InitialStateType) => ({}))
    };

    render() {
        return (

            <HashRouter>
                <nav className="navbar is-light ">
                    <div className="navbar-brand">
                        <NavLink to='/'
                                 className={({isActive}) =>
                                     'navbar-item is-uppercase' + (isActive ? ' is-active' : '')}>
                            Todos
                        </NavLink>
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-start">
                            <NavLink to='/add' className={({isActive})=>'navbar-item' + (isActive?
                             ' is-active':'')}>
                                Новая задача
                            </NavLink>
                        </div>
                    </div>
                </nav>
                <main className="content px-6 mt-6">
                    {/*<Todolist list={this.state.data}*/}
                    {/*          setDown={this.setDown}*/}
                    {/*          delete={this.delete}/>*/}
                    {/*<TodoAdd add={this.add}/>*/}
                    <Routes>
                        <Route path='/' element={<Todolist list={this.state.data}
                                                           setDown={this.setDown}
                                                           delete={this.delete}/>}/>
                        <Route path='/add' element={<TodoAdd add={this.add}/>}/>
                    </Routes>
                </main>
            </HashRouter>
        );
    }
}

export default App;
