import React, {useState} from "react";
import {authService, firebaseInstance} from "fbase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error,setError] = useState("");
    const onChange = (event) => {
        const {
            target: {
                name,
                value
            }
        } = event;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                //create account
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                //Log in
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data)
        } catch (error) {
            setError(error.message)
        }
    };
    const toggleAccount = () =>setNewAccount((prev)=>!prev)

    const onSocialClick = async (event) =>{
        const {target:{name}
        } = event;
        let prvider;  
        if(name ==="google"){
            prvider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name ==="github"){
            prvider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(prvider);
        console.log(data);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required="required"
                    value={email}
                    onChange={onChange}/>

                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    required="required"
                    value={password}
                    onChange={onChange}/>

                <input
                    type="submit"
                    value={newAccount ? "create Account":"Sign In"}/>
                        {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In":"create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with GitHub</button>
            </div>
        </div>
    )
}
export default Auth;