import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  FormControl,
  Typography,
  TextField,
  Paper,
  Grid,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  Button,
} from "@material-ui/core";

import { addApp } from "../actions/appActions";
const useStyles = makeStyles({
  container: {
    margin: 20,
    maxWidth: 650,
  },
  header: {
    fontFamily: "cursive",
    color: "#8B008B",
  },

  head: {
    marginBottom: 40,
  },
  submitBtn: {
    backgroundColor: "#8B008B",
    color: "white",
  },
});

const PostApp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    title: "",
    body: "",
    url: "",
    status: "",
  });
  const handleChange = (key, data) => {
    setDetails({
      ...details,
      [key]: data.value,
    });
  };
  const postAppSubmit = (details) => {
    dispatch(addApp({ app: details }));
  };

  return (
    <div component={Paper} className={classes.container}>
      <div className={classes.head}>
        <Typography className={classes.header} variant="h3">
          Available Apps
        </Typography>
      </div>
      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item sm={6}>
            <TextField
              label="Enter Title of App"
              fullWidth
              variant="outlined"
              value={details.title}
              name="title"
              onChange={(e) => handleChange("title", { value: e.target.value })}
            />
          </Grid>

          <Grid item sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={details.status}
                name="status"
                label="Status"
                onChange={(e) =>
                  handleChange("status", { value: e.target.value })
                }
              >
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"inActive"}>inActive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <TextField
              label="Enter a URL"
              fullWidth
              value={details.url}
              variant="outlined"
              onChange={(e) => handleChange("url", { value: e.target.value })}
              name="url"
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="Description"
              fullWidth
              variant="outlined"
              multiline
              value={details.body}
              onChange={(e) => handleChange("body", { value: e.target.value })}
              name="body"
            />
          </Grid>
          <Grid item sm={4}>
            <Button
              id="url-input"
              variant="contained"
              className={classes.submitBtn}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                postAppSubmit(details);
              }}
            >
              Add Server
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
export default PostApp;
