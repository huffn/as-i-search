import homeCss from '~/css/home.css'

export function links() {
  return [
    { rel: "stylesheet", href: homeCss }
  ]
}

export default function Index() {
  return (
    <>
      <p>{`As I search the holy scriptures,
Loving Father of mankind,
May my heart be blessed with wisdom,
And may knowledge fill my mind.`}</p>
      <p>{`As I search the holy scriptures,
Touch my spirit, Lord, I pray.
May life's myst'ries be unfolded
As I study day by day.`}</p>
      <p>{`As I search the holy scriptures,
May thy mercy be revealed.
Soothe my troubled heart and spirit;
May my unseen wounds be healed.`}</p>
      <p>{`As I search the holy scriptures,
Help me ponder and obey.
In thy word is life eternal;
May thy light show me the way.`}</p>
    </>
  )
}