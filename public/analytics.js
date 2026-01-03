(function () {

    function generateUUID() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    }

    const session_duration = 12 * 60 * 60 * 1000; // 12 hours 
    const now = Date.now();
    let visitorId = localStorage.getItem('webtrack_visitor_id');
    const sessionTime = localStorage.getItem('webtrack_session_time');
    if (!visitorId || (now - sessionTime) > session_duration) {
        if (visitorId) {
            localStorage.removeItem('webtrack_visitor_id');
            localStorage.removeItem('webtrack_session_time');
        }
        visitorId = generateUUID();
        localStorage.setItem('webtrack_visitor_id', visitorId);
        localStorage.setItem('webtrack_session_time', now);
    }

    const script = document.currentScript;
    const baseUrl = new URL(script.src).origin;
    const websiteId = script.getAttribute('data-website-id');
    const pageViewId = generateUUID();

    // Get Entry Time
    const entryTime = Date.now();

    // Get Referrer
    const referrer = document.referrer || 'direct';

    // Get URL
    const url = window.location.href;

    //Get UTM Sources
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || null;
    const utmMedium = urlParams.get('utm_medium') || null;
    const utmCampaign = urlParams.get('utm_campaign') || null;

    const refParams = window.location.href.split('?')[1] || null;

    const entryData = {
        id: pageViewId,
        websiteId,
        visitorId,
        type: 'entry',
        entryTime,
        referrer,
        url,
        utmSource,
        utmMedium,
        utmCampaign,
        refParams,
    };

    fetch(baseUrl + '/api/track', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entryData),
    });

    let totalActiveTime = 0;
    const handleExit = () => {
        const exitTime = Date.now();
        totalActiveTime += Date.now() - entryTime;
        const exitData = {
            id: pageViewId,
            type: 'exit',
            visitorId,
            exitTime,
            websiteId,
            totalActiveTime,
        };
        fetch(baseUrl + '/api/track', {
            method: 'POST',
            keepalive: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exitData),
        });
    };

    window.addEventListener('beforeunload', handleExit);
    // window.addEventListener('pagehide', handleExit);
})();