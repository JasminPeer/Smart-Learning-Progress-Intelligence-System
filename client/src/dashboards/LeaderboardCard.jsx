const LeaderboardCard = () => {
    // Mock data for UI - eventually will come from API
    const students = [
        { id: 1, name: "Alice Johnson", score: 98, avatar: "👩🎓" },
        { id: 2, name: "Bob Smith", score: 95, avatar: "👨🎓" },
        { id: 3, name: "Charlie Brown", score: 92, avatar: "🧑🎓" },
        { id: 4, name: "Daisy Miller", score: 89, avatar: "👩🏫" },
        { id: 5, name: "Ethan Hunt", score: 88, avatar: "🕵️" },
    ];

    return (
        <div className="card">
            <h3 style={{ marginTop: 0 }}>🏆 Leaderboard</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {students.map((student, index) => (
                    <li key={student.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px 0',
                        borderBottom: index < students.length - 1 ? '1px solid #f0f0f0' : 'none'
                    }}>
                        <span style={{ fontWeight: 'bold', width: '24px', color: index < 3 ? 'var(--warning)' : 'var(--text-secondary)' }}>#{index + 1}</span>
                        <span style={{ fontSize: '1.2rem', marginRight: '10px' }}>{student.avatar}</span>
                        <span style={{ flexGrow: 1, fontWeight: 500 }}>{student.name}</span>
                        <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{student.score}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeaderboardCard;
