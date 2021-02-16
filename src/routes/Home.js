import React, {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {dbService,storageService} from "fbase";
import Nweet from "components/Nweet";

const Home = ({userObj}) => {
    //console.log(userObj);
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment,setAttachment] = useState("");
    const getNeweets = async () => {
        const dbNweets = await dbService
            .collection("nweets")
            .get();
        dbNweets.forEach((document) => {
            const nweetobject = {
                ...document.data(),
                id: document.id
            }
            setNweets((prev) => [
                nweetobject, ...prev
            ]);
        });
    };
    useEffect(() => {
        dbService
            .collection("nweets")
            .orderBy("createdAt", "desc")
            .onSnapshot((Snapshot) => {
                const nweetArray = Snapshot
                    .docs
                    .map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                setNweets(nweetArray);
            });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl =""; 
        if (attachment !== ""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment,"data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
            const nweetObj = {
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
                attachmentUrl,
        }
        await dbService
            .collection("nweets")
            .add(nweetObj);
        setNweet("");
        setAttachment("");
    };
    const onChange = (event) => {
        const {target: {
                value
            }} = event;
        setNweet(value);
    }
    const onFileChange = (event) =>{
        const {target:{files},
        } = event;
        const theFile = files[0];
        const reader =new FileReader();
        reader.onloadend = (finishedEvent) =>{
            console.log(finishedEvent);
            const{
            currentTarget:{
                result
            },
            } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
        //console.log(event.target.files)
        //console.log(theFile)
    };
    const onClearAttachment = () => setAttachment("");
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind" maxLength={120}/>
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="click"/>
                {attachment && (
                    <div>
                        <img src ={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>clear</button>
                    </div>
                )}
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />  
                ))} 
            </div>
        </div >
        );
};
export default Home;