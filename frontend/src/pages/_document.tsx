/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        // eslint-disable-next-line @next/next/no-sync-scripts
        <script src="https://cdn.lordicon.com/xdjxvujz.js"></script>{" "}
        {/* Adicione o script Lordicon aqui */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
