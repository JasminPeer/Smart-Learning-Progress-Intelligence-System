const RiskBadge = ({ risk }) => {
    let bgColor = '#D1FAE5'; // Green-100 (Low)
    let textColor = '#065F46'; // Green-800
    let label = 'Low Risk';

    if (risk === 'medium') {
        bgColor = '#FEF3C7'; // Amber-100
        textColor = '#92400E'; // Amber-800
        label = 'Medium Risk';
    } else if (risk === 'high') {
        bgColor = '#FEE2E2'; // Red-100
        textColor = '#991B1B'; // Red-800
        label = 'High Risk';
    }

    return (
        <span style={{
            backgroundColor: bgColor,
            color: textColor,
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 600,
            display: 'inline-block'
        }}>
            {label}
        </span>
    );
};

export default RiskBadge;
