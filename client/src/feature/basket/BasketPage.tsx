import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";

export default function BasketPage() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [loading, setLoading] = useState({
    loading: false,
    name: "",
  });

  function handleAddItem(productId: number, name: string) {
    setLoading({ loading: true, name: name });
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading({ loading: false, name: name });
      });
  }

  function handleRemoveItem(productId: number, quantity = 1, name: string) {
    setLoading({ loading: true, name: name });
    agent.Basket.removeItem(productId)
      .then(() => removeItem(productId, quantity))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading({ loading: false, name: name });
      });
  }

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="item">
                  <Box display={"flex"} alignItems={"center"}>
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(item.price / 100).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    color="error"
                    loading={
                      loading.loading && loading.name === "rem" + item.productId
                    }
                    onClick={() => {
                      handleRemoveItem(
                        item.productId,
                        1,
                        "rem" + item.productId
                      );
                    }}
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    color="secondary"
                    loading={
                      loading.loading && loading.name === "add" + item.productId
                    }
                    onClick={() => {
                      handleAddItem(item.productId, "add" + item.productId);
                    }}
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  ${((item.price / 100) * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={
                      loading.loading && loading.name === "del" + item.productId
                    }
                    color="error"
                    onClick={() => {
                      handleRemoveItem(
                        item.productId,
                        item.quantity,
                        "del" + item.productId
                      );
                    }}
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
