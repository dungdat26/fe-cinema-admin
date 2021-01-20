import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
// import SendIcon from '@material-ui/icons/Send';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import { Link } from "react-router-dom";



// import TabsAdd from '../TabsAdd/TabsAdd';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  link: {
    textDecoration: "none",
    color: "coral",
  },
}));

export default function NestedList() {
  const classes = useStyles();
  const [openFilm, setOpenFilm] = React.useState(true);
  const [openAcc, setOpenAcc] = React.useState(false);

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Menu Admin
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={() => setOpenFilm((pre) => !pre)}>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
        {openFilm ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openFilm} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/add-film" className={classes.link}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Thêm Phim" />
            </ListItem>
          </Link>

          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Phim đang chiếu" />
          </ListItem>

          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Phim sắp chiếu" />
          </ListItem>

          <Link to="/all-film" className={classes.link}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Tất cả phim" />
            </ListItem>
          </Link>
        </List>
      </Collapse>

      <ListItem button onClick={() => setOpenAcc((prev) => !prev)}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Nhà sản xuất" />
        {openAcc ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openAcc} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/add-producer">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Thêm nhà sản xuất" />
            </ListItem>
          </Link>
          
          <Link to="/all-producer">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Tất cả nhà sản xuất" />
            </ListItem>
          </Link>
        </List>

        
        <List component="div" disablePadding>
        
          <Link to="/all-actors">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Tất cả diễn viên" />
            </ListItem>
          </Link>
        </List>

        <List component="div" disablePadding>
        
          <Link to="/all-directors">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Tất cả đạo diễn" />
            </ListItem>
          </Link>
        </List>
        
        
      </Collapse>
      
    </List>

    
  );
}
