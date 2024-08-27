import React from "react";
import { Box } from "@mui/material";

// Define the props interface
interface CircleProps {
  color: string;
  size?: number;
}

// Circle component
const Circle: React.FC<CircleProps> = ({ color, size = 20 }) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        marginRight: 1,
      }}
    />
  );
};

export default Circle;
