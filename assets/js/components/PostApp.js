import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Typography,
  TextField,
  Paper,
  Grid,
  MenuItem,
  Button,
} from "@material-ui/core";

import { addApp } from "../actions/appActions";
import { setAlert } from "../actions/alertActions";
const useStyles = makeStyles((theme) => ({
  container: {
    margin: 20,
    maxWidth: 650,
  },
  header: {
    fontFamily: "cursive",
    color: theme.palette.info.light,
  },

  head: {
    marginBottom: 40,
  },
  submitBtn: {
    backgroundColor: theme.palette.info.light,
    color: "white",
    "&:hover": {
      background: theme.palette.success.light,
    },
  },
}));

const status = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "inActive",
    label: "inActive",
  },
];

const PostApp = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    title: "",
    body: "",
    url: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (key, data) => {
    setDetails({
      ...details,
      [key]: data.value,
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////
  //validation code//

  const handleValidation = () => {
    let fields = details;
    let errors = {};
    let formIsValid = true;
    if (!fields["title"]) {
      formIsValid = false;
      errors["title"] = "Title Field Cannot be empty";
    }
    if (!fields["body"]) {
      formIsValid = false;
      errors["body"] = "Body Field Cannot be empty";
    }
    if (!fields["status"]) {
      formIsValid = false;
      errors["status"] = "Select one of the options";
    }
    if (!fields["url"]) {
      formIsValid = false;
      errors["url"] = "Url Field Cannot be empty";
    }
    setErrors(errors);
    return formIsValid;
  };

  ////////////////////////////////////////////////////////////////////////////////////
  const postAppSubmit = (details) => {
    dispatch(addApp({ app: details }));

    setDetails({
      title: "",
      body: "",
      url: "",
      status: "",
    });
    setErrors({});
  };

  return (
    <div component={Paper} className={classes.container}>
      <div className={classes.head}>
        <Typography className={classes.header} variant="h3">
          App Form
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
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>

          <Grid item sm={6}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={details.status}
              onChange={(e) =>
                handleChange("status", { value: e.target.value })
              }
              error={!!errors.status}
              helperText={errors.status}
              variant="outlined"
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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
              error={!!errors.url}
              helperText={errors.url}
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
              error={!!errors.body}
              helperText={errors.body}
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
                if (handleValidation()) {
                  postAppSubmit(details);
                  history.push("/");
                } else {
                  dispatch(setAlert("Fill All The Fields", "error"));
                }
              }}
            >
              Add App
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
export default PostApp;
