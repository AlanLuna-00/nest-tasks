"use client";
import { Provider } from "react-redux";
import store from "@/redux/store";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store as any}>{children}</Provider>;
};

export default AppProvider;
