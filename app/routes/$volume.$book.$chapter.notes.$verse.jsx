import { json, redirect } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import  prisma from '~/lib/db.server'
import chapterCss from '~/css/chapter.css'
import userNotes from "~/lib/userNotes";

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
  if (!book) {
    throw json("Book not found", { status: 404 })
  }
  if (book.chapters.length === 0) {
    throw json("Chapter not found", { status: 404 })
  }
  const data = {
    chapter: book.chapters[0]
  }
  return data
}

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = Number.parseFloat(formData.get("id"));
  const talk = formData.get("talk");
  const speaker = formData.get("speaker");

  if (talk && speaker) {
    let note = userNotes.get(id)
    if (!note) {
      note = []
    }
    note.push(`${talk} – ${speaker}`)
    userNotes.set(id, note)
    return redirect("../notes");
  }
  return null
};

export function links() {
  return [
    { rel: "stylesheet", href: chapterCss }
  ]
}

export default function Chapter() {
  const { chapter } = useLoaderData()
  const { verse: verse_number } = useParams()
  const verse = chapter.verses.filter((verse) => {
    return verse.verse_number === Number.parseFloat(verse_number)
  })[0]

  return (
    <>
      <h3>Add Note</h3>
      <p>{verse.verse_number}: {verse.scripture_text}</p>

      <form method="post">
        <input type="hidden" value={verse.id} name="id" />
        <p>
          <label>
            <span>Conference Talk:</span>
            <input type="text" name="talk" />
          </label>
        </p>
        <p>
          <label>
            <span>Speaker:</span>
            <input type="text" name="speaker" />
          </label>
        </p>
        <button type="submit">Add Note</button>
      </form>
    </>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <div>
      <h1></h1>
      {caught.status}: {caught.data}
    </div>
  )
}