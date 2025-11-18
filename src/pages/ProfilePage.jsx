export default function ProfilePage({ user }) {
    if (!user) return <p>Be kell jelentkezned...</p>;

    return (
        <div className="container">
            <h1>Profil</h1>
            <p>Email: {user.email}</p>
            <p>Üdv újra!</p>
        </div>
    );
}