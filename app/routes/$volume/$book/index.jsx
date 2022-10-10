import { Link, useMatches} from "@remix-run/react";
import bookCss from '~/css/book.css'

export function links() {
  return [
    { rel: "stylesheet", href: bookCss }
  ]
}

export default function BookIndex() {
  const matches = useMatches()[2]
  const chapters = matches.data.book.chapters
  const book = matches.params.book

  return (
    <>
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter.chapter_number}>
            <Link to={`${chapter.chapter_number}`}>
              {book === 'dc' ? 'Section' : 'Chapter'} {chapter.chapter_number}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}