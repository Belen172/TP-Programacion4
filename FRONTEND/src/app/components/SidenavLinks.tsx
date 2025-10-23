import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import * as React from "react";
import { NavLink, useLocation } from "react-router";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const SidenavLink = ({
                         to,
                         icon,
                         label,
                         onClick,
                     }: {
    to: string;
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}) => {
    const location = useLocation();
    const selected = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
    return (
        <ListItemButton
            component={NavLink}
            to={to}
            onClick={onClick}
            selected={selected}
            sx={{ borderRadius: 1, mb: 0.5 }}
        >
            <ListItemIcon sx={{ minWidth: 36 }}>{icon}</ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    );
};

interface SidenavLinksProps {
    handleClick: () => void;
}

/*
*  Links que se muestran en el sidebar.
* */
export default function SidenavLinks(props: SidenavLinksProps) {
    return (
        <>
            <SidenavLink to="/" icon={<DashboardOutlinedIcon />} label="Dashboard" onClick={props.handleClick} />
            <SidenavLink to="/products" icon={<Inventory2OutlinedIcon />} label="ProductosPage" onClick={props.handleClick} />
            <SidenavLink to="/comentarios" icon={<CommentOutlinedIcon />} label="Comentarios" onClick={props.handleClick} />
            <SidenavLink to="/users" icon={<PeopleAltOutlinedIcon />} label="Usuarios" onClick={props.handleClick} />
            <SidenavLink to="/reports" icon={<BarChartOutlinedIcon />} label="Reportes" onClick={props.handleClick} />
            <SidenavLink to="/settings" icon={<SettingsOutlinedIcon />} label="Configuración" onClick={props.handleClick} />
        </>
    )
}

