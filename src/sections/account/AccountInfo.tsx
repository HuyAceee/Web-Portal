import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { convertImageUrl } from "utils/common";
import type { UserInformationModel } from "models/view/user";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface AccountInfoProps {
  selectedFile: any
  setSelectedFile: Dispatch<SetStateAction<undefined>>
  defaultData?: UserInformationModel
}

export function AccountInfo({ selectedFile, setSelectedFile, defaultData = {} as UserInformationModel }: AccountInfoProps): React.JSX.Element {
  const { t } = useTranslation();

  const handleUploadFile = () => {
    document.getElementById("uploadImage")?.click();
  };

  const [preview, setPreview] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: any) => {
    if (!e?.target?.files || e?.target?.files?.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  console.log(convertImageUrl(defaultData?.imageUrl))

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <div>
            <Avatar src={preview ?? convertImageUrl(defaultData?.imageUrl)} sx={{ height: "100px", width: "100px" }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant="h5">{defaultData?.name}</Typography>
            <Typography color="text.secondary" variant="body2">
              {defaultData?.email}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {defaultData?.phoneNumber}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          role={undefined}
          fullWidth
          onClick={handleUploadFile}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          {t("profile.info.upload")}
          <VisuallyHiddenInput
            id="uploadImage"
            type="file"
            accept="image/*"
            onChange={onSelectFile}
          />
        </Button>
      </CardActions>
    </Card>
  );
}
