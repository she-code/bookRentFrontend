import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions } from "@mui/material";
import { Book } from "../../types/bookTypes";
import LinkButton from "../Button/LinkButton";
import { Link } from "react-router-dom";
import CustomText from "../Typography/CustomText";

export default function CustomCard(props: { data: Book }) {
  const { data } = props;
  return (
    <Card sx={{ maxWidth: 345, maxHeight: 350 }}>
      <CardActionArea>
        <Link to={`/bookDetails/${data.id}`}>
          <CardMedia
            component="img"
            height="240"
            image={`${data?.image}`}
            alt="book image"
          />
        </Link>
        <CardContent>
          <CustomText
            text={data.book_title}
            fontSize={20}
            fontWeight={300}
          ></CustomText>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <LinkButton text="Rent" to={`/bookRent/${data.id}`} />
      </CardActions>
    </Card>
  );
}
