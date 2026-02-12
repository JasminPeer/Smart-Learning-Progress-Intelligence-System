const RecommendationCard = ({ title, description, priority, action }) => {
    return (
        <div className="card" style={{ borderLeft: `4px solid ${priority === 'high' ? 'var(--accent)' : 'var(--primary)'}` }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem' }}>{title}</h4>
            <p style={{ margin: '0 0 12px 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{description}</p>
            <button className="btn" style={{
                padding: '6px 12px',
                fontSize: '0.8rem',
                backgroundColor: 'rgba(32, 178, 170, 0.1)',
                color: 'var(--primary)'
            }}>
                {action || 'Start Now'}
            </button>
        </div>
    );
};

export default RecommendationCard;
