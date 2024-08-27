import { capitalize, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useEffect } from "react";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { fetchOwner } from "../User/userActions";
import CustomTextField from "../../components/TextField/Custom_TextField";

export default function OwnerDetails(props: {
  open: boolean;
  setOpen: (val: boolean) => void;
  ownerID: number;
}) {
  const { open, setOpen, ownerID } = props;
  const { owner } = useAppSelector((state) => state.users);
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useAppDispacth();
  useEffect(() => {
    dispatch(fetchOwner(ownerID));
    console.log(ownerID, owner);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerID]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Owner Details</DialogTitle>
      <DialogContent>
        {" "}
        <CustomTextField
          placeholder=""
          label="Full Name"
          type="text"
          disabled={true}
          name={"name"}
          value={`${capitalize(
            (owner?.firstName as string) || ""
          )} ${capitalize((owner?.lastName as string) || "")} `}
          handleInputChangeCB={() => {}}
        />
        <CustomTextField
          placeholder=""
          label="Email"
          type="text"
          disabled={true}
          name={"email"}
          value={`${owner?.email}`}
          handleInputChangeCB={() => {}}
        />
        <CustomTextField
          placeholder=""
          label="Phone Number"
          type="text"
          disabled={true}
          name={"phone"}
          value={`${owner?.phoneNumber}  `}
          handleInputChangeCB={() => {}}
        />
        <CustomTextField
          placeholder=""
          label="location"
          type="text"
          disabled={true}
          name={"location"}
          value={`${capitalize((owner?.location as string) || "")}  `}
          handleInputChangeCB={() => {}}
        />
        <CustomTextField
          placeholder=""
          label="status"
          type="text"
          disabled={true}
          name={"status"}
          value={`${capitalize((owner?.status as string) || "")}  `}
          handleInputChangeCB={() => {}}
        />
        <CustomTextField
          placeholder=""
          label="isApproved"
          type="text"
          disabled={true}
          name={"isApproved"}
          value={`${owner?.isApproved}  `}
          handleInputChangeCB={() => {}}
        />
      </DialogContent>
    </Dialog>
  );
}
