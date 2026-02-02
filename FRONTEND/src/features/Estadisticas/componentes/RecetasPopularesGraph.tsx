import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { List, ListItem, ListItemText } from "@mui/material";
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function RecetasPopularesGraph({ data }: { data: { label: string }[];}) {
  return (
    <List>
      {data.map((item, index) => (
        <ListItem key={index}>
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  );
}