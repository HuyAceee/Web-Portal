import { Fragment, useContext, useEffect } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";

import { RouterLink } from "routes/components";
import { usePathname } from "routes/hooks";

import { useResponsive } from "hooks/useResponsive";

import Logo from "components/Logo";
import Scrollbar from "components/Scrollbar";

import { routerAdmin, routerUser } from "constant/routerConfig";
import { AuthContext } from "contexts/AuthContext";
import { NAV } from "./ConfigLayout";
import { convertImageUrl, isAdmin } from "utils/common";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }: any) {
  const pathname = usePathname();
  const { userInfo } = useContext(AuthContext);
  const upLg = useResponsive("up", "lg");

  const navConfig = isAdmin(userInfo.role) ? routerAdmin : routerUser;

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={convertImageUrl(userInfo.imageUrl)} alt={userInfo.name} />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{userInfo.name}</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {userInfo.role}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig
        ?.filter((nav) => !nav.isHiddenMenu)
        .map((item) => <NavItem key={item.title} item={item} />)}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Fragment>
        <Logo sx={{ mt: 3, ml: 4 }} />

        {renderAccount}

        {renderMenu}

        <Box sx={{ flexGrow: 1 }} />
      </Fragment>
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

function NavItem({ item }: any) {
  const pathname = usePathname();
  const { t } = useTranslation();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: "body2",
        color: "text.secondary",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        ...(active && {
          color: "primary.main",
          fontWeight: "fontWeightSemiBold",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{t(item.title)} </Box>
    </ListItemButton>
  );
}
