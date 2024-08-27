import { Box, Card, CardContent, Divider, Paper } from "@mui/material";
import CustomText from "../../components/Typography/CustomText";
import { formatDate, getMonthRange, sumTotalAmountForMonth } from "../../utils";
import AvilableBooksChart from "./AvilableBooksChart";
import { useAppSelector } from "../../app/hooks";

import { subMonths } from "date-fns";

export default function MonthStastics() {
  const { rents } = useAppSelector((state) => state.rents);
  const { user } = useAppSelector((state) => state.auth);
  const ownerRents = rents.filter((rent) => rent.ownerId == user?.id);

  // Define the current month and the previous month
  const currentMonthRange = getMonthRange(new Date());
  const previousMonthRange = getMonthRange(subMonths(new Date(), 1));

  const rentData = user?.userType == "admin" ? rents : ownerRents;
  // Calculate sums
  const currentMonthTotal = sumTotalAmountForMonth(rentData, currentMonthRange);
  const previousMonthTotal = sumTotalAmountForMonth(
    rentData,
    previousMonthRange
  );

  // Compute the difference
  const difference = currentMonthTotal - previousMonthTotal;

  // Calculate percentage difference
  const percentageDifference = previousMonthTotal
    ? (difference / previousMonthTotal) * 100
    : 0;
  return (
    <Paper
      sx={{
        boxShadow: "none",
        p: 3,
        borderRadius: 4,
        width: "20%",
      }}
    >
      <Box>
        <CustomText
          text="This month Statistics"
          fontSize={20}
          fontWeight={500}
          color="#525256;
"
        />
        <CustomText
          text={formatDate(new Date())}
          fontSize={16}
          fontWeight={400}
          color="#A3A3A3"
        />
      </Box>
      <Box>
        <Card sx={{ my: 3, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
            }}
          >
            <CustomText
              text="Income"
              fontSize={16}
              color="#656575"
              fontWeight={400}
            />
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              <CustomText
                text="This Month"
                fontSize={14}
                color="#555"
                fontWeight={400}
              />
            </Box>
          </Box>
          <CardContent>
            <Divider sx={{ mb: 2, mx: 2 }} />
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"flex-end"}
            >
              <CustomText
                text={`ETB ${currentMonthTotal}`}
                fontSize={28}
                fontWeight={700}
                color="#01150C"
              />
              <CustomText
                text={`${percentageDifference}%`}
                fontSize={14}
                fontWeight={400}
                color={percentageDifference > 0 ? "green" : "red"}
              />
            </Box>
            <CustomText
              text={`Compared to ETB ${difference} last month`}
              fontSize={15}
              color="#656575"
              fontWeight={100}
              mb={1}
            />
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"flex-end"}
            >
              <CustomText
                text="Last Month Income"
                fontSize={14}
                fontWeight={400}
                color="#525256"
              />
              <CustomText
                text={`ETB ${previousMonthTotal}`}
                fontSize={14}
                fontWeight={400}
                color="#525256"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Card sx={{ my: 3, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
            }}
          >
            <CustomText
              text="Available Books"
              fontSize={16}
              color="#656575"
              fontWeight={400}
            />
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              <CustomText
                text="Today"
                fontSize={14}
                color="#555"
                fontWeight={200}
              />
            </Box>
          </Box>
          <CardContent>
            <AvilableBooksChart />
          </CardContent>
        </Card>
      </Box>
    </Paper>
  );
}
