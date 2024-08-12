import { Button } from "@mui/material";

export default function CustomButton(props: {
  text: string;
  variant: "contained";
  mt?: number;
  mr?: number;
  textColor?: string;
  bgColor?: string;
  handleClick?: () => void;
}) {
  const { text, variant, mt, textColor, bgColor, handleClick, mr } = props;
  return (
    <Button
      type="submit"
      onClick={handleClick}
      variant={variant}
      fullWidth
      sx={{ marginTop: mt, color: textColor, backgroundColor: bgColor, mr: mr }}
    >
      {text}
    </Button>
  );
}
