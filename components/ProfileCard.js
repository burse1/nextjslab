import Link from "next/link";

export default function ProfileCard({ profile }) {
  return (
    <div className="card">
      <h2>{profile.name}</h2>
      <p><strong>Major:</strong> {profile.major}</p>
      <p><strong>Year:</strong> {profile.year}</p>
      <p><strong>Interest:</strong> {profile.interest}</p>

      <Link href={`/profile/${profile.slug}`} className="profile-link">
        View Profile
      </Link>
    </div>
  );
}