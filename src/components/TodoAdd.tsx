import {ChangeEvent, Component, FormEvent} from "react";
import {Navigate} from "react-router-dom";
import {add} from "../api/api";
import {UserInfo} from "@firebase/auth";


export type FormDataType = {
    email?:string | null
    password?:string
    title?: string
    desc?: string
    image?: string
    done?: boolean
    createdAt?: string
    key?: string
}

type TodoAddPropsType = {
    add: (deed: any) => void
    currentUser:UserInfo
}

export class TodoAdd extends Component <TodoAddPropsType> {
    formData: FormDataType = {
        title:'',
        email: '',
        password: ''
    }
    state = {redirect: false}

    constructor(props: TodoAddPropsType) {
        super(props);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.clearFormData();
        console.log(props.currentUser)
    }


    clearFormData() {
        this.formData = {
            title: "",
            desc: "",
            image: ""
        }
    }

    handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        this.formData.title = e.currentTarget.value
    }

    handleDescChange(e: ChangeEvent<HTMLTextAreaElement>) {
        this.formData.desc = e.currentTarget.value
    }

    handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        const cFile = e.target.files;
        if (cFile && cFile.length > 0) {
            const fileReader = new FileReader();
            const that = this;
            fileReader.onload = () => {
                that.formData.image = fileReader.result as string;
            }
            fileReader.readAsDataURL(cFile[0]);
        } else {
            this.formData.image = ""
        }
    }

    async handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        debugger
        e.preventDefault();
        let newDeed = {...this.formData};
        const date = new Date();
        newDeed.done = false;
        newDeed.createdAt = date.toLocaleDateString();
        const addedDeed = await add(this.props.currentUser, newDeed);
        debugger
        this.props.add(addedDeed);
        debugger
        this.setState((state) => ({redirect: true}))
    }

    render() {
        if (!this.props.currentUser){
            <Navigate to="/login" replace/>
        } else if(this.state.redirect) {
            return <Navigate to="/"/>}
            return (
                <section>
                    <h1>Создать новую задачу</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="field">
                            <label className="label">Заголовок</label>
                            <div className="conrtrol">
                                <input className="input" onChange={this.handleTitleChange}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Примечание</label>
                            <div className="control">
                                <textarea className="input" onChange={this.handleDescChange}></textarea>
                            </div>
                        </div>
                        <div className="field">
                            <div className="file">
                                <label className="file-label">
                                    <input type="file"
                                           accept="/imagr/*"
                                           className="file-input"
                                           onChange={this.handleImageChange}/>
                                    <span className="file-cta">
                                <span className="file-lable">
                                    Графическая иллюстрация...
                                </span>
                            </span>
                                </label>
                            </div>
                        </div>
                        <div className="field is-grouped is-grouped-right">
                            <div className="control">
                                <input type="reset" className="button is-link is-light" value="Сборс"/>
                            </div>
                            <div className="control">
                                <input type="submit" className="button is-primary" value="Создать дело"/>
                            </div>
                        </div>
                    </form>
                </section>
            )
    }
}



export type deedType = {
	createdAt: string;
	desc: string;
	done: boolean;
	image: string;
	title: string;
}