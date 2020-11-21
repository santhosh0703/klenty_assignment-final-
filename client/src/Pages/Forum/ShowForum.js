import React, {useState, useEffect,useContext} from "react";
import Button from "@material-ui/core/Button";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import AuthContext from "../../Contexts/AuthContext";

export default function ShowForum() {
    const history = useHistory();
    const {id} = useParams();

    const [forum, setForum] = useState(null);
    const [threads, setThreads] = useState([]);
    const {user} = useContext(AuthContext)

    useEffect(() => {
        getForum();
        getThreads();
    }, []);

    const getForum = async () => {
        const response = await axios.get('/api/forum/'+id);
        setForum(response.data);
    };

    const getThreads = async () => {
        const response = await axios.get('/api/thread/forum/'+id);
        setThreads(response.data);
    };

    return (
        <div style={{padding: "2rem"}}>

            {forum && <h1>{forum.title}</h1>}

            <Button variant="contained" disabled={!user} color="primary" onClick={() => history.push("/thread/create/"+id)}>Create Thread</Button>
            <List>
                {threads.map((thread, index) => (
                    <ListItem key={index} button onClick={() => history.push(`/thread/${thread._id}`)}>
                        <ListItemText primary={thread.title} secondary={thread.createdAt} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}