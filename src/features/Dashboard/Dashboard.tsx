import { useEffect, useState } from "react";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import LayoutWithDrawer from "../../components/Layout/LayoutWithDrawer";
import { fetchUser } from "../Auth/authActions";
import AdminContent from "./AdminContent";
import OwnerContent from "./OwnerContent";

export default function PersistentDrawerLeft() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispacth();

  // Use local state to handle loading
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchUser()).finally(() => {
      setIsContentLoaded(true); // Set content loaded to true after fetching
    });
  }, [dispatch]);

  if (!isContentLoaded) {
    return (
      <LayoutWithDrawer title="Dashboard">
        <>loading..</>
      </LayoutWithDrawer>
    );
  }

  return (
    <LayoutWithDrawer title="Dashboard">
      {user?.userType === "admin" ? <AdminContent /> : <OwnerContent />}
    </LayoutWithDrawer>
  );
}
