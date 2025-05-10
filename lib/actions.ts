"use server"

import { revalidatePath } from "next/cache"
import type { Note, NoteInput, NoteUpdateInput } from "./types"
import { v4 as uuidv4 } from "uuid"
import { storage } from "./redis"
import { stringifyError } from "./utils"

const NOTES_KEY = "notes"

// Create a new note
export async function createNote(noteInput: NoteInput): Promise<void> {
  try {
    const id = uuidv4()
    const timestamp = Date.now()

    const note: Note = {
      id,
      title: noteInput.title,
      content: noteInput.content,
      createdAt: timestamp,
    }

    // Store the note using our storage abstraction
    await storage.hset(NOTES_KEY, { [id]: JSON.stringify(note) })
    revalidatePath("/")
  } catch (error) {
    console.error("Error creating note:", stringifyError(error))
    throw new Error("Failed to create note. Please try again.")
  }
}

// Get all notes
export async function getNotes(): Promise<Note[]> {
  try {
    const notesData = await storage.hgetall(NOTES_KEY)

    if (!notesData) {
      console.log("No notes found in storage")
      return []
    }

    // Convert the object to an array of notes with proper error handling
    const notes = Object.entries(notesData)
      .map(([id, noteData]) => {
        try {
          // Handle both string and object cases
          let note: Note

          if (typeof noteData === "string") {
            // If it's a string, parse it
            note = JSON.parse(noteData) as Note
          } else if (typeof noteData === "object" && noteData !== null) {
            // If it's already an object, use it directly
            note = noteData as Note
          } else {
            console.error(`Invalid note data for ID ${id}:`, noteData)
            return null
          }

          // Validate that it has the required fields
          if (!note.id || !note.title || !note.content || typeof note.createdAt !== "number") {
            console.error(`Note with ID ${id} is missing required fields:`, note)
            return null
          }

          return note
        } catch (error) {
          console.error(`Error processing note with ID ${id}:`, stringifyError(error))
          return null
        }
      })
      .filter((note): note is Note => note !== null)
      .sort((a, b) => b.createdAt - a.createdAt) // Sort by creation time, newest first

    return notes
  } catch (error) {
    console.error("Error fetching notes:", stringifyError(error))
    // Return empty array instead of throwing to prevent UI from breaking
    return []
  }
}

// Update a note
export async function updateNote(noteUpdate: NoteUpdateInput): Promise<void> {
  try {
    // Get the existing note
    const existingNoteData = await storage.hget(NOTES_KEY, noteUpdate.id)

    if (!existingNoteData) {
      throw new Error("Note not found")
    }

    // Handle both string and object cases
    let existingNote: Note

    if (typeof existingNoteData === "string") {
      existingNote = JSON.parse(existingNoteData) as Note
    } else if (typeof existingNoteData === "object" && existingNoteData !== null) {
      existingNote = existingNoteData as Note
    } else {
      throw new Error("Invalid note data")
    }

    // Update the note
    const updatedNote: Note = {
      ...existingNote,
      title: noteUpdate.title,
      content: noteUpdate.content,
    }

    // Save the updated note
    await storage.hset(NOTES_KEY, { [noteUpdate.id]: JSON.stringify(updatedNote) })
    revalidatePath("/")
  } catch (error) {
    console.error("Error updating note:", stringifyError(error))
    throw new Error("Failed to update note. Please try again.")
  }
}

// Delete a note
export async function deleteNote(id: string): Promise<void> {
  try {
    await storage.hdel(NOTES_KEY, id)
    revalidatePath("/")
  } catch (error) {
    console.error("Error deleting note:", stringifyError(error))
    throw new Error("Failed to delete note. Please try again.")
  }
}
