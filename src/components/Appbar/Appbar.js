import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Login_Button from "../Login/Login_Button";
import Menu from "../Menu/Menu";
import MenuLogin from "../MenuLogin/MenuLogin";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    minWidth: "300px",
  },
}));

export default function Appbar(props) {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              setOpenDrawer(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <div className="m-auto">
            <div className="d-flex">
              {props.user ? (
                <MenuLogin user={props.user} logout={props.logout} />
              ) : (
                <Login_Button loginSuccess={props.loginSuccess} />
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={"left"}
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        <Menu />
      </Drawer>
    </div>
  );
}
