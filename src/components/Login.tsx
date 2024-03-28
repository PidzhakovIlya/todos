import React, {ChangeEvent, FormEvent} from 'react';
import {Navigate} from "react-router-dom";
import {getList, login} from "../api/api";
import {FormDataType} from "./TodoAdd";


type RegisterPropsType = {}

export class Login extends React.Component<any> {
    formData: FormDataType = {
        email: '',
        password: ''
    }

    constructor(props: any) {
        super(props);
        debugger
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.clearFormData();
    }

    clearFormData() {
        this.formData = {
            email: '',
            password: ''
        }
    }

    handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
        this.formData.email = e.target.value
    }

    handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
        this.formData.password = e.target.value
    }

    async handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const result = await login(this.formData.email, this.formData.password);
        if (typeof result === 'object') console.log(result)
    }

    render() {
        if (this.props.currentUser)
            return <Navigate to='/' replace/>
        else
            return (
                <section>
                    <h1>Вход</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="field">
                            <label className="label">Адрес электронной почты</label>
                            <div className="control">
                                <input type="email" className='input'
                                       onChange={this.handleEmailChange}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Пароль</label>
                            <div className="control">
                                <input type="password" className='input'
                                       onChange={this.handlePasswordChange}/>
                            </div>
                        </div>
                        <div className="field is-grouped is-grouped-right">
                            <div className="control">
                                <input type="reset" className="button is-link is-light"
                                       value='сброс'/>
                            </div>
                            <div className="control">
                                <input type="submit" className="button is-link is-light"
                                       value='Войти'/>
                            </div>
                        </div>
                    </form>
                </section>
            );
    }
}
