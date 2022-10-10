import JSONdb from 'simple-json-db'
import { resolve } from 'path'

const path = resolve('app/lib/userNotes.json')
const db = new JSONdb(path)

export default db