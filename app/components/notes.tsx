'use client';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { updateNote, deleteNote } from '@/app/actions/note';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface Note {
    id: string;
    title: string | null;
    content: string;
    created_at: Date;
    updated_at: Date;
    is_archived: boolean;
    is_public: boolean;
}

interface NotesProps {
    notes: Note[];
}

export default function Notes({ notes }: NotesProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

    async function handleUpdate(formData: FormData, noteId: string) {
        formData.append('id', noteId);
        startTransition(async () => {
            const result = await updateNote(formData);
            if(result.error) {
                alert(result.error);
            } else {
                setEditingNoteId(null);
                router.refresh();
            }
        });
    }

    async function handleDelete(noteId: string) {
        if(!confirm('Are you sure you want to delete this note?')) {
            return;
        }
        startTransition(async () => {
            const result = await deleteNote(noteId);
            if(result.error) {
                alert(result.error);
            } else {
                router.refresh();
            }
        });
    }

    return (
        <main className="container mx-auto px-4 py-8 max-w-6xl">
            {notes.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-neutral-400 text-lg">No notes yet. Create your first note!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.map((note) => (
                        <Dialog 
                            key={note.id}
                            open={editingNoteId === note.id}
                            onOpenChange={(open) => setEditingNoteId(open ? note.id : null)}
                        >
                            <DialogTrigger asChild>        
                                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 hover:border-neutral-700 transition-colors cursor-pointer">
                                    {note.title && (
                                        <h3 className="text-lg font-semibold mb-2 text-white">
                                            {note.title}
                                        </h3>
                                    )}
                                    <p className="text-neutral-300 text-sm mb-3 line-clamp-4">
                                        {note.content}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-neutral-500">
                                        <span>
                                            {new Date(note.created_at).toLocaleDateString()}
                                        </span>
                                        {note.is_public && (
                                            <span className="px-2 py-1 bg-neutral-800 rounded text-neutral-400">
                                                Public
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[425px] color-black bg-black">
                                <form action={(formData) => handleUpdate(formData, note.id)}>
                                    <DialogHeader>
                                        <DialogTitle>
                                            <Input 
                                                id='title' 
                                                name='title' 
                                                defaultValue={note.title || ''} 
                                                className='border-none' 
                                                disabled={isPending}
                                                placeholder="Enter Title"
                                            />
                                        </DialogTitle>
                                    </DialogHeader>

                                    <Textarea 
                                        id='content' 
                                        name='content' 
                                        defaultValue={note.content}
                                        disabled={isPending}
                                        placeholder="Enter note..."
                                    />

                                    <DialogFooter className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() => handleDelete(note.id)}
                                            disabled={isPending}
                                        >
                                            Delete
                                        </Button>
                                        <DialogClose asChild>
                                            <Button 
                                                type='button'
                                                variant='outline' 
                                                className='cursor-pointer' 
                                                disabled={isPending}
                                            >
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button 
                                            type='submit' 
                                            className='cursor-pointer' 
                                            disabled={isPending}
                                        >
                                            {isPending ? 'Saving...' : "Save"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            )}
        </main>
    );
}