"use client";

import { useState } from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import theme from "../../theme";

function TopBar() {
  const pages = ["Collections", "Watch List", "Alerts"];

  let initialWallets: any[] | (() => any[]) = [];
  
  if (typeof window !== 'undefined') {
    const walletsString = localStorage.getItem("wallets");
    initialWallets = walletsString ? walletsString.split(",") : [];
  }

  const [wallets, setWallets] = useState(initialWallets);
  const [newWallet, setNewWallet] = useState("");
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAddWallet = () => {
    const updatedWallets = [...wallets, newWallet];
    setWallets(updatedWallets);
    if (typeof window !== 'undefined') {
      localStorage.setItem("wallets", updatedWallets.join(","));
    }
    setNewWallet("");
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="sticky"
        color="primary"
        style={{
          backgroundColor: theme.palette.background.default,
          color: "white",
          boxShadow: "none",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            margin: "0",
            minWidth: "100%",
            padding: "0",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 5,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              OrdiTrack
            </Typography>

            <Box
              sx={{
                display: { xs: "flex", md: "flex" },
                justifyContent: "space-evenly",
              }}
            >
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "flex" },
                  mt: "45px",
                  justifyContent: "center",
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
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
              OrdiTrack
            </Typography>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "space-around",
                alignItems: "center",
                minWidth: "80%",
                m: "0 30px 0 0",
              }}
            >
              {pages.map((page) => (
                <Paper
                  elevation={0}
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    padding: "1%",
                    flexGrow: 1,
                    m: 0,
                    color: "white",
                    display: "block",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    boxShadow: "none",
                    position: "relative", // Added for positioning the glowing effect
                    "&:hover": {
                      borderBottom: "2px solid #6a67c9",
                      "& p": {
                        textShadow: "0 0 20px #6a67c9", // Increased intensity of text shadow
                        color: "#C5C2F1",
                        fontSize: "16.2px",
                        fontWeight: "700", // Change text color on hover
                      },
                    },
                    "&:active": {
                      borderBottom: "2px solid #6a67c9", // Border bottom stays upon click
                    },
                  }}
                >
                  <p
                    style={{
                      textAlign: "center",
                      margin: 0,
                      transition: "text-shadow 0.3s ease, color 0.3s ease", // Added transition for text shadow and color
                    }}
                  >
                    {page}
                  </p>
                </Paper>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open wallets">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="User"
                    src="/images/wallet.png"
                    sx={{
                      width: 70,
                      height: 70,
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                  }}
                >
                  <TextField
                    label="New Wallet"
                    value={newWallet}
                    onChange={(e) => setNewWallet(e.target.value)}
                  />
                  <Button
                    onClick={handleAddWallet}
                    sx={{
                      mt: 2,
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      width: "100%",
                      "&:hover": {
                        boxShadow: "0px 0px 10px 0px rgba(106, 103, 201, 0.5)",
                        textDecorationColor: "white",
                      },
                    }}
                  >
                    <p
                      style={{
                        color: "#6a67c9",
                        fontWeight: 700,
                        padding: "0",
                        margin: "0",
                      }}
                    >
                      ADD WALLET
                    </p>
                  </Button>
                </Box>
                {wallets.map((wallet_id) => (
                  <MenuItem key={wallet_id} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{wallet_id}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default TopBar;
