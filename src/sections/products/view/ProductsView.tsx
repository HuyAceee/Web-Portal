import { useState } from "react";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import { products } from "_mock/products";

import ProductCard from "../ProductCard";
import ProductSort from "../ProductSort";
import ProductFilters from "../ProductFilters";
import ProductCartWidget from "../ProductCartWidget";
import { Grow, Paper } from "@mui/material";

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <Grow in timeout={1000 + index *200} >
              <Paper>
                <ProductCard product={product} />
              </Paper>
            </Grow>
          </Grid>
        ))}
      </Grid>

      <ProductCartWidget />
    </Container>
  );
}
