import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <div>Login required</div>;

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">
        Profile
      </h1>

      <div className="bg-white p-4 rounded-xl shadow">
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;