import React from "react";
import { Container, Grid } from "@material-ui/core";
// import Typography from "@material-ui/core/Typography"
// import Box from "@material-ui/core/Box"
// import ProTip from "../components/ProTip"
// import Link from "../components/Link"
// import NavBar from "../components/NavBar"
// import TopLayout from "../components/TopLayout"
// import SEO from "../components/seo"
// import useFetch from "use-http";
// import Loading from "../components/Loading";
import TourCard from "../components/TourCard";
import tours from "../data/toursData";

export default function Home() {
    // const [tours, setTours] = React.useState([]);
    // const options = {}; // these options accept all native `fetch` options
    // the last argument below [] means it will fire onMount (GET by default)
    const { data = [] } = useFetch("/tours", options, []);

    console.log(data);
    // if (error) return "ERROR :(";
    // if (loading) return <Loading />;

    return (
        <Container style={{ marginTop: "2rem" }}>
            <Grid container justify="space-around" spacing={3}>
                {tours.map((tour) => (
                    <Grid item key={tour.id}>
                        <TourCard tour={tour} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
