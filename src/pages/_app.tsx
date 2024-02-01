import type { AppProps } from "next/app";
import "@/styles/base.scss";
import { AuthProvider } from "@/contexts/AuthContext";
import NiceModal from "@ebay/nice-modal-react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NiceModal.Provider>
        <Component {...pageProps} />
      </NiceModal.Provider>
    </AuthProvider>
  );
}
