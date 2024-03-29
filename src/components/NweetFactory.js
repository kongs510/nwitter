import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
    // nweets make component
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (event) => {
        console.log(userObj);
        if (nweet === "") {
            return;
        }
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = storageService
                .ref()
                .child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response
                .ref
                .getDownloadURL();
        }
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        }
        await dbService
            .collection("nweets")
            .add(nweetObj);
        setNweet("");
        setAttachment("");
    };


    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    }


    const onFileChange = (event) => {
        const { target: {
            files
        } } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
            const { currentTarget: {
                result
            } } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);


        //console.log(event.target.files) console.log(theFile)
    };
    const onClearAttachment = () => setAttachment("");
    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120} />
                <input type="submit" onChange={onChange} value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity: 0
                }} />
            <input type="submit" value="click" /> {
                attachment && (
                    <div className="factoryForm__attachment">
                        <img src={attachment} width="50px" height="50px" style={{ backgroundImage: attachment }} />
                        <button onClick={onClearAttachment}>
                            <span>Remove</span>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                )
            }
        </form>
    )
};

export default NweetFactory;