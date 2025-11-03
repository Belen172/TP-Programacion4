import React from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  handleClick?: () => void;
}

export default function SidenavLinks({ handleClick }: Props) {
  const [openAdmin, setOpenAdmin] = React.useState(false);

  const handleToggleAdmin = () => setOpenAdmin((prev) => !prev);

  return (
    <Box>
      {/* 🌿 LINK PRINCIPAL */}
      <List>
        <ListItemButton
          component={RouterLink}
          to="/recetas"
          onClick={handleClick}
          sx={{
            borderRadius: 2,
            mb: 0.5,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(76, 175, 80, 0.08)", // verde suave
            },
          }}
        >
          <ListItemText
            primary="Ver Recetas"
            primaryTypographyProps={{
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 600,
            }}
          />
        </ListItemButton>
      </List>

      <Divider sx={{ my: 1 }} />

      {/* 🌿 SECCIÓN ADMIN */}
      <List>
        <ListItemButton
          onClick={handleToggleAdmin}
          sx={{
            borderRadius: 2,
            mb: 0.5,
            "&:hover": {
              backgroundColor: "rgba(76, 175, 80, 0.08)",
            },
          }}
        >
          <ListItemText
            primary="Administración"
            primaryTypographyProps={{
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 600,
            }}
          />
          {openAdmin ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openAdmin} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 3 }}>
            {[
              { text: "Recetas", path: "/admin/recetas" },
              { text: "Países", path: "/admin/paises" },
              { text: "Categorías", path: "/admin/categorias" },
              { text: "Ingredientes", path: "/admin/ingredientes" },
            ].map((item) => (
              <ListItemButton
                key={item.text}
                component={RouterLink}
                to={item.path}
                onClick={handleClick}
                sx={{
                  borderRadius: 2,
                  mb: 0.3,
                  pl: 4,
                  "&:hover": {
                    backgroundColor: "rgba(139, 195, 74, 0.1)",
                  },
                }}
              >
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </Box>
  );
}
