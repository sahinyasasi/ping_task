import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";

import { listApps, deleteApp } from "../actions/appActions";
const useStyles = makeStyles((theme) => ({
  container: {
    margin: 20,
  },
  table: {
    minWidth: 650,
  },
  tableContainer: {
    margin: 20,
  },
  container: {
    margin: 20,
  },
  active: {
    color: theme.palette.success.main,
  },
  inActive: {
    color: theme.palette.error.main,
  },
  button: {
    color: "white",
    backgroundColor: theme.palette.info.light,
  },
}));
const AllApps = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const getApps = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(listApps());
  }, [dispatch]);
  const handleAppDelete = (id) => {
    dispatch(deleteApp(id));
  };
  return (
    <div className={classes.container}>
      <Grid container spacing={1}>
        <Grid item sm={4}>
          <Button
            id="url-input"
            variant="contained"
            className={classes.button}
            to={`/addApp`}
            component={RouterLink}
          >
            Add App
          </Button>
        </Grid>
        <Grid item sm={4}>
          <Button
            id="url-input"
            variant="contained"
            className={classes.button}
            to={`/status`}
            component={RouterLink}
          >
            Check Status of Apps
          </Button>
        </Grid>
      </Grid>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Url</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getApps.apps.map((app) => (
              <TableRow key={app.id}>
                <TableCell component="th" scope="row">
                  {app.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {app.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  {app.status}
                </TableCell>
                <TableCell>{app.body}</TableCell>
                <TableCell>{app.url}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAppDelete(app.id);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    to={`/app/${app.id}/edit`}
                    component={RouterLink}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default AllApps;
