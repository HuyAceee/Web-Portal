import App from "App";
import { LoadingComponent } from "contexts/LoadingContext";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import "utils/i18n";

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense fallback={<LoadingComponent open />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
