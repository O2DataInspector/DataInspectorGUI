import * as React from "react";
import * as Redux from "react-redux";
import Axios from "axios";
import { Store } from "redux";
import State, { Device, Message } from "store/state";
import { setMessages } from "store/actions";
import {
  selectAddress,
  selectSelectedDevices,
  selectLastMessageId,
} from "store/selectors";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import RefreshIcon from "@mui/icons-material/Refresh";

const options = ["Next", "Next 10", "Next 100"];
const parameters = [1, 10, 100];

export default function UpdateButtons() {
  const store = Redux.useStore() as Store<State>;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  //REFACTOR ME
  function onRefresh() {
    const address = selectAddress(store.getState());
    const selectedDevices = selectSelectedDevices(store.getState());
    const lastMessageId = selectLastMessageId(store.getState());
    Axios.get(address + "/messages/newer", {
      headers: {
        devices: selectedDevices.map((device) => device.name).join(","),
        id: lastMessageId ? lastMessageId : 0,
      },
    })
      .then((response) => {
        if (response.data.messages) {
          console.log(response.data.messages);
          store.dispatch(setMessages(response.data.messages));
        }
      })
      .catch((error) => {
        alert("Failed to refresh the messages: " + error);
      });
  }

  function onStep() {
    const address = selectAddress(store.getState());
    const selectedDevices = selectSelectedDevices(store.getState());
    const lastMessageId = selectLastMessageId(store.getState());
    Axios.get(address + "/messages/newer", {
      headers: {
        devices: selectedDevices.map((device) => device.name).join(","),
        id: lastMessageId ? lastMessageId : 0,
        count: parameters[selectedIndex],
      },
    })
      .then((response) => {
        if (response.data.messages) {
          console.log(response.data.messages);
          store.dispatch(setMessages(response.data.messages));
        }
      })
      .catch((error) => {
        alert("Failed to refresh the messages: " + error);
      });
  }

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack
      direction="row-reverse"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={2}
      sx={{ position: "absolute", top: "10%", right: "2.5%" }}
    >
      <RefreshIcon
        onClick={onRefresh}
        sx={{fontSize: "3em"}}
      />
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={onStep}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
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
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  );
}
