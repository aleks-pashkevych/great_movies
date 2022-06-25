import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { MovieCard } from "../components";
import { useSelector } from "react-redux";
export const FavoritesView = () => {
  const { favorites } = useSelector((store) => store.movies);
  return (
    <Container fixed>
      <Grid container spacing={{ xs: 2 }} columns={12}>
        {favorites.map((item) => {
          return (
            <Grid item xs={3} sm={3} md={3} key={item.id}>
              <MovieCard
                id={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
