import { Button, Chip } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Post } from "Helper/Types";
import React from "react";

interface FeaturedPostProps {
    post: Post;
}

export default function FeaturedPost(props: FeaturedPostProps) {
    const { post } = props;

    return (
        <CardActionArea >
            <Card sx={{ display: "flex" ,borderRight: '5px solid orange'}} >
                <CardMedia
                    component="img"
                    sx={{ width: 250, display: { xs: "none", sm: "block" } }}
                    image={post.thumbnail}
                    alt="thumbnail"
                />
                <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                        {post.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        <Chip label={`Ngày đăng: ${post.created_at}`} color="info" variant="outlined" />
                        <Chip sx={{ ml: 1 }} label={`Lượt xem: ${post.view}`} color="info" variant="outlined" />
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                        {post.summary}
                    </Typography>
                    <Button variant="contained" color="primary">
                        Xem tiếp...
                    </Button>
                </CardContent>
            </Card>
        </CardActionArea>
    );
}
