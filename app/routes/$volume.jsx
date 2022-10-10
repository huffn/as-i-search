import { json } from "@remix-run/node";
import { Link, Outlet, useCatch, useLoaderData, useMatches } from "@remix-run/react";
import  prisma from '~/lib/db.server'
import ConditionalWrapper from "~/lib/utils";

export const loader = async ({ params }) => {
  const data = {
    volume: await prisma.volumes.findFirst({
      where: {
        volume_lds_url: params.volume
      },
      include: {
        books: true
      }
    })
  }
  if (!data.volume) {
    throw json("Volume not found", { status: 404 })
  }
  return data
}

export default function Volume() {
  const { volume } = useLoaderData()
  const matches = useMatches().pop()

  return (
    <>
      <ConditionalWrapper
        condition={Object.hasOwn(matches.params, 'book')}
        wrapper={children => <Link to="./">{children}</Link>}
      >
        <h1>{volume.volume_long_title}{volume.volume_subtitle ? ` ${volume.volume_subtitle}`:''}</h1>
      </ConditionalWrapper>
      <Outlet/>
    </>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <div>
      <h1>{caught.status}</h1>
      {caught.data}
    </div>
  )
}