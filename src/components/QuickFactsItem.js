import React from "react"
import { Grid, Typography } from "@material-ui/core"

export default function QuickFactsItem({ Icon, title, subtitle }) {
  return (
    <Grid
      item
      container
      spacing={2}
      // justify="center"
      alignItems="center"
    >
      <Grid item>{Icon}</Grid>
      <Grid item>
        <Typography variant="body2">{title}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="textSecondary">
          {subtitle}
        </Typography>
      </Grid>
    </Grid>
  )
}
