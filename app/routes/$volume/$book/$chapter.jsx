import { json } from "@remix-run/node";
import { Link, useCatch, useLoaderData, useParams } from "@remix-run/react";
import  prisma from '~/lib/db.server'
import chapterCss from '~/css/chapter.css'

export const loader = async ({ params }) => {
  const book = await prisma.books.findFirst({
    where: {
      book_lds_url: params.book
    },
    select: {
      chapters: {
        where: {
          chapter_number: Number.parseFloat(params.chapter)
        },
        include: {
          verses: true
        }
      }
    }
  })
  if (book.chapters.length === 0) {
    throw json("Chapter not found", { status: 404 })
  }
  const data = {
    chapter: book.chapters[0]
  }
  return data
}

export function links() {
  return [
    { rel: "stylesheet", href: chapterCss }
  ]
}

export default function Chapter() {
  const { chapter } = useLoaderData()
  const { book } = useParams()

  return (
    <>
      <h3>{book === 'dc' ? 'Section' : 'Chapter'} {chapter.chapter_number} <Link to="./notes">♫</Link></h3>
      {chapter.verses.map((verse) => (
        <p key={verse.id}>{verse.verse_number}: {verse.scripture_text}</p>
      ))}
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