(function () {
    'use strict';

    const originalFetch = window.fetch;
    const TARGET_URL = "orgsearch.sheerid.net/rest/organization/search";

    const updateCountry = (url) => {
        const u = new URL(url, location.origin);
        if (u.searchParams.has('country')) u.searchParams.set('country', 'VN');
        return u.toString();
    };

    window.fetch = function (input, init) {
        let url = typeof input === 'string' ? input :
                  input instanceof Request ? input.url : '';

        if (!url.includes(TARGET_URL)) return originalFetch(input, init);

        const newUrl = updateCountry(url);

        if (typeof input === 'string') {
            return originalFetch(newUrl, init);
        }

        const newRequest = new Request(newUrl, input);
        return originalFetch(newRequest, init);
    };
})();
