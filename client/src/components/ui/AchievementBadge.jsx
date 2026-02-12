const AchievementBadge = ({ title, icon, unlocked, description, progress }) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            padding: '10px',
            borderRadius: '8px',
            backgroundColor: unlocked ? '#F0FDF4' : '#F9FAFB',
            border: unlocked ? '1px solid #BBF7D0' : '1px solid #F3F4F6'
        }}>
            <div style={{
                fontSize: '1.5rem',
                filter: unlocked ? 'none' : 'grayscale(100%)',
                opacity: unlocked ? 1 : 0.5,
                width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: 'white', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
                {icon}
            </div>
            <div style={{ flexGrow: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: unlocked ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{title}</div>
                {description && <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{description}</div>}

                {progress !== undefined && (
                    <div style={{ width: '100%', height: '4px', backgroundColor: '#E5E7EB', borderRadius: '2px', marginTop: '6px' }}>
                        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--primary)', borderRadius: '2px' }}></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AchievementBadge;
