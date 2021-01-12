import React from "react"
import Layout from "../components/TopLayout"
// import SEO from "../components/seo"
import { Container, Typography } from "@material-ui/core"

const NotFoundPage = () => (
  <Layout>
    {/* <SEO title="404: Not found" /> */}
    <Container maxWidth="md">
      <Typography variant="h3">404: Not Found</Typography>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Container>
  </Layout>
)

export default NotFoundPage
