import Document, { Head, Html, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en" className="dark">
        <Head />
        <body className="dark:bg-gray-900 dark:text-gray-50 font-poppins">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
