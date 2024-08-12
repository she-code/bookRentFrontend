import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function LinkButton(props: { to: string; text: string }) {
  const { to, text } = props;
  return (
    <Button
      size="small"
      color="primary"
      variant="outlined"
      component={Link}
      to={`${to}`}
      style={{ textDecoration: "none" }}
    >
      {text}
    </Button>
  );
}
