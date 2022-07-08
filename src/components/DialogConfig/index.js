import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useDispatch } from "react-redux";
import { Settings } from "@mui/icons-material";
import { Autocomplete, Box, TextField } from "@mui/material";
import { returnCategories, returnDifficulty } from "./categories";
import logo from "../../assets/logo.png";

import { CustomStack } from "../../styles/Shared";
import { AlertNotification } from "../AlertNotification";
import { setSearchParams } from "../../redux/actons";

const emails = ["username@gmail.com", "user02@gmail.com"];

const PopUspDialog = (props) => {
  const { onClose, selectedValue, open } = props;

  const dispatch = useDispatch();

  const handleClose = () => onClose(selectedValue);

  const handleSelectValue = (type, value) => {
    let codeSelected = "";
    let message = "";
    switch (type) {
      case "category":
        if (Boolean(value)) {
          codeSelected = returnCategories().find(
            (category) => category.value === value
          ).code;
          message = `Categoria: ${value}`;
        } else {
          codeSelected = "";
          message = "Categoria default (Todas)";
        }
        break;
      case "difficulty":
        if (Boolean(value)) {
          codeSelected = returnDifficulty().find(
            (category) => category.value === value
          ).code;
          message = `Dificuldade: ${value}`;
        } else {
          codeSelected = "";
          message = "Dificuldade default (Easy)";
        }
        break;
      default:
        message = ``;
        break;
    }
    AlertNotification({
      type: "success",
      message: `${message}`,
    });
    dispatch(setSearchParams({ [type]: Boolean(value) ? codeSelected : "" }));
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ height: "400px" }}>
        <DialogTitle>Como vamos jogar?</DialogTitle>
        <CustomStack sx={{ padding: "1rem" }} spacing={2}>
          <Autocomplete
            disablePortal
            id="category"
            options={returnCategories()
              .sort((a, b) => (a.value > b.value ? 1 : -1))
              .map((item) => item.value)}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField name="category" {...params} label="Categoria" />
            )}
            onInputChange={(_, value, reason) => {
              if (reason === "clear") {
                handleSelectValue("category", "");
              }
              if (reason === "reset") {
                handleSelectValue("category", value);
              }
            }}
          />
          <Autocomplete
            disablePortal
            id="difficulty"
            options={returnDifficulty()
              .sort((a, b) => (a.value > b.value ? 1 : -1))
              .map((item) => item.value)}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField name="difficulty" {...params} label="Dificuldade" />
            )}
            onInputChange={(_, value, reason) => {
              if (reason === "clear") {
                handleSelectValue("difficulty", "");
              }
              if (reason === "reset") {
                handleSelectValue("difficulty", value);
              }
            }}
          />
          <img
            src={logo}
            alt="logo do jogo da trivia"
            width={200}
            style={{ marginTop: "3.5rem" }}
          />
        </CustomStack>
      </Box>
    </Dialog>
  );
};

PopUspDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export const ButtonSettings = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Fragment>
      <Button
        fullWidth
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<Settings />}
      >
        Configurações
      </Button>
      <PopUspDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </Fragment>
  );
};
