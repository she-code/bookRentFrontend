import { Typography } from "@mui/material";

export default function CustomText(props: {
  text: string;
  fontSize: number;
  fontWeight: number;
  color?: string;
  ml?: number;
  mr?: number;
  mb?: number;
  mt?: number;
}) {
  const { text, fontSize, fontWeight, color, ml, mr, mt, mb } = props;
  return (
    <Typography
      ml={ml}
      mr={mr}
      mb={mb}
      mt={mt}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
    >
      {text}
    </Typography>
  );
}
