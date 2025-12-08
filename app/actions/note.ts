'use server';

import { auth } from "../lib/auth";
import { sql } from "../lib/database";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createNote(formData: FormData) {
    try {
        const session = await auth.api.getSession({headers: await headers()});

        if(!session?.user?.id) {
            return {error: "Unauthorized"};
        }

        const title = formData.get('title') as string;
        const content = formData.get('content') as string;

        if(!content || content.trim().length === 0) {
            return {error: "Content is required"};
        }

        const [note] = await sql`
            INSERT INTO notes (user_id, title, content)
            VALUES (${session.user.id}, ${title || null}, ${content})
            RETURNING id, title, content, created_at
        `;

        revalidatePath('/');

        return {success: true, note};
    }
    catch(error) {
        console.error("Error creating note:", error);
        return {error: "Failed to create note"};
    }
}

export async function fetchNotes() {
    try {
        const session = await auth.api.getSession({headers: await headers()});

        if(!session?.user?.id) {
            return {error: "Unauthorized"};
        }

        const notes = await sql`
            SELECT id, title, content, created_at, updated_at, is_archived, is_public
            FROM notes
            WHERE user_id = ${session!.user.id} AND is_archived = false
            ORDER BY created_at DESC
        `;

        revalidatePath('/');

        return {success: true, notes};
    }
    catch(error) {
        console.error("Error creating note:", error);
        return {error: "Failed to create note"};
    }
}

export async function updateNote(formData: FormData) {
    try {
        const session = await auth.api.getSession({headers: await headers()});

        if(!session?.user?.id) {
            return {error: "Unauthorized"};
        }

        const id = formData.get('id') as string;
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;

        if(!content || content.trim().length === 0) {
            return {error: "Content is required"};
        }

        // Verify note belongs to user
        const [existingNote] = await sql`
            SELECT id FROM notes WHERE id = ${id} AND user_id = ${session.user.id}
        `;

        if(!existingNote) {
            return {error: "Note not found"};
        }

        await sql`
            UPDATE notes 
            SET title = ${title || null}, content = ${content}, updated_at = now()
            WHERE id = ${id} AND user_id = ${session.user.id}
        `;

        revalidatePath('/');
        return {success: true};
    }
    catch(error) {
        console.error("Error updating note:", error);
        return {error: "Failed to update note"};
    }
}

export async function deleteNote(noteId: string) {
    try {
        const session = await auth.api.getSession({headers: await headers()});

        if(!session?.user?.id) {
            return {error: "Unauthorized"};
        }

        // Verify note belongs to user and delete
        await sql`
            DELETE FROM notes 
            WHERE id = ${noteId} AND user_id = ${session.user.id}
        `;

        revalidatePath('/');
        return {success: true};
    }
    catch(error) {
        console.error("Error deleting note:", error);
        return {error: "Failed to delete note"};
    }
}