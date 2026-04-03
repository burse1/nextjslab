import prisma from "@/app/lib/prisma";
import Link from "next/link";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function ProfileDetailPage({ params }) {
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
            <p>
              <Link href="/">Back to Home</Link>
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="section">
        <div className="container">
          <h1>{profile.name}</h1>

          <p style={{ marginBottom: "20px" }}>
            <Link href="/">Back to Home</Link> |{" "}
            <Link href={`/edit-profile/${profile.id}`}>Edit Profile</Link>
          </p>

          <div style={{ maxWidth: "700px" }}>
            <img
              src={profile.image_url || "/vercel.svg"}
              alt={profile.name}
              style={{
                width: "260px",
                height: "260px",
                objectFit: "cover",
                borderRadius: "12px",
                display: "block",
                marginBottom: "20px",
              }}
            />

            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Title:</strong> {profile.title}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Bio:</strong> {profile.bio}</p>
          </div>
        </div>
      </div>
    </main>
  );
}