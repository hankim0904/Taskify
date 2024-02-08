import { ReactNode } from "react";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "@/contexts/AuthContext";
import NiceModal from "@ebay/nice-modal-react";
import "@/styles/base.scss";
import NextNProgress from "nextjs-progressbar";

const queryClient = new QueryClient();

function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NiceModal.Provider>{children}</NiceModal.Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        color="#5434D7"
        height={8}
        options={{
          easing: "ease",
          showSpinner: false,
        }}
      />
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </>
  );
}
