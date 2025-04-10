export default function UserProfilePage({ params }) {
  return (
    <div>
      <h1>User Profile Page</h1>
      <p>Username: {params.id}</p>
    </div>
  );
}
