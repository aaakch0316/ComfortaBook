import * as React from "react";
import { Grid, TextField, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    background: "#f3e5f5",
    height: "100vh",
    width: "100vw",
  },
  login: {
    background: "#e1bee7",
    height: "50vh",
    width: "60vw",
  },
  form: {
    height: "100%",
  },
  formGrid: {
    height: "100%",
    padding: "0 20%",
  },
  Button: {
    background: "#ba68c8",
    color: "white",
    fontWeight: 200,
  },
  emailcheck: {
    background: "#ba68c8",
    color: "white",
    fontWeight: 200,
  },
  inputfield: {
    border: "#ba68c8 !important",
  },
});

function Loginpage() {
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      justify="center"
      alignItems="center"
    >
      <Box className={classes.login} borderRadius={10}>
        <form className={classes.form}>
          <Grid
            container
            className={classes.formGrid}
            justify="space-evenly"
            direction="column"
          >
            <Grid container justify="flex-start" spacing={1}>
              <Grid item>
                <TextField
                  className={classes.inputfield}
                  label="email"
                ></TextField>
              </Grid>
              <Grid item>
                <Button size="small" className={classes.emailcheck}>
                  중복확인
                </Button>
              </Grid>
            </Grid>
            <TextField label="password" type="password"></TextField>
            <TextField label="password confirm" type="password"></TextField>
            <TextField label="이름"></TextField>
            <TextField label="전화번호"></TextField>
            <div>
              <Button className={classes.Button} variant="contained">
                회원가입
              </Button>
            </div>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
}

export default Loginpage;
