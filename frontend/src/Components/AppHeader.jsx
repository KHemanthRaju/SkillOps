import React from "react";
import { Grid, AppBar, Typography, Box } from "@mui/material";
import Logo from "../Assets/header_logo.svg";
import Switch from "./Switch.jsx";
import ModeToggle from "./ModeToggle.jsx";
import SparkyAvatar from "./SparkyAvatar.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import { ALLOW_MULTLINGUAL_TOGGLE } from "../utilities/constants";
import { useTheme } from '../utilities/ThemeContext';

function AppHeader({ showSwitch }) {
  const { isSparkyTheme } = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: (theme) => theme.palette.background.header,
        height: "5rem",
        boxShadow: "none",
        borderBottom: (theme) => `1.5px solid ${theme.palette.primary[50]}`,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: "0 3rem" }}
        className="appHeight100"
      >
        <Grid item>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isSparkyTheme ? (
                <SparkyAvatar size={40} animate={true} />
              ) : (
                <Box sx={{ fontSize: '2.5rem' }}>⚙️</Box>
              )}
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: isSparkyTheme ? '#8C1D40' : '#2196F3' }}>
                SkillOps
              </Typography>
            </Box>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              Expert DevOps Guidance
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" justifyContent="space-evenly" spacing={2}>
            <Grid item>
              <ModeToggle />
            </Grid>
            <Grid item>
              <ThemeToggle />
            </Grid>
            <Grid item sx={{ display: ALLOW_MULTLINGUAL_TOGGLE && showSwitch ? "flex" : "none" }}>
              <Switch />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default AppHeader;
