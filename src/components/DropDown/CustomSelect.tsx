// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Chip,
//   Typography,
// } from "@mui/material";
// import { SelectChangeEvent } from "@mui/material/Select";

// interface CustomSelectProps<T> {
//   options: T[];
//   value: T | null;
//   onChange: (event: SelectChangeEvent<any>) => void;
//   label: string;
//   getOptionLabel: (option: T) => string;
//   getOptionValue: (option: T) => any;
// }

// const CustomSelect = <T,>({
//   options,
//   value,
//   onChange,
//   label,
//   getOptionLabel,
//   getOptionValue,
// }: CustomSelectProps<T>) => {
//   return (
//     <FormControl fullWidth variant="outlined" margin="dense">
//       <InputLabel>{label}</InputLabel>
//       <Select
//         value={value ? getOptionValue(value) : ""}
//         onChange={onChange}
//         label={label}
//         renderValue={(selected) => {
//           const selectedOption = options.find(
//             (option) => getOptionValue(option) === selected
//           );
//           return selectedOption ? (
//             <Chip label={getOptionLabel(selectedOption)} />
//           ) : (
//             <Typography>No selection</Typography>
//           );
//         }}
//       >
//         {options.map((option, index) => (
//           <MenuItem key={index} value={getOptionValue(option)}>
//             {getOptionLabel(option)}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// };

// export default CustomSelect;

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
  FormHelperText,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

// Define the type for options
interface Option<T> {
  label: string;
  value: T;
}

// Define the props for the CustomSelect component
interface CustomSelectProps<T> {
  options: Option<T>[];
  value: T;
  onChange: (event: SelectChangeEvent<T>) => void;
  label: string;
  getOptionLabel: (option: Option<T>) => string;
  getOptionValue: (option: Option<T>) => T;
  disabled?: boolean;
  name: string;
  error?: boolean;
  helperText?: string;
}

const CustomSelect = <T,>({
  options,
  value,
  onChange,
  label,
  getOptionLabel,
  getOptionValue,
  name,
  disabled,
  error,
  helperText,
}: CustomSelectProps<T>) => {
  return (
    <FormControl fullWidth variant="outlined" margin="dense">
      <InputLabel>{label}</InputLabel>
      <Select
        disabled={disabled}
        value={value}
        name={name}
        onChange={onChange}
        label={label}
        renderValue={(selected) => {
          const selectedOption = options.find(
            (option) => getOptionValue(option) === selected
          );
          return selectedOption ? (
            <Chip label={getOptionLabel(selectedOption)} />
          ) : (
            <Typography>No selection</Typography>
          );
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            value={getOptionValue(option) as unknown as string}
          >
            {getOptionLabel(option)}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <FormHelperText sx={{ color: "red" }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomSelect;
