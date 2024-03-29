import { SectionTitle } from "@/components";
import { Product } from "@chec/commerce.js/types/product";
import { Box, Container, Grid, styled } from "@mui/material";
import SingleProduct from "./Product";

type ProductListProps = {
  products: Product[];
};

const ProductsSection = styled(Box)(({ theme }) => ({
  background: theme.palette.background.secondary,
  padding: "100px 0",
}));
export function ProductList(props: ProductListProps) {
  const { products } = props;
  return (
    <ProductsSection id="get_started">
      <Container maxWidth="xl">
        <SectionTitle
          title="Featured Products"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <Grid container columns={12} spacing={5}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <SingleProduct product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ProductsSection>
  );
}
export { default as SingleProduct } from "./Product";
