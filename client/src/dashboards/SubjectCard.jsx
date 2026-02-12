import RiskBadge from '../components/ui/RiskBadge';

const SubjectCard = ({ subject, startingScore, currentProgress, risk }) => {
    return (
        <div className="card" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>{subject}</h4>
                <RiskBadge risk={risk} />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '8px' }}>
                    <span style={{ color: '#64748B', fontWeight: 600 }}>Starting Performance</span>
                    <span style={{ fontWeight: 800, color: 'var(--primary)' }}>{startingScore}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${startingScore}%`, height: '100%', backgroundColor: 'var(--primary)', borderRadius: '10px' }}></div>
                </div>
            </div>

            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '8px' }}>
                    <span style={{ color: '#64748B', fontWeight: 600 }}>Current Progress</span>
                    <span style={{ fontWeight: 800, color: 'var(--secondary)' }}>{currentProgress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${currentProgress}%`, height: '100%', backgroundColor: 'var(--secondary)', borderRadius: '10px' }}></div>
                </div>
            </div>
        </div>
    );
};

export default SubjectCard;
