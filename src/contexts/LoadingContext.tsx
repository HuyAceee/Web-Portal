import { Backdrop, CircularProgress } from "@mui/material";
import { Fragment, ReactNode, createContext, useState } from "react";

interface LoadingContextModel {
  openLoading: () => void;
  closeLoading: () => void;
  loading: boolean
}

export const LoadingContext = createContext<LoadingContextModel>({
  openLoading: () => {},
  closeLoading: () => {},
  loading: true
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
        loading: showLoading
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
