const StreakCounter = ({ currentStreak, longestStreak }) => {
    // Generate icons strictly using emoji or simple shapes to avoid external icon lib dependency for now
    return (
        <div className="card" style={{ background: 'linear-gradient(135deg, #FFEFD5 0%, #FFF 100%)', border: '1px solid #FDBA74' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#EA580C', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🔥 Learning Streak
            </h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#C2410C' }}>{currentStreak}</div>
                    <div style={{ fontSize: '0.75rem', color: '#9A3412' }}>Current Days</div>
                </div>
                <div style={{ height: '30px', width: '1px', backgroundColor: '#FDBA74' }}></div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#9A3412' }}>{longestStreak}</div>
                    <div style={{ fontSize: '0.75rem', color: '#9A3412' }}>Best Record</div>
                </div>
            </div>
        </div>
    );
};

export default StreakCounter;
