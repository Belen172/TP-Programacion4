import * as React from "react";
import {
    AppBar, Avatar, Box, Divider, Drawer, IconButton, List, Menu, MenuItem, Toolbar, Typography, useMediaQuery
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Outlet } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SidenavLinks from '../components/SidenavLinks.tsx'

const DRAWER_WIDTH = 280;

const Main = styled("main")(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    minHeight: "100dvh",
    background: theme.palette.mode === "light" ? "#fafafa" : theme.palette.background.default,
}));

export default function AppLayout() {
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up("md"));
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleDrawerToggle = () => setMobileOpen((p) => !p);

    const handleClickSidenav = () => !mdUp ? handleDrawerToggle : undefined;

    const drawer = (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 32, height: 32, borderRadius: 1, bgcolor: "primary.main" }} />
                <Typography variant="h6" fontWeight={700}>
                    Admin
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 1, flex: 1, overflow: "auto" }}>
                <List component="nav">
                    <SidenavLinks handleClick={handleClickSidenav} />
                </List>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} UTN FRRa
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>
            {/* TOP BAR */}
            <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1, bgcolor: "background.paper", color: "text.primary" }}>
                <Toolbar sx={{ gap: 1 }}>
                    {!mdUp && (
                        <IconButton edge="start" aria-label="open drawer" onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Typography variant="h6" noWrap component="div">
                        Internal Admin
                    </Typography>

                    <Box sx={{ flex: 1 }} />

                    <IconButton aria-label="notifications" sx={{ ml: 0.5 }}>
                        <NotificationsNoneOutlinedIcon />
                    </IconButton>

                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: 0.5 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>LF</Avatar>
                    </IconButton>

                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                        <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
                        <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* SIDENAV */}
            {mdUp ? (
                <Drawer
                    variant="permanent"
                    sx={{
                        width: DRAWER_WIDTH,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box" },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            ) : (
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{ "& .MuiDrawer-paper": { width: DRAWER_WIDTH } }}
                >
                    {drawer}
                </Drawer>
            )}

            {/* CONTENT */}
            <Main>
                {/* pushes content below AppBar */}
                <Toolbar />
                <Box sx={{ mb: 2 }}>
                    {/*<RouterBreadcrumbs />*/}
                </Box>
                <Outlet />
            </Main>
        </Box>
    );
}
