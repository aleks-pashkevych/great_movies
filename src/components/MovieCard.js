import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToFavorites,
  fetchMovieData,
  addImage,
  addImageData
} from "../store";

export const MovieCard = ({ id, title, description, image }) => {
  const dispatch = useDispatch((state) => state.movies);
  const navigate = useNavigate();

  const handleFavorites = () => {
    console.log("Favorites", "id= " + id);
    dispatch(addToFavorites({ id, title, description, image }));
  };

  const handleCardClick = async () => {
    navigate(`/movies/${title}`);
    dispatch(addImage(image));
    dispatch(addImageData(title));
    dispatch(
      fetchMovieData({
        id,
        callback: () => {}
      })
    );
  };
  return (
    <Card>
      <CardHeader title={title} />
      <CardMedia
        component="img"
        image={image}
        alt={title}
        onClick={handleCardClick}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleFavorites}>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
