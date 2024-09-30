import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";


export const LoginButton = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/login");
    }

    return (
        <Button
        id="login-button"
        onClick={handleClick}
      >
        login
      </Button>
    )
}