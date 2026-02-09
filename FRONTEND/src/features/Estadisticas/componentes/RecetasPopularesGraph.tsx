import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { List, ListItem, ListItemText } from "@mui/material";
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function RecetasPopularesGraph({ data }: { data: { label: string, value: number }[];}) {
  return (
    <List>
      {data.map((item, index) => (
        <ListItem key={index} >
          <ListItemText primary={index+1 + " - "  + item.label} sx={{ width: '80%' }} />
          <ListItemText primary={"Vistas: "  + item.value}  sx={{ width: '20%' }}/>
        </ListItem>
      ))}
    </List>
  );
} 