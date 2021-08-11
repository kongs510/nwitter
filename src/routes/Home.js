import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fbase";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async () => {
        const dbNweets = await dbService.collection("nweets").get();
        dbNweets.forEach((document) => {
            console.log(document.data())
            const nweetObject = {
                ...document.data(),
                id: document.id,
            };
            setNweets((prev) => [nweetObject, ...prev]);
        });
    };
    useEffect(() => {
        getNweets();
    }, []);


    const onSubmit = async (event) => {
        if (nweets !== "") {
            event.preventDefault();
            await dbService.collection("nweets").add({
                nweet,
                createdAt: Date.now(),
            });
            setNweet("");
            console.log("db저장됨");
        };
    }

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNweet(value);
        console.log(value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Home;