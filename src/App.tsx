import ThemeProvider from "./theme";
import { useScrollToTop } from "./hooks/useScrollToTop";
import Router from "./routes/router";
import { DialogProvider } from "contexts/DialogContext";
import { LoadingProvider } from "contexts/LoadingContext";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "contexts/AuthContext";

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <AuthProvider>
        <LoadingProvider>
          <DialogProvider>
            <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
              <Router />
            </SnackbarProvider>
          </DialogProvider>
        </LoadingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
