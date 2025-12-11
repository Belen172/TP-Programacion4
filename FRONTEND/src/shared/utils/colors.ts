export const chartColors = [
  "#6A994E", 
  "#386641", 
  "#A7C957", 
  "#F2E8CF", 
  "#BC4749", 
  "#4C72B0", 
  "#DD8452", 
  "#55A868", 
  "#C44E52", 
  "#8172B2", 
];

// Devuelve el color según el índice
export const getColor = (index: number) =>
  chartColors[index % chartColors.length];

