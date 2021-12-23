import React from "react"
import { useNavigate } from "react-router-dom";
import UserReference from "../types/UserReference"

const SignOn: React.FC = () => {
    let navigate = useNavigate();
    const TryLogin = (ev: { preventDefault: () => void; }) => {
        ev.preventDefault()
        const form: HTMLFormElement | null = document.forms.namedItem('login-form')
        if (form) {
            let form_data: FormData = new FormData(form);
            const username: string = form_data.get('login-username') as string
            const password: string = form_data.get('login-password') as string
            if (UserReference.userExists(username)) {
                let isSignedIn: boolean = UserReference.signedInUser(username, password)
                if (isSignedIn) {
                    navigate('/dashboard')
                    return
                }
            }
            const input_username: HTMLInputElement | null = document.querySelector('[name="login-username"]')
            if (input_username) input_username.value = '';
            const input_password: HTMLInputElement | null = document.querySelector('[name="login-password"]')
            if (input_password) input_password.value = '';
        }
        alert(`'Sorry, we weren't able to sign you in sadly -please check your user and password entered!`)
        navigate('/')
    }
    const TrySubmit = (ev: { preventDefault: () => void; }) => {
        ev.preventDefault()
        const form: HTMLFormElement | null = document.forms.namedItem('sign-up-form')
        if (form) {
            let form_data: FormData = new FormData(form);
            const name: string = form_data.get('sign-up-name') as string
            const username: string = form_data.get('sign-up-username') as string
            const password: string = form_data.get('sign-up-password') as string
            if (!UserReference.userExists(username)) {
                UserReference.createUser(name, username, password)
                UserReference.setCurrentUserByUsername(username)
                alert(`We successfully created your account!`)
            } else {
                alert(`Sorry, we weren't able to create your account sadly -it already exists.`)
            }
            const input_name: HTMLInputElement | null = document.querySelector('[name="sign-up-name"]')
            if (input_name) input_name.value = '';
            const input_username: HTMLInputElement | null = document.querySelector('[name="sign-up-username"]')
            if (input_username) input_username.value = '';
            const input_password: HTMLInputElement | null = document.querySelector('[name="sign-up-password"]')
            if (input_password) input_password.value = '';
        }
        navigate('/')
    }
    return (
        <div className="columns is-centered is-boxed mt-4">
            <form name="login-form" className="column ml-4 mb-4" onSubmit={TryLogin}>
                <div className="box">
                    <label className="label is-large">Log In</label>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input name="login-username" required className="input" type="text" placeholder="Enter your username"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input name="login-password" required className="input" type="password" placeholder="Enter your Password"/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-link is-light" type="submit">Login &hearts;</button>
                        </div>
                    </div>
                </div>
            </form>
            <form name="sign-up-form" className="column mr-4 mb-4" onSubmit={TrySubmit}>
                <div className="box">
                    <label className="label is-large">Sign Up</label>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input name="sign-up-name" required className="input" type="text" placeholder="Enter your name" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input name="sign-up-username" required className="input" type="text" placeholder="Enter your username" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input name="sign-up-password" required className="input" type="password" placeholder="Enter your Password" />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-link is-light" type="submit">Submit &hearts;</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignOn;