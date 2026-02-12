
// Terms.jsx
import Footer from '../components/layout/Footer';

export const Terms = () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div className="container" style={{ padding: '60px 20px', flexGrow: 1, maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '30px' }}>Terms of Service</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Last Updated: February 8, 2026</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <section>
                    <h3>1. Welcome to LearnIQ</h3>
                    <p>By accessing or using our website, services, and tools (collectively, "Services"), you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.</p>
                </section>

                <section>
                    <h3>2. Use of Our Services</h3>
                    <p>You must follow any policies made available to you within the Services. Don't misuse our Services. For example, don't interfere with our Services or try to access them using a method other than the interface and the instructions that we provide. We may suspend or stop providing our Services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.</p>
                </section>

                <section>
                    <h3>3. Your LearnIQ Account</h3>
                    <p>You may need a LearnIQ Account in order to use some of our Services. You may create your own LearnIQ Account, or your LearnIQ Account may be assigned to you by an administrator, such as your employer or educational institution. If you are using a LearnIQ Account assigned to you by an administrator, different or additional terms may apply and your administrator may be able to access or disable your account.</p>
                </section>

                <section>
                    <h3>4. Privacy and Copyright Protection</h3>
                    <p>LearnIQ's privacy policies explain how we treat your personal data and protect your privacy when you use our Services. By using our Services, you agree that LearnIQ can use such data in accordance with our privacy policies.</p>
                </section>

                <section>
                    <h3>5. Modification and Termination</h3>
                    <p>We are constantly changing and improving our Services. We may add or remove functionalities or features, and we may suspend or stop a Service altogether. You can stop using our Services at any time, although we'll be sorry to see you go. LearnIQ may also stop providing Services to you, or add or create new limits to our Services at any time.</p>
                </section>
            </div>
        </div>
        <Footer />
    </div>
);

// Cookies.jsx
export const Cookies = () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div className="container" style={{ padding: '60px 20px', flexGrow: 1, maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '30px' }}>Cookie Policy</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Last Updated: February 8, 2026</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <section>
                    <h3>1. How We Use Cookies</h3>
                    <p>A cookie is a small piece of text sent to your browser by our website. It helps the website rely on information about your visit, such as your preferred language and other settings. That can make your next visit easier and the site more useful to you.</p>
                </section>

                <section>
                    <h3>2. Types of Cookies We Use</h3>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li><strong>Essential cookies:</strong> These are cookies that are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website.</li>
                        <li><strong>Analytical/performance cookies:</strong> They allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it.</li>
                        <li><strong>Functionality cookies:</strong> These are used to recognize you when you return to our website. This enables us to personalize our content for you.</li>
                    </ul>
                </section>

                <section>
                    <h3>3. Managing Cookies</h3>
                    <p>Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you. It may also stop you from saving customized settings like login information.</p>
                </section>
            </div>
        </div>
        <Footer />
    </div>
);
