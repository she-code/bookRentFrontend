import TextField from "@mui/material/TextField";

interface fieldProps {
  label: string;
  placeholder: string;
  type: string;
  name: string;
  error?: boolean;
  helperText?: string;
  value: string;
  disabled?: boolean;
  handleInputChangeCB: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  elementRef?: React.RefObject<HTMLInputElement>;
}
export default function CustomTextField(props: fieldProps) {
  const {
    label,
    value,
    placeholder,
    type,
    name,
    elementRef,
    handleInputChangeCB,
    error,
    helperText,
    disabled,
  } = props;
  return (
    <TextField
      ref={elementRef}
      value={value}
      fullWidth
      margin="dense"
      required
      id={name}
      label={label}
      type={type}
      name={name}
      error={!!error}
      placeholder={placeholder}
      helperText={helperText}
      onChange={(e) => handleInputChangeCB(e)}
      disabled={disabled}
    />
  );
}
