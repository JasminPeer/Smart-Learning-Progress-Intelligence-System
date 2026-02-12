import ProgressRing from '../components/ui/ProgressRing';

const GoalCard = ({ title, target, current }) => {
    const percentage = Math.min(100, Math.round((current / target) * 100));

    return (
        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
                <h5 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>{title}</h5>
                <p style={{ margin: '0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {current} / {target} completed
                </p>
            </div>
            <ProgressRing radius={24} stroke={3} progress={percentage} color="var(--accent)" />
        </div>
    );
};

export default GoalCard;
