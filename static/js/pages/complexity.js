// Complexity Page - Expand/Collapse and Stats Loading

document.addEventListener('DOMContentLoaded', function() {
    // Setup expand/collapse all
    setupExpandCollapseAll('toggle-all-sections', '.complexity-section details');

    // Fetch complexity and difficulty stats for headers
    // Note: totalCount is injected via data attribute in template
    const totalCount = parseInt(document.getElementById('stats-text').getAttribute('data-total-count') || '0', 10);

    Promise.all([
        fetch('/api/stats/complexity').then(r => r.json()),
        fetch('/api/stats/difficulty').then(r => r.json())
    ])
        .then(([complexityStats, difficultyStats]) => {
            // Line 1: Total solutions with top complexity patterns
            const stats = formatTopStats(complexityStats, 7);
            let line1Text = `${totalCount} total solution${totalCount !== 1 ? 's' : ''} — ${stats.text}`;
            if (stats.remaining > 0) {
                line1Text += `, Other: ${stats.remaining}`;
            }
            document.getElementById('stats-text').textContent = line1Text;

            // Line 2: Difficulty breakdown
            const easyCount = difficultyStats.easy || 0;
            const mediumCount = difficultyStats.medium || 0;
            const hardCount = difficultyStats.hard || 0;

            document.getElementById('difficulty-stats').textContent = `Difficulty breakdown — Easy: ${easyCount}, Medium: ${mediumCount}, Hard: ${hardCount}`;
        })
        .catch(error => {
            console.error('Failed to load stats:', error);
        });

    // Fetch per-complexity difficulty breakdowns
    document.querySelectorAll('.section-breakdown[data-complexity]').forEach(span => {
        const complexityKey = span.getAttribute('data-complexity');

        fetchStats(
            `/api/stats/difficulty/complexity/${complexityKey}`,
            function(difficultyCounts) {
                const text = `Easy: ${difficultyCounts.easy || 0}, Medium: ${difficultyCounts.medium || 0}, Hard: ${difficultyCounts.hard || 0}`;
                span.textContent = text;
            },
            `Failed to load difficulty stats for ${complexityKey}:`,
            function() {
                span.textContent = 'Loading failed';
            }
        );
    });
});
