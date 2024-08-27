import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import CustomNavHeading from "../../components/Navigation/CustomNavHeading";
import CustomText from "../../components/Typography/CustomText";
import { LightTextColor } from "../../config/constants";

export default function UploadBook() {
  return (
    <Box>
      <CustomNavHeading title="Owner" sub="Upload Book" />
      <Paper sx={{ mt: 3, p: 3, border: 0, boxShadow: "none", height: "100%" }}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <CustomText
            text="Upload New Book"
            fontSize={22}
            fontWeight={500}
            color={"#555"}
          />
          <TextField
            sx={{ mt: 3, width: "30%" }}
            id="filled-basic"
            label="Search book by name or Author"
            variant="filled"
          />
        </Box>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <FormControl sx={{ width: "30%", mr: 3, mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={0}
              label="Age"
              onChange={() => {}}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ mt: 3, width: "30%", borderColor: { LightTextColor } }}
            id="filled-basic"
            label="Rent Price for two weeks"
            variant="outlined"
          />
        </Box>
      </Paper>
    </Box>
  );
}
