import { Avatar, Box, Typography } from "@mui/material";
import { User } from "../../types/userTypes";
const UserProfile = (props: { toggle: boolean; user: User }) => {
  const { toggle, user } = props;
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2, // Material-UI gap instead of Tailwind's gap-5
        alignItems: "center",
        mb: 2.5, // Material-UI spacing equivalent to Tailwind's mb-10
        backgroundColor: toggle ? "none" : "white",
        borderRadius: toggle ? 0 : "1rem",
        padding: toggle ? 0 : "0.5rem",
        transition: "all 0.3s ease",
        transitionDelay: toggle ? "200ms" : "0ms",
      }}
    >
      <Avatar
        src="https://avatars.githubusercontent.com/u/47259776?v=4"
        alt={user?.firstName || "User Avatar"}
        sx={{
          width: "3.5rem",
          height: "3.5rem",
        }}
      />

      <Box
        sx={{
          opacity: toggle ? 0 : 1,
          transitionDelay: toggle ? "200ms" : "0ms",
        }}
      >
        <Typography variant="h6">{user?.firstName || ""}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.6 }}>
          {user?.email || ""}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserProfile;
