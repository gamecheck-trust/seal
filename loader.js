(function () {
  try {
    const scriptEl =
      document.currentScript ||
      document.querySelector("script[data-gcs-id]");
    if (!scriptEl) return;

    const sealId = scriptEl.getAttribute("data-gcs-id");
    if (!sealId) return;

    let sealData = null;
    let allowedDomainsSet = null;
    let domainRanges = null;
    const sealDataPromise = fetch(
      `https://qa.gawetyk7890.com/json/${sealId}.json?v=${Date.now()}`
    )
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        sealData = json;
        allowedDomainsSet = new Set(json.allowedDomains || []);
        domainRanges = json.ranges || [];
        runInit();
        return json;
      })
      .catch(() => null);

    let initTimer;
    function runInit() {
      clearTimeout(initTimer);
      initTimer = setTimeout(safeInit, 50);
    }

    function safeInit() {
      try {
        if (!sealData || !allowedDomainsSet) return;

        const hostname = window.location.hostname;
        const hostnameParts = hostname.split(".");
        const domain = hostnameParts.slice(-2).join(".");
        const secondLevelDomain = hostnameParts.slice(-3).join(".");

        const exactMatch =
          allowedDomainsSet.has(domain) ||
          allowedDomainsSet.has(secondLevelDomain);

        const rangeMatch =
          domainRanges.length > 0 &&
          allowedDomainsSet.size > 0 &&
          (() => {
            const numMatch = hostname.match(/(\d+)/);
            if (!numMatch) return false;
            const num = parseInt(numMatch[1], 10);
            const baseDomain = hostname.replace(/\d+/, "");
            if (
              !allowedDomainsSet.has(baseDomain) &&
              !allowedDomainsSet.has(baseDomain.replace(/^\./, ""))
            )
              return false;
            return domainRanges.some(
              (r) => num >= r.start && num <= r.end
            );
          })();

        if (!exactMatch && !rangeMatch) return;

        const imageUUID = sealData.imageUUID || sealId;
        const clickUUID = sealData.clickUUID || sealId;
        const clickDomain = sealData.clickDomain || "qa.gamecheck.tech";
        const containerId = sealData.containerId || "trust-seal-container";

        const sealContainer = document.getElementById(containerId);
        if (!sealContainer) return;

        const anchorId = containerId + "-a";
        if (document.getElementById(anchorId)) return;

        const sealHref = `https://${clickDomain}/seal-scan/${clickUUID}`;
        const imageUrl = `https://qa.gawetyk7890.com/seal/${imageUUID}.png`;
        const width = sealData.width || 217.75;
        const height = sealData.height || 64;

        const sealHTML = `<a id="${anchorId}"
          href="${sealHref}?referrer=${encodeURIComponent(hostname)}"
          target="_blank"></a>`;
        sealContainer.innerHTML = sealHTML;

        const styleId = "trust-seal-style-" + sealId;
        if (!document.getElementById(styleId)) {
          const style = document.createElement("style");
          style.id = styleId;
          style.innerHTML = `
            #${anchorId} {
              position: relative;
              display: block;
              width: ${width}px;
              height: ${height}px;
              background-image: url(${imageUrl});
              background-size: cover;
              cursor: pointer;
              transition: transform 0.3s ease-in-out;
            }
            #${anchorId}:hover {
              transform: scale(1.1);
            }
          `;
          document.head.appendChild(style);
        }
      } catch (e) {}
    }

    runInit();


    function observeUrlChanges(callback) {
      let oldHref = location.href;

      const check = () => {
        const newHref = location.href;
        if (oldHref !== newHref) {
          oldHref = newHref;
          callback();
        }
      };

      history.pushState = ((f) =>
        function pushState() {
          const r = f.apply(this, arguments);
          check();
          return r;
        })(history.pushState);

      history.replaceState = ((f) =>
        function replaceState() {
          const r = f.apply(this, arguments);
          check();
          return r;
        })(history.replaceState);

      window.addEventListener("popstate", check);
    }

    observeUrlChanges(runInit);

    const anchorId =
      ((sealData && sealData.containerId) || "trust-seal-container") + "-a";
    new MutationObserver(() => {
      if (!document.getElementById(anchorId)) runInit();
    }).observe(document.body, { childList: true, subtree: true });
  } catch (e) {}
})();
