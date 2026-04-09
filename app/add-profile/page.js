import { auth } from "@/auth";
import ProfileForm from "@/app/components/ProfileForm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AddProfilePage() {
  const session = await auth();

  if (!session?.user) {
    return <h1>You must log in to add a profile.</h1>;
  }

  return (
    <main>
      <h1>Add Profile</h1>
      <ProfileForm mode="add" />
    </main>
  );
}