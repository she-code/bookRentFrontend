import { Box } from "@mui/material";
import FileUpload from "./FileUpload";
import CustomText from "../Typography/CustomText";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  // Specifies whether to upload an image or PDF
  type: "image" | "pdf";
}

const FileUploadContainer = (props: FileUploadProps) => {
  const { onFileSelect, type } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {type == "image" ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            my: 3,
          }}
        >
          <CustomText
            text="Book Cover Upload:"
            fontSize={18}
            fontWeight={200}
          ></CustomText>
          <FileUpload onFileSelect={onFileSelect} type="image" />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CustomText
            text="PDF Upload:"
            fontSize={18}
            fontWeight={200}
          ></CustomText>
          <FileUpload onFileSelect={onFileSelect} type="pdf" />
        </Box>
      )}
    </Box>
  );
};

export default FileUploadContainer;
