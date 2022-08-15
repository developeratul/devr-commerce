import { AppProps } from "@/types";

export default function Content(props: AppProps) {
  const { children } = props;
  return <div>{children}</div>;
}
