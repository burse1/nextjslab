import ProfileCard from "../components/ProfileCard";

export const metadata = {
  title: "Home | Profile Project",
  description: "Browse student profiles in this Next.js lab project.",
};

async function getProfiles() {
  return [
    {
      id: 1,
      slug: "alex-johnson",
      name: "Alex Johnson",
      major: "Computer Graphics Technology",
      year: "Senior",
      interest: "Web Development",
    },
    {
      id: 2,
      slug: "maria-lee",
      name: "Maria Lee",
      major: "Data Visualization",
      year: "Junior",
      interest: "Dashboard Design",
    },
    {
      id: 3,
      slug: "jordan-smith",
      name: "Jordan Smith",
      major: "UX Design",
      year: "Sophomore",
      interest: "User Research",
    },
  ];
}

export default async function HomePage({ searchParams }) {
  const profiles = await getProfiles();
  const { major } = await searchParams;

  const filteredProfiles = major
    ? profiles.filter(
        (profile) => profile.major.toLowerCase() === major.toLowerCase()
      )
    : profiles;

  return (
    <section>
      <h2>Student Profiles</h2>
      <p className="intro">
        This homepage is a Server Component that displays profile cards and
        supports filtering with URL search parameters.
      </p>

      <div className="filters">
        <a href="/">All</a>
        <a href="/?major=Computer%20Graphics%20Technology">
          Computer Graphics Technology
        </a>
        <a href="/?major=Data%20Visualization">Data Visualization</a>
        <a href="/?major=UX%20Design">UX Design</a>
      </div>

      <div className="grid">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))
        ) : (
          <p>No profiles matched that filter.</p>
        )}
      </div>
    </section>
  );
}