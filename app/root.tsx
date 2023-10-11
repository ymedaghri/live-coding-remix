import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import tailwindStylesheet from "~/tailwind.css";
import Document from "./components/app-layout/document";
import Layout from "./components/app-layout/layout";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStylesheet },
];

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}
