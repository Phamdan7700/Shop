import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { border } from "@mui/system";
import { useRouter } from "next/dist/client/router";
import React from "react";


interface LinkTabProps {
  label?: string;
  href?: string;
  path: string
}

function LinkTab(props: LinkTabProps) {
  const router = useRouter();

  return (
    <Tab sx={{fontWeight: 'bold'}}
      component={'a'}
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        router.push(props.path)
      }}
      {...props}
    />
  );
}

export default function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (

    <Box sx={{ flex: 1 }} >
      <Tabs value={value} onChange={handleChange} centered aria-label="nav tabs example">
        <LinkTab label="Trang chủ" path="/" />
        <LinkTab label="Sản Phẩm" path="/product" />
        <LinkTab label="Cart" path="/cart" />
      </Tabs>
    </Box>

  );
}
