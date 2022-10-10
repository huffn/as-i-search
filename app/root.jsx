import {
  Link,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import  prisma from '~/lib/db.server'
import mainCss from '~/css/root.css'

export const loader = async () => {
  const data = {
    volumes: await prisma.volumes.findMany(),
  }
  return data
}

export const meta = () => ({
  charset: "utf-8",
  title: "As I Search",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    { rel: "stylesheet", href: mainCss }
  ]
}

export default function App() {
  const { volumes } = useLoaderData()
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <input type="checkbox" name="mobile-toggle" id="mobile-toggle"/>
        <div className="mobile-wrapper">
          <div className="wrapper">
            <nav>
              <Link to="/"><h1>As I Search</h1></Link>
              {volumes.map((volume) => (
                <NavLink to={volume.volume_lds_url} key={volume.volume_lds_url}>
                  {volume.volume_long_title}
                </NavLink>
              ))}
              <label htmlFor="mobile-toggle">☰</label>
            </nav>
            <div className="main">
              <Outlet />
            </div>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
