import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Modal,
 
  Backdrop,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";


import "./MenuLogin.css";


function MenuLogin(props) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  

  const handleCloseShow = () => {
    setShow(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        startIcon={<Avatar>{props.user[0]}</Avatar>}
      >
        {props.user}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: "100" }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem>
                    <span style={{ marginTop: "15px" }}>
                      

                      <Modal
                      className='modal-lg'
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        // className={classes.modal}
                        open={show}
                        onClose={handleCloseShow}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                      </Modal>
                    </span>
                  </MenuItem>
                  
                  <MenuItem onClick={props.logout} className="text-de">Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default MenuLogin;
