import React from "react";
import { Container, Box, Typography } from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";

export default function Copyright() {
    return (
        <Container>
            <Box my={8}>
                <Typography variant="body2" color="textSecondary" align="center">
                    {"Copyright © "}
                    <MuiLink color="inherit" href="#">
                        Tousif
                    </MuiLink>{" "}
                    {new Date().getFullYear()}
                    {"."}
                </Typography>
            </Box>
        </Container>
    );
}
