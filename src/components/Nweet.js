import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { dbService, storageService } from "../fbase";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        console.log(ok);
        if (ok) {
            //delete nweet
            await dbService
                .doc(`nweets/${nweetObj.id}`)
                .delete(); //텍스트 삭제
            await storageService
                .refFromURL(nweetObj.attachmentUrl)
                .delete(); //이미지 삭제
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService
            .doc(`nweets/${nweetObj.id}`)
            .update({ text: newNweet });
        setEditing(false);
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setNewNweet(value);
    };
    return (
        <div className="nweet">
            {editing
                ? (
                    <>
                        < form onSubmit={onSubmit} >
                            <input
                                type="text"
                                placeholder="Edit your nweet"
                                value={newNweet}
                                required="required"
                                autoFocus="autoFocus"
                                onChange={onChange}
                                className="formInput" />
                            <input type="submit" value="Update Nweet" className="formBtn" />
                        </form>
                        <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
                    </>
                ) : (
                    <>
                        <h4>{nweetObj.text}</h4 >
                        {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="100px" height="100px" />}
                        {isOwner && (
                            <div className="nweet__actions">
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                <span onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                            </div>
                        )}
                    </>
                )}
        </div>
    );
};
export default Nweet;