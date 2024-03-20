import React, {MouseEvent} from "react";
import {Todolist} from "./Todolist";
import {TodoAdd} from "./components/TodoAdd";
import {HashRouter, NavLink, Route, Routes} from "react-router-dom";
import {TodoDetail} from "./components/TodoDetail";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import firebaseApp from "./firebase";
import {FormDataType, Register} from "./components/Register/Register";


const date1 = new Date(2024, 3, 14, 14, 5)
const date2 = new Date(2024, 3, 14, 15, 5)

export type InitialDataType = Array<TaskType>
export type InitialStateType = {
    data: Array<TaskType>,
    showMenu: boolean
    currentUser: undefined | FormDataType | null
}

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
        desc: "Хорошо",
        image: "",
        done: false,
        createdAt: date2.toLocaleDateString(),
        key: date2.getTime()
    }
]

export interface Root {
    uid: string
    email: string
    emailVerified: boolean
    isAnonymous: boolean
    providerData: ProviderDaum[]
    stsTokenManager: StsTokenManager
    createdAt: string
    lastLoginAt: string
    apiKey: string
    appName: string
}

export interface ProviderDaum {
    providerId: string
    uid: string
    displayName: any
    email: string
    phoneNumber: any
    photoURL: any
}

export interface StsTokenManager {
    refreshToken: string
    accessToken: string
    expirationTime: number
}


class App extends React.Component<any, InitialStateType> {
    // state: InitialStateType

    constructor(props: any) {
        super(props);
        this.state = {data: initialData, showMenu: false, currentUser: undefined}
        this.setDown = this.setDown.bind(this)
        this.delete = this.delete.bind(this)
        this.add = this.add.bind(this)
        this.showMenu = this.showMenu.bind(this)
        this.getDeed = this.getDeed.bind(this)
        this.authStateChanged = this.authStateChanged.bind(this)
    }

    authStateChanged(user:FormDataType | null ) {
        this.setState((state) => ({currentUser: user}))
    }

    getDeed(key: number) {
        key = +key;
        return this.state.data.find(d => d.key === key)
    }

    showMenu(e: MouseEvent<HTMLAnchorElement | HTMLDivElement>) {
        e.preventDefault();
        this.setState((state) => ({showMenu: !state.showMenu}))
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

    componentDidMount() {
         // firebase.auth().onAuthStateChanged((user)=> {
         //     debugger
         //             if (user) {
         //                 this.authStateChanged(user)
         //             }
         //
         //         } )
        onAuthStateChanged(getAuth(firebaseApp), this.authStateChanged)
    }

    render() {
        return (

            <HashRouter>
                <nav className="navbar is-light ">
                    <div className="navbar-brand">
                        <NavLink to='/'
                                 className={({isActive}) =>
                                     'navbar-item is-uppercase' + (isActive ? ' is-active' : '')}>
                            {this.state.currentUser ? this.state.currentUser.email : 'Todos'}
                        </NavLink>
                        <a href='/'
                           className={this.state.showMenu ? 'navbar-burger is-active' : 'navbar-burger'}
                           onClick={this.showMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>
                    </div>
                    <div className={this.state.showMenu ? "navbar-menu is-active" : 'navbar-menu'}
                         onClick={this.showMenu}>
                        <div className="navbar-start">
                            {this.state.currentUser &&
                                <NavLink to='/add' className={({isActive}) => 'navbar-item' + (isActive ?
                                    ' is-active' : '')}>
                                    Новая задача
                                </NavLink>}
                            {!this.state.currentUser && <NavLink to='/register' className={({isActive}) =>
                                'navbar-item' + isActive ? ' isActive' : ''}>
                                Зарегистрироваться
                            </NavLink>}
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
                        <Route path='/:key' element={<TodoDetail getDeed={this.getDeed}/>}/>
                        <Route path='/register' element={<Register currentUser={this.state.currentUser}/>}/>
                    </Routes>
                </main>
            </HashRouter>
        );
    }
}

export default App;
