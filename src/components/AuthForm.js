import { authService } from "fbase";
import React, { useState } from "react";

const AuthForm = () =>{
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
    return(
        <>
            <form onSubmit={onSubmit} className="container">
                <input type="email" name="email" placeholder="Email" required="required" value={email} className="authInput" onChange={onChange} />
                <input type="password" name="password" placeholder="password" required="required" value={password} className="authInput" onChange={onChange}/>
                <input type="submit" className="authInput authSubmit" value={newAccount ? "create Account":"Sign In"}/>
                        {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">{newAccount ? "Sign In":"create Account"}</span>
        </>

    )
}

export default AuthForm;