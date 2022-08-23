import { NoData } from "@/components";
import { Flex } from "@/styles";
import { Add, Delete, Remove } from "@mui/icons-material";
import * as Mui from "@mui/material";
import Image from "next/image";
import { useCartDispatchContext, useCartStateContext } from "../Provider";
import Service from "../service";

const StyledTableContainer = Mui.styled(Mui.TableContainer)(({ theme }) => ({
  background: theme.palette.background.secondary,
  borderRadius: 5,
  boxShadow: theme.shadows[1],
}));
const StyledTableCell = Mui.styled(Mui.TableCell)(({ theme }) => ({
  [`&.${Mui.tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
  },
}));
const Quantity = Mui.styled(Mui.Typography)({ padding: "20px" });

export default function CartTable() {
  const { cart } = useCartStateContext();
  const { setCart } = useCartDispatchContext();
  const addQuantity = async (lineId: string, currentQty: number) => {
    const { cart } = await Service.update(lineId, (currentQty += 1));
    setCart(cart);
  };
  const subQuantity = async (lineId: string, currentQty: number) => {
    const updatedQty = (currentQty -= 1);
    if (updatedQty <= 0) {
      const { cart } = await Service.remove(lineId);
      setCart(cart);
      return;
    }
    const { cart } = await Service.update(lineId, updatedQty);
    setCart(cart);
  };
  const removeFromCart = (lineId: string) => subQuantity(lineId, 0);
  if (!cart?.line_items.length) {
    return (
      <NoData
        title="Your cart is empty"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
    );
  }
  return (
    <StyledTableContainer>
      <Mui.Table aria-label="Cart table">
        <Mui.TableHead>
          <Mui.TableRow>
            <StyledTableCell>Product Details</StyledTableCell>
            <StyledTableCell>Quantity</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
          </Mui.TableRow>
        </Mui.TableHead>
        <Mui.TableBody>
          {cart?.line_items.map((item) => (
            <Mui.TableRow key={item.id}>
              <StyledTableCell sx={{ minWidth: 600 }}>
                <Flex gap={3}>
                  <Image
                    style={{ borderRadius: 5 }}
                    src={item.image?.url as string}
                    alt={item.name}
                    loading="eager"
                    width={150}
                    height={150}
                  />
                  <Mui.Box>
                    <Mui.Typography variant="h6" gutterBottom maxWidth={400}>
                      {item.name}
                    </Mui.Typography>
                    <Mui.Button
                      onClick={() => removeFromCart(item.id)}
                      color="error"
                      variant="outlined"
                      startIcon={<Delete />}
                    >
                      Remove
                    </Mui.Button>
                  </Mui.Box>
                </Flex>
              </StyledTableCell>
              <StyledTableCell sx={{ minWidth: 250 }}>
                <Mui.FormGroup row sx={{ display: "flex", alignItems: "center" }}>
                  <Mui.Button
                    variant="outlined"
                    onClick={() => addQuantity(item.id, item.quantity)}
                  >
                    <Add />
                  </Mui.Button>
                  <Quantity>{item.quantity}</Quantity>
                  <Mui.Button
                    variant="outlined"
                    onClick={() => subQuantity(item.id, item.quantity)}
                  >
                    <Remove />
                  </Mui.Button>
                </Mui.FormGroup>
              </StyledTableCell>
              <StyledTableCell>
                <Mui.Typography>{item.price.formatted_with_symbol}</Mui.Typography>
              </StyledTableCell>
            </Mui.TableRow>
          ))}
        </Mui.TableBody>
      </Mui.Table>
    </StyledTableContainer>
  );
}
