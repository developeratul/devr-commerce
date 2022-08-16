import Cart from "@/services/cart";
import { Product } from "@chec/commerce.js/types/product";
import { ShoppingCart } from "@mui/icons-material";
import { CardActionArea, CardActions, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState } from "react";

type ProductProps = {
  product: Product;
};
export default function SingleProduct(props: ProductProps) {
  const { product } = props;
  const [isAdding, setIsAdding] = useState(false);
  const addToCart = (productId: string) => {
    setIsAdding(true);
    Cart.add(productId).finally(() => setIsAdding(false));
  };
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          loading="lazy"
          component="img"
          height="200"
          src={product.image?.url}
          alt={product.name}
        />
        <CardContent>
          <Typography noWrap>{product.name}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton onClick={() => addToCart(product.id)} disabled={isAdding} color="secondary">
          <ShoppingCart />
        </IconButton>
        <Typography>{product.price.formatted_with_symbol}</Typography>
      </CardActions>
    </Card>
  );
}
