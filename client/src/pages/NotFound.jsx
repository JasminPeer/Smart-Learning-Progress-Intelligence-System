import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: '#F0FDF4',
            color: 'var(--text-primary)'
        }}>
            <div style={{ fontSize: '8rem', fontWeight: 900, color: 'var(--primary)', opacity: 0.2 }}>404</div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Oops! You seem to be lost.</h1>
            <p style={{ maxWidth: '500px', color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.1rem' }}>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                Don't worry, even the best learners take a detour sometimes!
            </p>

            <div style={{ display: 'flex', gap: '20px' }}>
                <Link to="/" className="btn btn-primary">Go Home</Link>
                <button className="btn" style={{ backgroundColor: 'white', border: '1px solid var(--primary)', color: 'var(--primary)' }} onClick={() => window.history.back()}>
                    Go Back
                </button>
            </div>

            <div style={{ marginTop: '60px', fontSize: '3rem' }}>🚀 🪐 🛸</div>
        </div>
    );
};

export default NotFound;
