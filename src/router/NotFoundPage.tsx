import { Box, Typography, Button } from "@mui/material";
import { Link } from "raviger";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary" mb={3}>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} href="/">
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
