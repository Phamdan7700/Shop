import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import NextLink from "next/link";
import { useRouter } from "next/dist/client/router";
import { Container } from "@mui/material";


interface LinkTabProps {
  label?: string;
  href?: string;
  path: string
}

function LinkTab(props: LinkTabProps) {
  const router = useRouter();

  return (
    <Tab
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

    <Container maxWidth='lg'>
      <Box sx={{ width: "50%" }} >
        <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
          <LinkTab label="Trang chủ" path="/" />
          <LinkTab label="Sản Phẩm" path="/product" />
          <LinkTab label="Cart" path="/cart" />
        </Tabs>
      </Box>
    </Container>


  );
}
