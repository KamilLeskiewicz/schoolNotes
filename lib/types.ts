export interface Note {
  id: string
  title: string
  content: string
  createdAt: number
}

export interface NoteInput {
  title: string
  content: string
}

export interface NoteUpdateInput {
  id: string
  title: string
  content: string
}
