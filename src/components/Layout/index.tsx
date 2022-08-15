import { AppProps } from "@/types";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props: AppProps) {
  const { children } = props;
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
