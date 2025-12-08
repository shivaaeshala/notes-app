import Navbar from "./ui/navbar";
import { auth } from "./lib/auth";
import { headers } from "next/headers";
import { SignInButton } from "./components/signin/auth-buttons";
import { sql } from "./lib/database";
import Notes from "./components/notes";

interface Note {
    id: string;
    title: string | null;
    content: string;
    created_at: Date;
    updated_at: Date;
    is_archived: boolean;
    is_public: boolean;
}

export default async function Home() {
  const session = await auth.api.getSession({headers: await headers()});
  
  if(!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-neutral-100 p-4">
        <div className="max-w-md text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter">Notes app</h1>
            <p className="text-neutral-400">
              Sign-in to continue
            </p>
          </div>
          <div className="flex justify-center">
            <SignInButton />
          </div>
        </div>
      </div>
    )
  }

  // Fetch notes for the current user
  const notes = await sql`
    SELECT id, title, content, created_at, updated_at, is_archived, is_public
    FROM notes
    WHERE user_id = ${session.user.id} AND is_archived = false
    ORDER BY created_at DESC
  ` as Note[];
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Notes notes={notes} />
    </div>
  );
}
