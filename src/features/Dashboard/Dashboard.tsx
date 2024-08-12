import { useAppSelector } from "../../app/hooks";
import LayoutWithDrawer from "../../components/Layout/LayoutWithDrawer";

import AdminContent from "./AdminContent";
import OwnerContent from "./OwnerContent";

export default function PersistentDrawerLeft() {
  const { user } = useAppSelector((state) => state.users);

  return (
    <LayoutWithDrawer title="Dashboard">
      {user?.userType == "admin" ? <AdminContent /> : <OwnerContent />}
    </LayoutWithDrawer>
  );
}
