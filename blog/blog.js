(() => {
  const renderBase = "https://imovel-explicado-contratos.onrender.com";
  const analyticsEndpoint = `${renderBase}/api/analytics/event`;
  const params = new URLSearchParams(window.location.search);
  const slug = document.body.dataset.slug || "blog";

  const getId = (key) => {
    const storage = key === "visitorSessionId" ? window.sessionStorage : window.localStorage;
    const existing = storage.getItem(key);
    if (existing) return existing;
    const generated = window.crypto && window.crypto.randomUUID
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    storage.setItem(key, generated);
    return generated;
  };

  const visitorId = getId("visitorId");
  const sessionId = getId("visitorSessionId");
  const startedAt = Date.now();
  let maxScrollPercent = 0;
  const attribution = {
    utmSource: params.get("utm_source") || "blog",
    utmMedium: params.get("utm_medium") || "owned",
    utmCampaign: params.get("utm_campaign") || "conteudo_imovel_explicado",
    utmContent: params.get("utm_content") || slug,
    utmTerm: params.get("utm_term") || undefined,
  };

  const updateScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const percent = documentHeight <= viewportHeight
      ? 100
      : Math.round(((scrollTop + viewportHeight) / documentHeight) * 100);
    maxScrollPercent = Math.max(maxScrollPercent, Math.min(percent, 100));
  };

  const track = (eventName, metadata = {}, preferBeacon = true) => {
    const body = JSON.stringify({
      visitorId,
      sessionId,
      eventName,
      path: window.location.pathname || "/blog/",
      referrer: document.referrer,
      ...attribution,
      metadata: {
        ...metadata,
        trackingVersion: "cloudflare_blog_20260608",
      },
    });

    if (preferBeacon && navigator.sendBeacon) {
      const queued = navigator.sendBeacon(analyticsEndpoint, new Blob([body], { type: "application/json" }));
      if (queued) return;
    }

    fetch(analyticsEndpoint, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  };

  const flushPageTime = () => {
    updateScroll();
    const durationMs = Date.now() - startedAt;
    if (durationMs < 1000) return;
    track("blog_page_time", { slug, durationMs, maxScrollPercent });
  };

  document.querySelectorAll(".js-triage-link").forEach((link) => {
    const url = new URL(link.href);
    url.searchParams.set("vxid", visitorId);
    url.searchParams.set("sxid", sessionId);
    url.searchParams.set("utm_source", attribution.utmSource);
    url.searchParams.set("utm_medium", attribution.utmMedium);
    url.searchParams.set("utm_campaign", attribution.utmCampaign);
    url.searchParams.set("utm_content", attribution.utmContent);
    link.href = url.toString();
    link.addEventListener("click", () => {
      updateScroll();
      track("blog_cta_click", { slug, maxScrollPercent }, false);
      flushPageTime();
    });
  });

  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("pagehide", flushPageTime);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushPageTime();
  });
  track("blog_page_view", { slug });
})();
