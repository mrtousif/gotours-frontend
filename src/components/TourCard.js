import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EventIcon from "@material-ui/icons/Event";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import { Grid, Box } from "@material-ui/core";
import Link from "./Link";
import { parseISO } from "date-fns";

const useStyles = makeStyles({
    root: {
        borderRadius: "3px",
        maxWidth: 354,
        overflow: "hidden",
        boxShadow: "0 1.5rem 4rem rgba(0, 0, 0, 0.1)",
    },
    media: {
        height: 207,
    },
    margin: 5,
    title: {
        backgroundImage: `linear-gradient(
        to bottom right,
        rgba(125, 213, 111, 0.85),
        rgba(40, 180, 135, 0.85)
    )`,
        color: "#fff",
        padding: "1rem 1.5rem",
        fontFamily: "Lato",
        lineHeight: 1,
        fontSize: "2rem",
        textAlign: "right",
        // position: "absolute",
        // zIndex: 10,
        // width: "70%",
    },
    icon: {
        fontSize: "1.2rem",
    },
});

export default function MediaCard(props) {
    const {
        // images,
        summary,
        id,
        name,
        price,
        difficulty,
        ratingsAverage,
        duration,
        maxGroupSize,
        startLocation,
        startDates,
        locations,
        imageCover,
        // slug,
    } = props.tour;

    let m = parseISO(startDates[0]).toLocaleString("en-us", {
        month: "long",
        year: "numeric",
    });
    // console.log(m);

    const classes = useStyles();

    return (
        <Card key={id} className={classes.root}>
            <CardMedia
                className={classes.media}
                image={`https://res.cloudinary.com/irons101/image/upload/v1610020343/gotours/${imageCover}`}
                // style={{ clipPath: "polygon(0 0, 100% 0%, 100% 83%, 0% 98%)" }}
                title={name}
            />
            <div>
                <Typography className={classes.title}>{name}</Typography>
            </div>

            <CardContent>
                <Grid container spacing={1} style={{ padding: "0.5em" }}>
                    <Grid item>
                        <Typography variant="button" gutterBottom>
                            {difficulty} {duration} day tour
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            gutterBottom
                        >
                            {summary}
                        </Typography>
                    </Grid>

                    <Grid item container xs={6} spacing={1} alignItems="center">
                        <Grid item>
                            <LocationOnIcon color="primary" />
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                {startLocation.description}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item container xs={6} spacing={1} alignItems="center">
                        <Grid item>
                            <EventIcon color="primary" />
                        </Grid>
                        <Grid>
                            <Typography variant="body2">{m}</Typography>
                        </Grid>
                    </Grid>

                    <Grid item container xs={6} spacing={1} alignItems="center">
                        <Grid item>
                            <EmojiFlagsIcon color="primary" />
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">{locations.length}</Typography>
                        </Grid>
                    </Grid>

                    <Grid item container xs={6} spacing={1} alignItems="center">
                        <Grid item>
                            <PermIdentityIcon color="primary" />
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">{maxGroupSize}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>

            <CardActions style={{ backgroundColor: "#f7f7f7", padding: "1.5em" }}>
                <Grid container direction="column" xs={8} spacing={1}>
                    <Grid item container spacing={1} alignItems="center">
                        <Grid item>
                            <AttachMoneyIcon className={classes.icon} />
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" gutterBottom>
                                {price}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={1} alignItems="center">
                        <Grid item>
                            <StarBorderIcon className={classes.icon} />
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" gutterBottom>
                                {ratingsAverage}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Button
                    color="primary"
                    variant="outlined"
                    style={{ borderRadius: "10rem" }}
                    component={Link}
                    to={`/tours/${id}`}
                >
                    <Box px={2} py={1}>
                        Details
                    </Box>
                </Button>
            </CardActions>
        </Card>
    );
}
