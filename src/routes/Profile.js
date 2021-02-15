import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";


const Profile = () => {
        //const history =useHistory(); //로그아웃 리다이렉트
        const onLogOutClick = () => {
            authService.signOut();
            //history.push("/");// 주석처리 위에 실행
        }
    return(
        <>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    )
}
export default Profile;