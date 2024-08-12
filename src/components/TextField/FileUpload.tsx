import { ChangeEvent, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import {
  PhotoCamera as PhotoCameraIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  // Specifies whether to upload an image or PDF
  type: "image" | "pdf";
}

const FileUpload = (props: FileUploadProps) => {
  const [fileName, setFileName] = useState<string>("");
  const { onFileSelect, type } = props;
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (
      file &&
      (type === "image"
        ? file.type.startsWith("image/")
        : file.type === "application/pdf")
    ) {
      setFileName(file.name); // Set the file name
      onFileSelect(file);
    } else {
      alert(`Please select a ${type === "image" ? "image" : "PDF"} file.`);
      setFileName(""); // Clear the file name if invalid
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <input
        accept={type === "image" ? "image/*" : "application/pdf"}
        style={{ display: "none" }}
        id={`file-upload-${type}`}
        type="file"
        onChange={handleFileChange}
        name={type == "image" ? "image" : "file"}
      />
      <label htmlFor={`file-upload-${type}`}>
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={
            type === "image" ? <PhotoCameraIcon /> : <DescriptionIcon />
          }
          sx={{ textTransform: "none" }}
        >
          {type === "image" ? "Upload Image" : "Upload PDF"}
        </Button>
      </label>
      {fileName && (
        <Typography variant="body2" sx={{ ml: 2 }}>
          {fileName}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;
