import {ChangeEvent, Component, FormEvent} from "react";
import {TaskType} from "../App";
import {Navigate} from "react-router-dom";


type TodoAddPropsType = {
    add: (deed: TaskType) => void
}

export class TodoAdd extends Component <any> {
    formData: TaskType = {}
    state = {redirect:false}
    constructor(props: TodoAddPropsType) {
        super(props);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.clearFormData();
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

    handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newDeed = {...this.formData};
        const date = new Date();
        newDeed.done = false;
        newDeed.createdAt = date.toLocaleDateString();
        newDeed.key = date.getTime();
        this.props.add(newDeed);
        // this.clearFormData();
        // e.currentTarget.reset();
        this.setState((state)=>({redirect:true}))
    }
    render() {
        if(this.state.redirect){
            return <Navigate to='/'/>
        }else
        return (
            <section>
                <h1>Создфть новую задачу</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="field">
                        <label className="lable">Заголовок</label>
                        <div className="conrtrol">
                            <input className="input" onChange={this.handleTitleChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="lable">Примечание</label>
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