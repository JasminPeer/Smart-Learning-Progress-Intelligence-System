import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Footer from '../components/layout/Footer';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('sending');

        const formData = new FormData(form.current);
        const name = formData.get('user_name');
        const email = formData.get('user_email');
        const mobile = formData.get('user_mobile');
        const message = formData.get('message');

        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AMobile: ${mobile}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        window.location.href = `mailto:jasminpeer006@gmail.com?subject=Contact Message from ${name}&body=${body}`;

        setStatus('success');
        e.target.reset();
        setTimeout(() => setStatus(''), 5000);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="container" style={{ flexGrow: 1, padding: '60px 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>Get in Touch</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>We'd love to hear from you. Send us a message!</p>
                </div>

                <div style={{ display: 'flex', maxWidth: '1000px', margin: '0 auto', gap: '40px', alignItems: 'flex-start' }}>

                    {/* Contact Info Box */}
                    <div style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(124, 58, 237, 0.3)' }}>
                        <h2 style={{ color: 'white', marginBottom: '30px' }}>Contact Information</h2>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                            <Phone size={24} />
                            <div>
                                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Mobile Number</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>+1 (555) 123-4567</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                            <Mail size={24} />
                            <div>
                                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Email</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>jasminpeer006@gmail.com</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <MapPin size={24} />
                            <div>
                                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Headquarters</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>123 Learning Ave, EdTech City</div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Box */}
                    <div className="card" style={{ flex: 1.5, padding: '40px' }}>
                        <h2 style={{ marginBottom: '30px' }}>Send Message</h2>

                        <form ref={form} onSubmit={sendEmail}>
                            <div className="form-group">
                                <label>Your Name</label>
                                <input type="text" name="user_name" required placeholder="John Doe" />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" name="user_email" required placeholder="john@example.com" />
                                </div>
                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <input type="text" name="user_mobile" placeholder="+1 234 567 890" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Message</label>
                                <textarea name="message" rows="5" required placeholder="How can we help you?" style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '1rem', fontFamily: 'inherit' }}></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'sending'}>
                                {status === 'sending' ? 'Sending...' : <><Send size={18} style={{ marginRight: '8px' }} /> Send Message</>}
                            </button>

                            {status === 'success' && <div style={{ marginTop: '15px', color: 'var(--success)', textAlign: 'center' }}>Message sent successfully!</div>}
                            {status === 'error' && <div style={{ marginTop: '15px', color: 'var(--error)', textAlign: 'center' }}>Failed to send message. Please try again.</div>}
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
