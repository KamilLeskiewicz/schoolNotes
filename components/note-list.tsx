import { getNotes } from "@/lib/actions"
import NoteCard from "./note-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default async function NoteList() {
  let notes = []
  let error = null

  try {
    notes = await getNotes()
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load notes"
    console.error("Error in NoteList component:", error)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Notes</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}. Please refresh the page or try again later.</AlertDescription>
          </Alert>
        )}

        {!error && notes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No notes yet. Create your first note!</div>
        ) : (
          <div className="grid gap-4">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
