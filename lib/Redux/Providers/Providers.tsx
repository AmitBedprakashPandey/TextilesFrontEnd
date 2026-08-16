"use client";

import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "@/lib/Redux/Store";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
            {children}
    </Provider>
  );
}