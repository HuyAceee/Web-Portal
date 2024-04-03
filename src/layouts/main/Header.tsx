import { Avatar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "contexts/AuthContext";
import { useResponsive } from "hooks/useResponsive";
import { HEADER, NAV } from "layouts/dashboard/ConfigLayout";
import { useContext } from "react";
import { bgBlur } from "theme/css";
import { convertImageUrl } from "utils/common";

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();
  const { userInfo } = useContext(AuthContext);

  const renderContent = (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Avatar src={convertImageUrl(userInfo.imageUrl)} />
    </Stack>
  );

  return (
    <AppBar
      sx={
        {
          boxShadow: "none",
          height: HEADER.H_MOBILE,
          zIndex: theme.zIndex.appBar + 1,
          ...bgBlur({
            color: theme.palette.background.default,
          }),
          transition: theme.transitions.create(["height"], {
            duration: theme.transitions.duration.shorter,
          }),
        } as any
      }
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
          backdropFilter: "blur(20px)",
          justifyContent: 'flex-end'
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
