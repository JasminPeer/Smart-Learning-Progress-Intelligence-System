const StatCard = ({ title, value, subtitle, icon, trend, trendLabel, variant = 'default' }) => {

    // Variant Styles
    const styles = {
        default: {
            background: 'white',
            color: 'var(--text-primary)',
            border: 'none',
            iconBg: 'var(--secondary-light)',
            iconColor: 'var(--primary)'
        },
        'gradient-purple': {
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            color: 'white',
            border: 'none',
            iconBg: 'rgba(255,255,255,0.2)',
            iconColor: 'white'
        },
        'solid-green': {
            background: '#10B981', // Emerald 500
            color: 'white',
            border: 'none',
            iconBg: 'rgba(255,255,255,0.2)',
            iconColor: 'white'
        }
    };

    const currentStyle = styles[variant] || styles.default;

    return (
        <div className="card" style={{
            background: currentStyle.background,
            color: currentStyle.color,
            border: currentStyle.border,
            display: 'flex', flexDirection: 'column', gap: '15px',
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
            height: '100%',
            justifyContent: 'space-between'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <span style={{ fontSize: '0.9rem', opacity: 0.9, fontWeight: 500 }}>{title}</span>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2, marginTop: '8px' }}>
                        {value}
                    </div>
                </div>
                {icon && (
                    <div style={{
                        backgroundColor: currentStyle.iconBg,
                        color: currentStyle.iconColor,
                        padding: '10px', borderRadius: '12px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {icon}
                    </div>
                )}
            </div>

            <div>
                {subtitle && <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{subtitle}</div>}

                {(trend || trendLabel) && (
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem', marginTop: '5px' }}>
                        {trend && (
                            <span style={{
                                color: variant === 'default' ? (trend > 0 ? 'var(--success)' : 'var(--error)') : 'white',
                                fontWeight: 600,
                                marginRight: '6px',
                                backgroundColor: variant === 'default' ? 'transparent' : 'rgba(255,255,255,0.2)',
                                padding: '2px 6px', borderRadius: '4px'
                            }}>
                                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                            </span>
                        )}
                        <span style={{ opacity: 0.8 }}>{trendLabel}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
