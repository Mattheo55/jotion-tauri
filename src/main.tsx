import NiceModal from "@ebay/nice-modal-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './App.css';
import ConfirmerProvider from "./provider/ConfirmerProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NiceModal.Provider>
        <ConfirmerProvider>
          <App />
        </ConfirmerProvider>
      </NiceModal.Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);
