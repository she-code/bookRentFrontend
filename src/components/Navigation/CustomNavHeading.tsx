import { Box, Paper } from "@mui/material";
import CustomText from "../Typography/CustomText";

export default function CustomNavHeading(props: {
  title: string;
  sub: string;
}) {
  const { title, sub } = props;
  return (
    <Paper sx={{ p: 2, borderRadius: 3, boxShadow: "none", mb: 4 }}>
      <Box display="flex">
        <CustomText
          text={title}
          fontSize={22}
          fontWeight={600}
          color="black"
          ml={4}
        />
        <CustomText
          text={`/${sub}`}
          fontSize={22}
          fontWeight={400}
          color="grey"
        />
      </Box>
    </Paper>
  );
}
