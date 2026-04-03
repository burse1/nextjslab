import prisma from "@/app/lib/prisma";
import ProfileForm from "@/app/components/ProfileForm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function EditProfilePage({ params }) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!id || Number.isNaN(id)) {
    return <h1>Invalid profile id</h1>;
  }

  const profile = await prisma.profiles.findUnique({
    where: { id },
  });

  if (!profile) {
    return <h1>Profile not found</h1>;
  }

  return (
    <main>
      <h1>Edit Profile</h1>
      <ProfileForm profile={profile} />
    </main>
  );
}