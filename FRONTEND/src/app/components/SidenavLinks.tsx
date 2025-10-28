import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Collapse,
  Divider,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import SettingsIcon from "@mui/icons-material/Settings";
import PublicIcon from "@mui/icons-material/Public";
import CategoryIcon from "@mui/icons-material/Category";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  handleClick?: () => void;
}

export default function SidenavLinks({ handleClick }: Props) {
  const [openAdmin, setOpenAdmin] = React.useState(true);

  const handleToggleAdmin = () => setOpenAdmin((prev) => !prev);

  return (
    <>
      <List>
        <ListItemButton
          component={RouterLink}
          to="/recetas"
          onClick={handleClick}
        >
          <ListItemIcon>
            <RestaurantMenuIcon />
          </ListItemIcon>
          <ListItemText primary="Ver Recetas" />
        </ListItemButton>
      </List>

      <Divider sx={{ my: 1 }} />

      <List>
        <ListItemButton onClick={handleToggleAdmin}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Administración" />
          {openAdmin ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openAdmin} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton
              component={RouterLink}
              to="/admin/recetas"
              onClick={handleClick}
            >
              <ListItemIcon>
                <RestaurantMenuIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Recetas" />
            </ListItemButton>

            <ListItemButton
              component={RouterLink}
              to="/admin/paises"
              onClick={handleClick}
            >
              <ListItemIcon>
                <PublicIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Países" />
            </ListItemButton>

            <ListItemButton
              component={RouterLink}
              to="/admin/categorias"
              onClick={handleClick}
            >
              <ListItemIcon>
                <CategoryIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Categorías" />
            </ListItemButton>

            <ListItemButton
              component={RouterLink}
              to="/admin/ingredientes"
              onClick={handleClick}
            >
              <ListItemIcon>
                <LocalDiningIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Ingredientes" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </>
  );
}