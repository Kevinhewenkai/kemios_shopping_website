import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
interface Props {
    product: Product;
}

export default function ProductCard({product}: Props) {
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: 'secondary.main'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: {
                        fontWeight: 'bold',
                        color: 'primary.main'
                    }
                }}
            />
            <CardMedia
                sx={{ height: 140, bgcolor: 'primary.light', backgroundSize: 'contain' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" color="secondary" component="div">
                    {(product.price / 100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add to cart</Button>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
      </Card>
    )
}