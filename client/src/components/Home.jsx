const Home = () => {
    return (
        <div className="container" style={{ textAlign: 'center', padding: '50px 0' }}>
            <h1 style={{ fontSize: '3rem', color: 'var(--primary-color)' }}>Welcome to Smart Learning</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '20px auto', color: '#666' }}>
                The intelligent platform to track your learning progress, analyze performance, and achieve your goals.
            </p>
            <div style={{ marginTop: '30px' }}>
                <a href="/register" className="btn btn-primary" style={{ marginRight: '15px' }}>Get Started</a>
                <a href="/about" className="btn" style={{ background: 'white', border: '1px solid var(--primary-color)', color: 'var(--primary-color)' }}>Learn More</a>
            </div>
        </div>
    );
};

export default Home;
