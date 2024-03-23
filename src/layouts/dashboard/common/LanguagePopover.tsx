import { useState } from 'react';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useStorage } from 'hooks/useStorage';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/ic_flag_en.svg',
  },
  {
    value: 'ru',
    label: 'Rusia',
    icon: '/assets/icons/ic_flag_ru.svg',
  }
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(null);
  const [language, setLanguage] = useStorage<string>('i18nextLng')

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChangeLanguage = (value: string) => {
    setLanguage(value)
    i18n.changeLanguage(value)
    handleClose()
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open ? {
            bgcolor: 'action.selected',
          } : {}),
        }}
      >
        <img src={LANGS.find((l) => l.value === language)?.icon ?? LANGS[0].icon} alt="language" />
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 180,
          },
        }}
      >
        {LANGS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === language}
            onClick={() => handleChangeLanguage(option.value)}
            sx={{ typography: 'body2', py: 1 }}
          >
            <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}
