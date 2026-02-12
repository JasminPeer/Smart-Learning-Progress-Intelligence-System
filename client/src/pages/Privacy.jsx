import Footer from '../components/layout/Footer';

const Privacy = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="container" style={{ flexGrow: 1, padding: '60px 20px', maxWidth: '800px' }}>
                <h1 style={{ marginBottom: '30px' }}>Privacy Policy</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Last Updated: February 2026</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', lineHeight: 1.7 }}>
                    <section>
                        <h3>1. Introduction</h3>
                        <p>Welcome to LearnIQ. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.</p>
                    </section>

                    <section>
                        <h3>2. Data We Collect</h3>
                        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows: Identity Data (username, first name, last name), Contact Data (email address, telephone numbers), and Technical Data (internet protocol (IP) address).</p>
                    </section>

                    <section>
                        <h3>3. How We Use Your Data</h3>
                        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: Where we need to perform the contract we have entered into with you; Where it is necessary for our legitimate interests; Where we need to comply with a legal obligation.</p>
                    </section>

                    <section>
                        <h3>4. Data Security</h3>
                        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Privacy;
