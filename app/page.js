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
    <main className={styles.page}>
      <h1>Profile App</h1>

      <Link href="/add-profile">Add Profile</Link>

      {profiles.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
        <div className={styles.grid}>
          {profiles.map((profile) => (
            <div key={profile.id} className={styles.card}>
              <h2>{profile.name}</h2>
              <p>{profile.title}</p>
              <p>{profile.email}</p>
              <p>{profile.bio}</p>

              <Link
                href={`/edit-profile/${profile.id}`}
                className={styles.editButton}
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}