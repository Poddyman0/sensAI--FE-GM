/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import ChatMessages from "./ChatMessages";
import { socket } from "../socket";

export default function Chat({ user }) {
  const ENTER_KEY_CODE = 13;
  const scrollBottomRef = useRef(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("user"));
  const [message, setMessage] = useState("");
  const { room_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (
        localStorage.getItem("roomId") !== room_id ||
        user.name !== localStorage.getItem("user")
      ) {
        if (user.role === "student") {
          navigate("/student/teachers");
        } else if (user.role === "teacher") {
          navigate("/teacher/classes");
        } else {
          navigate("/");
        }
      }

      socket.emit("select_room", room_id, (data) => {
        setChatMessages(data);
      });
    }
  }, [room_id, user, navigate]);

  useEffect(() => {
    if (user) {
      socket.on("messageResponse", (data) => {
        setChatMessages([...chatMessages, data]);
      });
    }
  }, [chatMessages, user]);

  useEffect(() => {
    // scroll to bottom every time messages change
    scrollBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleEnterKey = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (currentUser && message) {
      console.log("Send!");
      const newMessage = {
        text: message,
        name: localStorage.getItem("user"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      };
      socket.emit("message", { data: newMessage, room: room_id });
      setMessage("");
    }
  };

  return (
    <Fragment>
      <Container>
        <Paper elevation={5}>
          <Box p={3}>
            <Typography variant="h4" gutterBottom>
              sensAI chat!
            </Typography>
            <Divider />
            <Grid container spacing={1} alignItems="center">
              <Grid id="chat-window" xs={12} item>
                <List id="chat-window-messages">
                  <ChatMessages chatMessages={chatMessages} />
                  <ListItem ref={scrollBottomRef}></ListItem>
                </List>
              </Grid>
              <Grid xs={3} md={2} item>
                <FormControl fullWidth>
                  <TextField
                    value={currentUser}
                    label="Nickname"
                    variant="outlined"
                    disabled
                  />
                </FormControl>
              </Grid>
              <Grid xs={8} md={9} item>
                <FormControl fullWidth>
                  <TextField
                    onChange={handleMessageChange}
                    onKeyDown={handleEnterKey}
                    value={message}
                    label="Type your message..."
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid xs={1} md={1} item>
                <IconButton
                  onClick={sendMessage}
                  aria-label="send"
                  color="primary"
                >
                  <SendIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
}
