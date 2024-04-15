import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { fDate, formatDate_YYYY_MM_DD } from "utils/formatTime";
import { fShortenNumber } from "utils/formatNumber";
import SvgColor from "components/SvgColor";
import Iconify from "components/Iconify";
import { Grow, Paper, Tooltip } from "@mui/material";
import type { NotificationModel } from "models/view/notification";
import { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import { convertImageUrl } from "utils/common";

// ----------------------------------------------------------------------

interface PostCardProps {
  post: NotificationModel;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  const { userInfo } = useContext(AuthContext);
  const { description, endDate, imageUrl, startDate, title } = post;

  const latestPostLarge = index === 0;

  const latestPost = index === 1 || index === 2;

  const renderAvatar = (
    <Tooltip title={userInfo.name} aria-label="add">
      <Avatar
        alt={userInfo.name}
        src={convertImageUrl(userInfo.imageUrl)}
        sx={{
          zIndex: 9,
          width: 32,
          height: 32,
          position: "absolute",
          left: (theme) => theme.spacing(3),
          bottom: (theme) => theme.spacing(-2),
          ...((latestPostLarge || latestPost) && {
            zIndex: 9,
            top: 24,
            left: 24,
            width: 40,
            height: 40,
          }),
        }}
      />
    </Tooltip>
  );

  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 120,
        overflow: "hidden",
        WebkitLineClamp: 2,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        ...(latestPostLarge && { typography: "h5", height: 120 }),
        ...((latestPostLarge || latestPost) && {
          color: "common.white",
        }),
      }}
    >
      {title}
    </Link>
  );

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      sx={{
        color: "text.disabled",
      }}
    >
      <Typography variant="caption">{description}</Typography>
    </Stack>
  );

  const renderCover = (
    <Box
      component="img"
      alt={title}
      src={convertImageUrl(imageUrl)}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: "cover",
        position: "absolute",
      }}
    />
  );

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        color: "text.disabled",
        ...((latestPostLarge || latestPost) && {
          opacity: 0.48,
          color: "common.white",
        }),
      }}
    >
      {formatDate_YYYY_MM_DD(startDate) + " - " + formatDate_YYYY_MM_DD(endDate)}
    </Typography>
  );

  const renderShape = (
    <SvgColor
      color="paper"
      src="/assets/icons/shape-avatar.svg"
      sx={{
        width: 80,
        height: 36,
        zIndex: 9,
        bottom: -15,
        position: "absolute",
        color: "background.paper",
        ...((latestPostLarge || latestPost) && { display: "none" }),
      }}
    />
  );

  return (
    <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Grow in timeout={1000 + index * 200}>
        <Paper>
          <Card>
            <Box
              sx={{
                position: "relative",
                pt: "calc(100% * 3 / 4)",
                ...((latestPostLarge || latestPost) && {
                  pt: "calc(100% * 4 / 3)",
                  "&:after": {
                    top: 0,
                    content: "''",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                  },
                }),
                ...(latestPostLarge && {
                  pt: {
                    xs: "calc(100% * 4 / 3)",
                    sm: "calc(100% * 3 / 4.66)",
                  },
                }),
              }}
            >
              {renderShape}

              {/* {renderAvatar} */}

              {renderCover}
            </Box>

            <Box
              sx={{
                p: (theme) => theme.spacing(4, 3, 3, 3),
                ...((latestPostLarge || latestPost) && {
                  width: 1,
                  bottom: 0,
                  position: "absolute",
                }),
              }}
            >
              {renderDate}

              {renderTitle}

              {renderInfo}
            </Box>
          </Card>
        </Paper>
      </Grow>
    </Grid>
  );
}
