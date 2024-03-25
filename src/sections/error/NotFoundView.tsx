import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { RouterLink } from 'routes/components';
import Logo from 'components/Logo';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function NotFoundView() {
  const { t } = useTranslation()

  return (
    <>
      <Container>
        <Box
          sx={{
            py: 12,
            maxWidth: 480,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            {t("error.notFound.title")}
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            {t("error.notFound.description")}
          </Typography>

          <Box
            component="img"
            src="/assets/illustrations/illustration_404.svg"
            sx={{
              mx: 'auto',
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />

          <Button href="/" size="large" variant="contained" component={RouterLink}>
            {t("error.notFound.toHome")}
          </Button>
        </Box>
      </Container>
    </>
  );
}
