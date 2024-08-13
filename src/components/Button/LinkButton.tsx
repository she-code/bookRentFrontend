import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function LinkButton(props: {
  to: string;
  text: string;
  width?: number;
}) {
  const { to, text, width } = props;
  return (
    <Button
      size="small"
      color="primary"
      variant="outlined"
      component={Link}
      to={`${to}`}
      sx={{ textDecoration: "none", width: { width } }}
    >
      {text}
    </Button>
  );
}
