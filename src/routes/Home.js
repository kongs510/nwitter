import {dbService} from "fbase";
import React, {useEffect, useState} from "react";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNeweets = async () => {
        const dbNweets = await dbService.collection("nweets").get();
        dbNweets.forEach((document) => {
            const nweetobject = {
                ...document.data(),
                id: document.id,
            }
                setNweets((prev) => [
                    nweetobject, ...prev
            ]);
        });
    };
    useEffect(() => {
        getNeweets();
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({nweet, createdAt: Date.now()
        });
        setNweet("");
    };
    const onChange = (event) => {
        const {target: {value}
        } = event;
        setNweet(value);
    }
    console.log(nweets);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind"
                    maxLength={120}/>
                <input type="submit" value="click"/>
            </form>
            {nweets.map(nweet => 
            <div key={nweet.id}>
                <h4>{nweet.nweet}</h4>
            </div>
            )}
        </div>
    )
}
export default Home;