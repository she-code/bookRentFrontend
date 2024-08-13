import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions, Typography } from "@mui/material";
import { Book } from "../../types/bookTypes";
import LinkButton from "../Button/LinkButton";
import { Link } from "react-router-dom";
import CustomText from "../Typography/CustomText";
import defaultImage from "../../assets/default-image.jpg";
export default function CustomCard(props: { data: Book }) {
  const { data } = props;
  const bookImage =
    data?.copies && data.copies.length > 0
      ? data.copies[0]?.image
      : data?.image;

  // Calculate the price range
  const rentalPrices = data?.copies?.map((copy) => copy.rentalPrice) || [];
  const minPrice =
    rentalPrices.length > 0 ? Math.min(...(rentalPrices as number[])) : 0;
  const maxPrice =
    rentalPrices.length > 0 ? Math.max(...(rentalPrices as number[])) : 0;
  const priceRange =
    minPrice === maxPrice
      ? `$${minPrice}`
      : minPrice > 0
      ? `$${minPrice} - $${maxPrice}`
      : "Price not available";

  // Check if there are multiple copies
  const multipleCopies = (data?.copies?.length as number) > 1;

  return (
    <Card sx={{ maxWidth: 345, height: 350 }}>
      <CardActionArea>
        <Link to={`/bookDetails/${data.id}`}>
          <CardMedia
            component="img"
            height="200"
            image={bookImage || defaultImage}
            alt="book image"
          />
        </Link>
        <CardContent>
          <CustomText text={data.book_title} fontSize={20} fontWeight={300} />
          {multipleCopies && (
            <CustomText
              text="Multiple Copies Available"
              fontSize={14}
              fontWeight={300}
            />
          )}
          <CustomText text={priceRange} fontSize={16} fontWeight={500} />
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ mb: 3 }}>
        {data?.copies?.length && data.copies.length > 1 ? (
          <LinkButton text="View" to={`/bookDetails/${data.id}`} width={80} />
        ) : data?.copies?.[0]?.id ? (
          <LinkButton
            text="Rent"
            to={`/bookRent/${data.id}?copyId=${data.copies[0].id}`}
            width={80}
          />
        ) : (
          <Typography color="textSecondary">No copies available</Typography>
        )}
      </CardActions>
    </Card>
  );
}
