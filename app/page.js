import styles from "./page.module.css";
import Link from "next/link";
import prisma from "@/app/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getData() {
  const profiles = await prisma.profiles.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return profiles;
}

export default async function Home() {
  const profiles = await getData();

  return (
    <main className={styles.main}>
      <div className="section">
        <div className="container">
          <h1>Profile App</h1>

          <p style={{ marginBottom: "20px" }}>
            <Link href="/add-profile">Add Profile</Link>
          </p>

          {profiles.length === 0 ? (
            <p>No profiles found.</p>
          ) : (
            <div className="grid">
              {profiles.map((profile) => (
                <div key={profile.id} className={styles["profile-card"]}>
                  <div className={styles["profile-card__image"]}>
                    <img
                      src={profile.image_url || "/vercel.svg"}
                      alt={profile.name}
                    />
                  </div>

                  <div className={styles["profile-card__content"]}>
                    <p><strong>{profile.name}</strong></p>
                    <p>{profile.title}</p>
                    <p>{profile.email}</p>
                    <p>{profile.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}