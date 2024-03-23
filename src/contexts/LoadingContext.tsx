import { Backdrop, CircularProgress } from "@mui/material";
import { Fragment, ReactNode, createContext, useState } from "react";

interface LoadingContextModel {
  openLoading: () => void;
  closeLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextModel>({
  openLoading: () => {},
  closeLoading: () => {},
});

interface ILoadingProviderProps {
  children: ReactNode;
}

export const LoadingComponent = ({ open }: { open: boolean }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="secondary" />
    </Backdrop>
  );
};

export function LoadingProvider({ children }: ILoadingProviderProps) {
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const openLoading = () => {
    setShowLoading(true);
  };
  const closeLoading = () => {
    setShowLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{
        openLoading,
        closeLoading,
      }}
    >
      <Fragment>
        {showLoading && (
          <LoadingComponent open={showLoading} />
        )}
        {children}
      </Fragment>
    </LoadingContext.Provider>
  );
}
