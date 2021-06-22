import { Grid,Button } from '@material-ui/core';
import React from 'react'
import { Link as RouterLink } from "react-router-dom";

 const Home = () => {
    return (
       <Grid container spacing={3}>
           <Grid item sm={6}>
           <Button
       id="url-input"
      variant="contained"
      
       to={`/status`} component={RouterLink} >
              Add  App
            </Button>
           </Grid>
           <Grid item sm={6}>
           <Button
       id="url-input"
      variant="contained"
       
       to={`/status`} component={RouterLink} >
              Check Status of Apps
            </Button>
           </Grid>
       </Grid>
    )
}
export default Home;
