import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

interface PostSortProps {
  options: any[]
  onSort?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => void
}

export default function PostSort({ options, onSort }: PostSortProps) {
  return (
    <TextField select size="small" value="latest" onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
