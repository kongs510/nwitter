import Nweet from "components/Nweet";
import {dbService} from "fbase";
import React, {useEffect, useState} from "react";

const Home = ({userObj}) => {
    console.log(userObj);
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
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
        await dbService
            .collection("nweets")
            .add({text: nweet, createdAt: Date.now(), creatorId: userObj.uid});
        setNweet("");
    };
    const onChange = (event) => {
        const {target: {
                value
            }} = event;
        setNweet(value);
    }
    console.log(nweets);
    return (<div>
        <form onSubmit={onSubmit}>
            <input
                value={nweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind"
                maxLength={120}/>
            <input type="submit" value="click"/>
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