import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Container, styled } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { DETAIL_NOTIFICATION } from "constant/router";
import { AuthContext } from "contexts/AuthContext";
import type { NotificationModel } from "models/view/notification";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "routes/hooks";
import { convertImageUrl } from "utils/common";

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

interface NotificationInfoProps {
  selectedFile: any;
  setSelectedFile: Dispatch<SetStateAction<undefined>>;
  defaultData?: NotificationModel;
}

export function NotificationInfo({
  selectedFile,
  setSelectedFile,
  defaultData,
}: NotificationInfoProps): React.JSX.Element {
  const { t } = useTranslation();
  const pathname = usePathname();

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

  return (
    <Card>
      <CardContent>
        <Stack sx={{ alignItems: "center" }}>
          <Container
            component={"img"}
            src={preview ?? convertImageUrl(defaultData?.imageUrl ?? "")}
            sx={{
              height: "auto",
              width: "100%",
              minHeight: "200px",
              paddingLeft: "0 !important",
              paddingRight: "0 !important",
            }}
          />
        </Stack>
      </CardContent>
      <Divider />
      {pathname !== DETAIL_NOTIFICATION && (
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
      )}
    </Card>
  );
}
