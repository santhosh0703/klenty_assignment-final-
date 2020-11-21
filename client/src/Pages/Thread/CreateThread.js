import React, {useState, useContext} from "react";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {useHistory, useParams} from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";

const CreateForum = () => {
    const {user} = useContext(AuthContext);
    const {id} = useParams();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleOnSubmit = async event => {
        event.preventDefault();

        const data = {
            title,
            content,
            userId: user._id,
            forumId: id
        };

        const response = await axios.post('/api/thread/create', data);
        const {_id} = response.data;
        history.push('/thread/'+_id);
    };

    return (
        <div style={{padding: "2rem"}}>
            <h1 style={{marginBottom: "2rem"}}>start your discussion Thread</h1>

            <form onSubmit={handleOnSubmit}>
                <TextField label="Title"
                           required
                           fullWidth
                           margin="normal"
                           value={title}
                           onChange={e => setTitle(e.target.value)}/>

               <textarea placeholder="Content"
                         required
                         value={content}
                         style={{width: "100%", height: 250}}
                         onChange={e => setContent(e.target.value)}>

               </textarea>
                <Button type="submit" variant="contained" color="primary">Create</Button>
            </form>
        </div>
    )
};

export default CreateForum;