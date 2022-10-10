import { json } from "@remix-run/node";
import { Link, Outlet, useCatch, useLoaderData, useMatches } from "@remix-run/react";
import  prisma from '~/lib/db.server'
import ConditionalWrapper from "~/lib/utils";

export const loader = async ({ params }) => {
  const data = {
    book: await prisma.books.findFirst({
      where: {
        book_lds_url: params.book
      },
      include: {
        chapters: true
      }
    })
  }
  if (!data.book) {
    throw json("Book not found", { status: 404 })
  }
  return data
}

export default function Book() {
  const { book } = useLoaderData()
  const matches = useMatches().pop()

  return (
    <>
      <ConditionalWrapper
        condition={Object.hasOwn(matches.params, 'chapter')}
        wrapper={children => <Link to="./">{children}</Link>}
      >
        <h2>{book.book_long_title}{book.book_subtitle ? ` ${book.book_subtitle}`:''}</h2>
      </ConditionalWrapper>
      <Outlet/>
    </>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <div>
      {caught.status}: {caught.data}
    </div>
  )
}