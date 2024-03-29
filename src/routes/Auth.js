import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub, } from "@fortawesome/free-brands-svg-icons";
import AuthForm from "../components/AuthForm";

const Auth = () => {
    const onSocialClick = async (event) => {
        const { target: { name }
        } = event;
        let prvider;
        if (name === "google") {
            prvider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            prvider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(prvider);
        console.log(data);
    }
    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button onClick={onSocialClick} name="github">
                    Continue with  <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    )
}
export default Auth;