import React from "react";
import {
    Avatar,
    CardContent,
    Grid,
    Typography,
    Card,
    useMediaQuery,
    Button,
} from "@material-ui/core";
// import ProTip from "../components/ProTip"
// import Link from "../components/Link"
import { makeStyles, useTheme } from "@material-ui/core/styles";
import EventIcon from "@material-ui/icons/Event";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import RoomIcon from "@material-ui/icons/Room";
import QuickFactsItem from "../components/QuickFactsItem";
import Loading from "../components/Loading";
import ReviewCard from "../components/ReviewCard";
import useFetch from "use-http";
import Mapbox from "../components/Mapbox";
import { loadStripe } from "@stripe/stripe-js";
import UserProvider from "../contexts/UserProvider";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);

const useStyles = makeStyles((theme) => ({
    sectionHeader: {
        position: "relative",
        height: "38vw",
        // clipPath: "polygon(0 0, 100% 0%, 100% 80%, 0% 100%)",
        [theme.breakpoints.down("md")]: {
            height: 400,
        },
    },
    heroImg: {
        objectFit: "cover",
        height: "100%",
        width: "100%",
        objectPosition: "50% 25%",
    },
    headingBox: {
        position: "absolute",
        // bottom: "13vw",
        left: "50%",
        top: "45%",
        transform: "translate(-50%, -50%)",
        padding: "1rem 1.2rem",
        backgroundImage:
            "linear-gradient( to bottom right, rgba(125, 213, 111, 0.85), rgba(40, 180, 135, 0.85) )",
    },
    headingPrimary: {
        fontSize: "3rem",
        textAlign: "center",
        // width: "70%",
        margin: "0 auto",
        fontFamily: "'Lato', sans-serif",
        fontWeight: 300,
        color: "#fff",
        textTransform: "uppercase",
    },
    span: {
        // lineHeight: 1,
        // backgroundImage:
        //     "linear-gradient( to bottom right, rgba(125, 213, 111, 0.85), rgba(40, 180, 135, 0.85) )",
        // boxDecorationBreak: "clone",
    },
    headingBoxGroup: {
        color: "#f7f7f7",
        marginTop: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    headingBoxDetail: {
        fontSize: "1.5rem",
        fontWeight: 700,
        textTransform: "uppercase",
        display: "flex",
        alignItems: "center",
        textShadow: "0 0.5rem 2rem rgba(0, 0, 0, 0.15)",
        marginRight: "1rem",
    },
    sectionDescription: {
        // backgroundColor: "#fcfcfc",
        // marginTop: "-4rem",
    },
    sectionPicture: {
        // display: "flex",
        // clipPath: "polygon(0 30%, 100% 0%, 100% 70%, 0% 100%)",
        //   "polygon( 0 var(--section-rotate), 100% 0, 100% calc(100% - var(--section-rotate)), 0 100% )",
        // marginTop: "-8rem",
        // position: "relative",
        // zIndex: 1000,
    },
    pictureBox: {
        display: "block",
        width: "100%",
        height: "auto",
        // objectFit: "cover",
        maxHeight: 400,
    },
    sectionReview: {
        display: "grid",
        height: 500,
        overflowX: "auto",
        // gridColumnGap: "2rem",
        gridAutoFlow: "column",
        alignItems: "center",
        padding: "2rem",
        backgroundImage:
            "linear-gradient( to bottom right, rgba(125, 213, 111, 0.85), rgba(40, 180, 135, 0.85) )",
    },
    sectionCta: {
        backgroundColor: "#f7f7f7",
        minHeight: "30rem",
        padding: "5rem",
        // display: "flex",
        // alignItems: "center",
    },
    ctaImage: {
        height: "15rem",
        width: "15rem",
        // position: "absolute",
        left: 0,
        top: "50%",
        borderRadius: "50%",
        boxShadow: "1rem 0.5rem 3rem rgba(0, 0, 0, 0.15)",
    },
    bookButton: {
        fontSize: "1.2rem",
        padding: "1.2rem 2rem",
        borderRadius: "10rem",
        fontFamily: "Lato",
    },
}));

export default function TourTemplate(props) {
    // console.log(props);
    const { id } = props.match.params;
    const userCtx = React.useContext(UserProvider.context);
    // console.log(id);
    const classes = useStyles();
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    //   console.log(props)
    // const [tourData, setTourData] = React.useState(null);
    // const [funcCalled, setFuncCalled] = React.useState(false);
    const { loading, error, data = {} } = useFetch(`/tours/${id}`, {}, []);

    if (error) return "ERROR :(";
    if (loading) return <Loading />;
    // if (data) {
    //     console.log(data);
    // }
    const { doc } = data.data;

    const bookTour = async () => {
        if (!userCtx.user) {
            props.history.push("/login");
            return;
        }

        const tourId = doc._id;
        try {
            // get checkout session
            const res = await fetch(
                `https://gotours-touring-app-101.herokuapp.com/api/v1/bookings/checkout-session/${tourId}`,
                {
                    credentials: "include",
                }
            );
            const session = await res.json();
            console.log(session);
            // create checkout and charge
            (await stripePromise).redirectToCheckout({
                sessionId: session.data.id,
            });
        } catch (error) {
            console.error(error);
            // alert('error', error.message);
        }
    };

    //   React.useEffect(()=> {

    //   })

    return (
        <div>
            <section className={classes.sectionHeader}>
                <img
                    src={`https://res.cloudinary.com/irons101/image/upload/v1610020343/gotours/${doc.imageCover}`}
                    alt="tour-2-cover"
                    className={classes.heroImg}
                />

                <div className={classes.headingBox}>
                    <div className={classes.headingPrimary}>
                        <span className={classes.span}>{doc.name}</span>
                    </div>

                    <div className={classes.headingBoxGroup}>
                        <div className={classes.headingBoxDetail}>
                            <AccessTimeIcon />
                            <Typography>{doc.duration} DAYS</Typography>
                        </div>
                        <div className={classes.headingBoxDetail}>
                            <RoomIcon />
                            <Typography>{doc.startLocation.description}</Typography>
                        </div>
                    </div>
                </div>
            </section>
            <section className={classes.sectionDescription}>
                <Grid container>
                    <Grid
                        item
                        container
                        md
                        direction="column"
                        alignItems="center"
                        style={{
                            paddingTop: "10rem",
                            paddingBottom: "10rem",
                            backgroundColor: "#f7f7f7",
                        }}
                    >
                        <Grid item>
                            <Typography
                                variant="h5"
                                color="primary"
                                style={{ marginBottom: "1em" }}
                            >
                                QUICK FACTS
                            </Typography>
                            <QuickFactsItem
                                Icon={<EventIcon color="primary" />}
                                title="NEXT DATE"
                                subtitle="June 2021"
                            />
                            <QuickFactsItem
                                Icon={<ShowChartIcon color="primary" />}
                                title="DIFFICULTY"
                                subtitle={doc.difficulty}
                            />

                            <QuickFactsItem
                                Icon={<PersonOutlineIcon color="primary" />}
                                title="PARTICIPANTS"
                                subtitle={doc.maxGroupSize}
                            />
                            <QuickFactsItem
                                Icon={<StarOutlineIcon color="primary" />}
                                title="RATING"
                                subtitle={`${doc.ratingsAverage} / ${doc.ratingsQuantity}`}
                            />
                            <QuickFactsItem
                                Icon={<AttachMoneyIcon color="primary" />}
                                title="PRICE"
                                subtitle={doc.price}
                            />
                            <Typography
                                variant="h5"
                                color="primary"
                                style={{ marginTop: "1em", marginBottom: "1em" }}
                            >
                                TOUR GUIDES
                            </Typography>
                            {doc.guides.map((guide, i) => (
                                <QuickFactsItem
                                    key={i}
                                    Icon={
                                        <Avatar
                                            color="primary"
                                            src={`https://res.cloudinary.com/irons101/image/upload/v1610020343/gotours/users/${guide.photo}`}
                                        />
                                    }
                                    title={i === 0 ? "LEAD GUIDE" : "GUIDE"}
                                    subtitle={guide.name}
                                />
                            ))}
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        // container
                        md={6}
                        style={{
                            paddingTop: matchesMD ? "5rem" : "10rem",
                            paddingBottom: "5rem",
                            paddingLeft: "4rem",
                            paddingRight: "4rem",
                        }}
                    >
                        <Typography
                            variant="h5"
                            color="primary"
                            style={{ marginBottom: "1em" }}
                        >
                            ABOUT THE TOUR
                        </Typography>
                        <Typography variant="body1" color="textSecondary" paragraph>
                            {doc.description}
                        </Typography>
                    </Grid>
                </Grid>
            </section>
            <section>
                {/* className={classes.sectionPicture} */}
                {/* Images */}
                <Grid container justify="center">
                    {doc.images.map((image) => (
                        <Grid item md={4} key={image}>
                            <img
                                src={`https://res.cloudinary.com/irons101/image/upload/v1610020343/gotours/${image}`}
                                className={classes.pictureBox}
                                alt={image}
                            />
                        </Grid>
                    ))}
                </Grid>
            </section>
            <section>
                <Mapbox locations={doc.locations} />
            </section>
            <section className={classes.sectionReview}>
                {/* <Grid container> */}
                {doc.reviews.map((review) => (
                    // <Grid item key={review._id}>
                    <ReviewCard
                        key={review._id}
                        name={review.user.name}
                        description={review.review}
                        rating={review.rating}
                        userImage={`https://res.cloudinary.com/irons101/image/upload/v1610020343/gotours/users/${review.user.photo}`}
                    />
                    // </Grid>
                ))}
                {/* </Grid> */}
            </section>
            <section className={classes.sectionCta}>
                <Card
                    style={{
                        boxShadow: "0 1.5rem 4rem rgba(0, 0, 0, 0.1)",
                        borderRadius: "35px",
                    }}
                >
                    <CardContent>
                        <Grid
                            container
                            justify={matchesMD ? "center" : "space-between"}
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item>
                                <img
                                    className={classes.ctaImage}
                                    src={`https://res.cloudinary.com/irons101/image/upload/v1610020343/gotours/${doc.imageCover}`}
                                    alt="cover"
                                />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="h5"
                                    color="primary"
                                    align={matchesMD ? "center" : undefined}
                                    gutterBottom
                                >
                                    What are you waiting for?
                                </Typography>
                                <Typography>
                                    5 days. 1 adventure. Infinite memories. Make it yours
                                    today!
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    className={classes.bookButton}
                                    data-tour-id={doc._id}
                                    // role="link"
                                    onClick={bookTour}
                                >
                                    Book Tour
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
