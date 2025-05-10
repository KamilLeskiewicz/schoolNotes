import NoteList from "@/components/note-list"
import NoteForm from "@/components/note-form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { isUsingInMemoryStorage } from "@/lib/redis"

export default function Home() {
  // Check if we're using in-memory storage
  const usingInMemoryStorage = isUsingInMemoryStorage()

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Simple Note Keeper</h1>

      {usingInMemoryStorage && (
        <Alert variant="warning" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Local Storage Mode</AlertTitle>
          <AlertDescription>
            The application is running with in-memory storage. Your notes will not persist between sessions.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <NoteForm />
        </div>
        <div className="lg:col-span-2">
          <NoteList />
        </div>
      </div>
    </main>
  )
}
