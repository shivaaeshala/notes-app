'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
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
import { createNote } from '@/app/actions/note';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function CreateNote() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            const result = await createNote(formData);

            if(result.error) {
                alert(result.error);
            }
            else {
                setIsOpen(false);
                router.refresh();
            }
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* Mobile: Icon only, Desktop: Full button */}
            <DialogTrigger asChild>
                <Button
                    data-slot='button'
                    className='group relative flex shrink-0 items-center justify-center gap-1 sm:gap-2 overflow-hidden bg-white text-black transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-black before:duration-500 before:ease-out hover:shadow-white hover:before:h-56 hover:before:w-56 p-2 md:px-4 md:min-w-[140px]'
                    aria-label="Create Note"
                >
                    {/* Mobile: Just icon */}
                    <PlusIcon className='w-5 h-5 md:w-5 md:h-5 text-black group-hover:text-white z-10 transition-colors delay-300 group-hover:delay-0'/>
                    {/* Desktop: Text label */}
                    <label htmlFor="Create Note"
                        className='hidden md:block py-[9px] text-black group-hover:text-white z-20 transition-colors delay-300 group-hover:delay-0 cursor-pointer'
                    >
                        Create Note 
                    </label>
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[95vw] max-w-[425px] max-h-[90vh] overflow-y-auto bg-black border-neutral-800 mx-4">
                <form action={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            <Input 
                                id='title' 
                                name='title' 
                                placeholder='Enter Title' 
                                className='border-none' 
                                disabled={isPending}
                            />
                        </DialogTitle>
                    </DialogHeader>

                    <Textarea 
                        id='content' 
                        name='content' 
                        placeholder='Enter note...' 
                        disabled={isPending}
                        className="min-h-[200px]"
                    />

                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                        <DialogClose asChild>
                            <Button 
                                type='button'
                                variant='outline' 
                                className='cursor-pointer w-full sm:w-auto' 
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button 
                            type='submit' 
                            className='cursor-pointer w-full sm:w-auto' 
                            disabled={isPending}
                        >
                            {isPending ? 'Saving...' : "Save"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}