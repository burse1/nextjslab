import prisma from "@/app/lib/prisma";
import ProfileForm from "@/app/components/ProfileForm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function EditProfilePage({ params }) {
  const id = Number(params.id);

  const profile = await prisma.profiles.findUnique({
    where: { id },
  });

  if (!profile) {
    return (
      <main>
        <div className="section">
          <div className="container">
            <h1>Profile not found</h1>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="section">
        <div className="container">
          <h1>Edit Profile</h1>
          <ProfileForm
            mode="edit"
            profileId={profile.id}
            initialValues={profile}
          />
        </div>
      </div>
    </main>
  );
}