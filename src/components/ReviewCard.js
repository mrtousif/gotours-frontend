import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography";
import { Avatar, Grid, Box } from "@material-ui/core";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
// import { Description } from "@material-ui/icons";

const useStyles = makeStyles({
    root: {
        boxShadow: "0 1.5rem 4rem rgba(0, 0, 0, 0.1)",
        height: "18rem",
        minWidth: 280,
        padding: "1rem",
        backgroundColor: "#f7f7f7",
    },
    //   bullet: {
    //     display: "inline-block",
    //     margin: "0 2px",
    //     transform: "scale(0.8)",
    //   },
    //   title: {
    //     fontSize: 14,
    //   },
    //   pos: {
    //     marginBottom: 12,
    //   },
});

export default function SimpleCard(props) {
    const { description, name, rating, userImage } = props;
    const classes = useStyles();
    //   const bull = <span className={classes.bullet}>•</span>

    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(
            <Grid item key={i}>
                <StarOutlineIcon color="primary" />
            </Grid>
        );
    }

    return (
        <Box m={2}>
            <Card className={classes.root}>
                <CardContent>
                    <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "1rem" }}
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Avatar src={userImage} />
                        </Grid>
                        <Grid item>
                            <Typography variant="button">{name}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container style={{ height: 120 }}>
                        <Typography
                            variant="body2"
                            component="p"
                            align="center"
                            paragraph
                        >
                            {description}
                        </Typography>
                    </Grid>

                    <Grid container spacing={1} justify="center">
                        {stars}
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}
