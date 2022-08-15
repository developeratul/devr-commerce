import { AppProps } from "@/types";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props: AppProps) {
  const { children } = props;
  return (
    <div>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
}
