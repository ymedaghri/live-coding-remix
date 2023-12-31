import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"

export default function Document({ children }: any) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-gray-100">
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        {/*process.env.NODE_ENV === "development" && <LiveReload />*/}
      </body>
    </html>
  )
}
