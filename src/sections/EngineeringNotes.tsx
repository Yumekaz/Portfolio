export default function EngineeringNotes() {
    return (
        <section id="notes">
            <h2 className="section-title">Engineering Notes</h2>

            <div className="note">
                <h3>Split-Brain Was Inevitable</h3>
                <span className="note-meta">Mini Redis/Cassandra</span>
                <p className="note-content">
                    Built a distributed key-value store with Raft-inspired leader election and quorum reads.
                </p>
                <div className="failure-box">
                    <strong>What failed:</strong> Short network partitions caused multiple leaders to emerge. Divergent writes were accepted and later overwritten during reconciliation, resulting in silent data loss.
                </div>
                <div className="learning-box">
                    <strong>Insight:</strong> Consensus algorithms don't fail slowly — they fail by violating guarantees. Simplified leader election turns quorum into an illusion.
                </div>
            </div>

            <div className="note">
                <h3>fsync() Is a Design Boundary, Not a Detail</h3>
                <span className="note-meta">Mini Redis/Cassandra</span>
                <p className="note-content">
                    Implemented a write-ahead log to guarantee durability.
                </p>
                <div className="failure-box">
                    <strong>What failed:</strong> Crash recovery took hundreds of milliseconds on modest log sizes. Buffered writes did not reduce latency as expected. Forcing durability serialized progress.
                </div>
                <div className="learning-box">
                    <strong>Insight:</strong> Persistence has real, unavoidable costs. Durability boundaries must be designed around, not optimized away.
                </div>
            </div>

            <div className="note">
                <h3>Signal Propagation Stops at PID 1</h3>
                <span className="note-meta">Mini Docker</span>
                <p className="note-content">
                    Built process isolation using Linux namespaces and cgroups.
                </p>
                <div className="failure-box">
                    <strong>What failed:</strong> Signals sent to PID 1 did not propagate to child processes. SIGTERM failed to shut down containers cleanly, leaving orphaned processes.
                </div>
                <div className="learning-box">
                    <strong>Constraint:</strong> PID 1 has special semantics. Containers require an init-like process to forward signals and reap children reliably.
                </div>
            </div>
        </section>
    );
}
