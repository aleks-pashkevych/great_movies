import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { useSelector } from "react-redux";

export const MovieView = () => {
  const { movieDataLoading, movieData, movieImage } = useSelector(
    (state) => state.movies
  );
  console.log("Movie Image", movieImage.mainImage);
  return (
    <Container
      fixed
      style={{
        marginTop: "40px"
      }}
    >
      {movieDataLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2 }} columns={12}>
          <Grid item xs={4} sm={4} md={4}>
            <Paper>
              <Box>
                <CardMedia
                  component="img"
                  image={movieImage.mainImage}
                  alt={movieImage.mainImageData}
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={8} sm={8} md={8}>
            <Typography variant="h3">{movieData.fullTitle}</Typography>
            <Typography variant="subtitle1">Year: {movieData.year}</Typography>
            <Typography variant="h4">Actors:</Typography>
            <Grid container spacing={{ xs: 2 }} columns={12}>
              {movieData.actors.map((item) => {
                return (
                  <Grid item xs={3} sm={3} md={3} key={item.imDbId}>
                    <img
                      style={{
                        width: "100%"
                      }}
                      src={`${item.image}`}
                      alt={item.name}
                      loading="lazy"
                    />
                    <Typography variant="subtitle1">{item.name}</Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
