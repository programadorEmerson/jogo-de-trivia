import React from "react";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";

import { useSelector } from "react-redux";
import { userGravatarUrl } from "../../services/api";
import { AppBar } from "@mui/material";

const Header = () => {
  const { playerName, email } = useSelector((state) => ({ ...state.player }));

  return (
    <AppBar
      sx={{ borderBottom: "1px solid #e0e0e0" }}
      position="static"
      color="secondary"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TRIVIA
          </Typography>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />
          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                marginRight: "0.5rem",
              }}
            >
              <Typography
                variant="caption"
                gutterBottom
                component="div"
                sx={{ padding: "0", margin: "0" }}
              >
                {playerName}
              </Typography>
              <Typography
                variant="caption"
                gutterBottom
                component="div"
                sx={{ padding: "0", margin: "0" }}
              >
                {email}
              </Typography>
            </div>
            <Tooltip title={playerName}>
              <Avatar alt={playerName} src={userGravatarUrl(email)} />
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
