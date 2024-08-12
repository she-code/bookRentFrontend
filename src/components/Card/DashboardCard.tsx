import { Card } from "@mui/material";
import CustomText from "../Typography/CustomText";

export default function DashboardCard(props: { title: string; count: number }) {
  const { title, count } = props;
  return (
    <Card
      sx={{
        padding: 2,
        boxShadow: 3,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 150,
      }}
    >
      <CustomText fontSize={24} fontWeight={500} text={title} />
      <CustomText
        fontSize={20}
        fontWeight={500}
        text={count.toString()}
        color="grey"
      />
    </Card>
  );
}
