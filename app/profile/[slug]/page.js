import { notFound } from "next/navigation";

const profiles = [
  {
    id: 1,
    slug: "alex-johnson",
    name: "Alex Johnson",
    major: "Computer Graphics Technology",
    year: "Senior",
    interest: "Web Development",
    bio: "Alex enjoys building responsive websites and interactive web apps.",
  },
  {
    id: 2,
    slug: "maria-lee",
    name: "Maria Lee",
    major: "Data Visualization",
    year: "Junior",
    interest: "Dashboard Design",
    bio: "Maria focuses on data storytelling and dashboard interfaces.",
  },
  {
    id: 3,
    slug: "jordan-smith",
    name: "Jordan Smith",
    major: "UX Design",
    year: "Sophomore",
    interest: "User Research",
    bio: "Jordan is interested in user-centered design and accessibility.",
  },
];

async function getProfile(slug) {
  return profiles.find((profile) => profile.slug === slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const profile = await getProfile(slug);

  if (!profile) {
    return {
      title: "Profile Not Found",
    };
  }

  return {
    title: `${profile.name} | Profile Project`,
    description: `Learn more about ${profile.name} and their academic interests.`,
  };
}

export default async function ProfileDetailsPage({ params }) {
  const { slug } = await params;
  const profile = await getProfile(slug);

  if (!profile) {
    notFound();
  }

  return (
    <section>
      <h2>{profile.name}</h2>
      <p><strong>Major:</strong> {profile.major}</p>
      <p><strong>Year:</strong> {profile.year}</p>
      <p><strong>Interest:</strong> {profile.interest}</p>
      <p><strong>Bio:</strong> {profile.bio}</p>
    </section>
  );
}