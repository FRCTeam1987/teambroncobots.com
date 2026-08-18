function updateEventBuckets() {
    const now = Date.now();
    const buckets = {
        upcoming: document.getElementById('upcoming-tbody'),
        active: document.getElementById('active-tbody'),
        past: document.getElementById('past-tbody'),
    };
    const sections = {
        upcoming: document.getElementById('upcoming-section'),
        active: document.getElementById('active-section'),
        past: document.getElementById('past-section'),
    };

    const rows = Array.from(
        document.querySelectorAll('#upcoming-tbody tr, #active-tbody tr, #past-tbody tr')
    );

    rows.forEach(function (row) {
        const start = new Date(row.getAttribute('data-start')).getTime();
        const endAttr = row.getAttribute('data-end');
        const end = endAttr ? new Date(endAttr).getTime() : start;

        let bucket;
        if (start > now) {
            bucket = 'upcoming';
        } else if (end >= now) {
            bucket = 'active';
        } else {
            bucket = 'past';
        }
        buckets[bucket].appendChild(row);
        const liveBadge = row.querySelector('.event-live-badge');
        if (liveBadge) {
            liveBadge.style.display = bucket === 'active' ? '' : 'none';
        }
    });

    sortTbody(buckets.upcoming, 1);
    sortTbody(buckets.past, -1);

    Object.keys(buckets).forEach(function (key) {
        const hasRows = buckets[key].rows.length > 0;
        sections[key].style.display = hasRows ? '' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', function () {
    updateEventBuckets();
    setInterval(updateEventBuckets, 1000);
});

function sortTbody(tbody, direction) {
    const rows = Array.from(tbody.querySelectorAll('tr'));
    rows
        .sort(function (a, b) {
            const aStart = new Date(a.getAttribute('data-start')).getTime();
            const bStart = new Date(b.getAttribute('data-start')).getTime();
            return (aStart - bStart) * direction;
        })
        .forEach(function (row) {
            tbody.appendChild(row);
        });
}
