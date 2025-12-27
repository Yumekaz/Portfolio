export default function CurrentWork() {
    return (
        <section id="work">
            <h2 className="section-title">Current Work</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px' }}>
                What I'm building. Real code. Public failures.
            </p>

            <div className="projects-grid">
                <div className="project-card">
                    <h3>Mini Redis/Cassandra</h3>
                    <p>Distributed key-value store exploring replication, consistency, and failure handling.</p>
                    <a href="https://github.com/Yumekaz/Mini-Redis-Cassandra" target="_blank">→ GitHub</a>
                </div>

                <div className="project-card">
                    <h3>Mini Docker</h3>
                    <p>Container runtime with namespaces, cgroups, and overlay filesystems. Linux isolation primitives from scratch.</p>
                    <a href="https://github.com/Yumekaz/Mini-Docker" target="_blank">→ GitHub</a>
                </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginTop: '32px', fontSize: '14px', lineHeight: 1.6 }}>
                <strong>Scope:</strong> Intentionally scoped systems built to expose failure behavior, durability boundaries, and lifecycle mechanics.
            </p>
        </section>
    );
}
