import NextHead from "next/head";

type HeadProps = {
  title?: string;
  description?: string;
};

export default function Head(props: HeadProps) {
  const { title, description } = props;
  return (
    <NextHead>
      <title>{title ? `DevR Commerce - ${title}` : "DevR Commerce"}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </NextHead>
  );
}
