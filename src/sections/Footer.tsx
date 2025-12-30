export default function Footer() {
    return (
        <footer className="footer" id="contact">
            <strong>Get in touch</strong>
            <div className="footer-links">
                <a href="https://github.com/Yumekaz" target="_blank">GitHub</a>
                <a href="mailto:mihir.swarnkar722@gmail.com?subject=Portfolio%20Inquiry">Email</a>
                <a href="/Portfolio/resume.pdf" download>Resume</a>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>
                Bugs, misunderstandings, or corrections? Open an issue on GitHub or email. Feedback welcome.
            </p>
        </footer>
    );
}
