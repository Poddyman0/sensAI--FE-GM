import { ListItem, ListItemText } from "@mui/material";

export default function ChatMessages({ chatMessages }) {
  return chatMessages.map((message) => (
    <ListItem key={message.id}>
      {message.name === localStorage.getItem("user") ? (
        <ListItemText
          primary={`${message.name}: ${message.text}`}
          primaryTypographyProps={{
            color: "black",
            fontWeight: "large",
            variant: "body1",
          }}
        />
      ) : (
        <ListItemText
          primary={`${message.name}: ${message.text}`}
          primaryTypographyProps={{
            color: "blue",
            fontWeight: "large",
            variant: "body1",
          }}
        />
      )}
    </ListItem>
  ));
}
