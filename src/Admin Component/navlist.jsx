import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
export const lists = [
  {
    icon: <HomeIcon fontSize="large" />,
    title: "Home",
    link: "",
  },
  {
    icon: <GroupIcon fontSize="large" />,
    title: "Contacts",
    link: "contacts",
  },
  {
    icon: <BarChartIcon fontSize="large" />,
    title: "Analysis",
    link: "analysis",
  },
  {
    icon: <AddShoppingCartIcon fontSize="large" />,
    title: "Admin cart",
    link: "admincart",
  },
  { icon: <AddIcon fontSize="large" />, title: "Add Item", link: "addnewItem" },
];
