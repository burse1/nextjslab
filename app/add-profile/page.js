import ProfileForm from "@/app/components/ProfileForm";

export default function AddProfilePage() {
  return (
    <main>
      <div className="section">
        <div className="container">
          <h1>Add Profile</h1>
          <ProfileForm mode="add" />
        </div>
      </div>
    </main>
  );
}