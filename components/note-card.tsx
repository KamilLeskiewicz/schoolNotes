"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Pencil, Trash2, Save, X } from "lucide-react"
import { deleteNote, updateNote } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"
import type { Note } from "@/lib/types"
import { formatDate } from "@/lib/utils"

interface NoteCardProps {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const router = useRouter()
  const { toast } = useToast()

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and content are required",
        variant: "destructive",
      })
      return
    }

    try {
      await updateNote({
        id: note.id,
        title,
        content,
      })
      setIsEditing(false)
      toast({
        title: "Success",
        description: "Note updated successfully",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update note",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteNote(note.id)
      toast({
        title: "Success",
        description: "Note deleted successfully",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      })
      setIsDeleting(false)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        {isEditing ? (
          <Input value={title} onChange={(e) => setTitle(e.target.value)} className="font-semibold" />
        ) : (
          <CardTitle>{note.title}</CardTitle>
        )}
        <div className="text-xs text-muted-foreground">{formatDate(note.createdAt)}</div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={3} />
        ) : (
          <p className="whitespace-pre-wrap">{note.content}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {isEditing ? (
          <>
            <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button size="sm" onClick={handleUpdate}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4 mr-1" /> Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              <Trash2 className="h-4 w-4 mr-1" /> {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
