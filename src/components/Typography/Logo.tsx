import { MenuBook } from "@mui/icons-material";
import { Box } from "@mui/material";
import CustomText from "./CustomText";

export default function Logo(props: { my: number }) {
  const { my } = props;
  return (
    <Box display="flex" alignItems="center" my={my}>
      <MenuBook sx={{ color: "#00ABFF", width: "50px", height: "50px" }} />

      <CustomText
        text="Book Rent"
        fontSize={28}
        fontWeight={400}
        ml={2}
        color="#555"
      />
    </Box>
  );
}
