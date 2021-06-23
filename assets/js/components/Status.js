import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAll } from "../actions/urlActions";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

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

const Status = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const list = useSelector((state) => state.getUrl.urls);
  console.log("redux state................", list);
  const [data, setData] = useState(list);
  useEffect(() => {
    dispatch(listAll());
  }, [dispatch]);
  useEffect(() => {
    setData(list);
  }, [list]);

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
            <TableCell>Code</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((url) => (
            <TableRow key={url.id}>
              <TableCell component="th" scope="row">
                {url.url}
              </TableCell>
              <TableCell component="th" scope="row">
                {url.status_code}
              </TableCell>
              <TableCell component="th" scope="row">
                {url.status_code === 500 || url.status_code === 404 ? (
                  <FiberManualRecordIcon className={classes.inActive} />
                ) : (
                  <FiberManualRecordIcon className={classes.active} />
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
export default Status;
