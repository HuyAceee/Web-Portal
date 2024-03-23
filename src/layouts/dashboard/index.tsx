import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Nav from "./Nav";
import Main from "./main";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE } from "constant/router";
import { handleLocalStorage } from "utils/localStorage";

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }: any) {
  const { getLocalStorage } = handleLocalStorage();
  const accessToken = getLocalStorage("accessToken");
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) navigate(LOGIN_PAGE);
  }, []);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}
