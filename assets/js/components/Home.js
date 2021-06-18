import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAll } from "../actions/urlActions";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Socket } from "phoenix";

import { makeStyles } from "@material-ui/core/styles";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    width: 650,
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
}));

//socket code
let socket = new Socket("/socket", { params: { token: window.userToken } });
socket.connect();
let channel = socket.channel("server:update", {});
channel
  .join()
  .receive("ok", (resp) => {
    console.log("Joined successfully", resp);
  })
  .receive("error", (resp) => {
    console.log("Unable to join", resp);
  });

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const getUrl = useSelector((state) => state.getUrl);
  console.log(getUrl.urls);
  let now = new Date();
  useEffect(() => {
    dispatch(listAll());
    channel.on("new_data", (msg) => {
      dispatch(listAll());
    });
  }, [dispatch]);

  const convert = (date) => {
    let localdate = new Date(date);
    let hrs = localdate.getHours();
    let mins = localdate.getMinutes();
    let secs = localdate.getSeconds();

    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Server</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getUrl.urls.map((url) => (
            <TableRow key={url.id}>
              <TableCell component="th" scope="row">
                {url.url}
              </TableCell>
              <TableCell component="th" scope="row">
                {url.is_active ? (
                  <FiberManualRecordIcon className={classes.active} />
                ) : (
                  <FiberManualRecordIcon className={classes.inActive} />
                )}
              </TableCell>
              <TableCell>{convert(url.updated_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default Home;
