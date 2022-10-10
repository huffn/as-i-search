import { Link, useMatches } from "@remix-run/react";

export default function VolumeIndex() {
  const matches = useMatches()[1]
  const books = matches.data.volume.books

  return (
    <>
      <ul>
        {books.map((book) => (
          <li key={book.book_lds_url}>
            <Link to={book.book_lds_url}>
            {book.book_long_title}{book.book_subtitle ? ` ${book.book_subtitle}`:''}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}