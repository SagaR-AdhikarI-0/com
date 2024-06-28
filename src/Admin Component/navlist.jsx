import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from '@mui/icons-material/Inventory';
export const lists = [
  {
    icon: <HomeIcon fontSize="large" />,
    title: "Home",
    link: "",
  },
  {
    icon:<InventoryIcon fontSize="large"/> ,
    title: "Orders",
    link: "orders",
  },
  { icon: <AddIcon fontSize="large" />, title: "Add Item", link: "addnewItem" },
  {
    icon: <GroupIcon fontSize="large" />,
    title: "Contacts",
    link: "contacts",
  },


];
