import Box from "@mui/material/Box";
import { Fragment, ReactNode } from "react";
import Header from "./Header";

// ----------------------------------------------------------------------

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <Header />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          pt: 8,
          overflow: 'hidden'
        }}
      >
        {children}
      </Box>
    </Fragment>
  );
}
