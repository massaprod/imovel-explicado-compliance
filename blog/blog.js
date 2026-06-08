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
  const attribution = {
    utmSource: params.get("utm_source") || "blog",
    utmMedium: params.get("utm_medium") || "owned",
    utmCampaign: params.get("utm_campaign") || "conteudo_imovel_explicado",
    utmContent: params.get("utm_content") || slug,
    utmTerm: params.get("utm_term") || undefined,
  };

  const track = (eventName, metadata = {}) => {
    const body = JSON.stringify({
      visitorId,
      sessionId,
      eventName,
      path: window.location.pathname || "/blog/",
      referrer: document.referrer,
      ...attribution,
      metadata,
    });

    if (navigator.sendBeacon) {
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

  document.querySelectorAll(".js-triage-link").forEach((link) => {
    const url = new URL(link.href);
    url.searchParams.set("vxid", visitorId);
    url.searchParams.set("sxid", sessionId);
    url.searchParams.set("utm_source", attribution.utmSource);
    url.searchParams.set("utm_medium", attribution.utmMedium);
    url.searchParams.set("utm_campaign", attribution.utmCampaign);
    url.searchParams.set("utm_content", attribution.utmContent);
    link.href = url.toString();
    link.addEventListener("click", () => track("blog_cta_click", { slug }));
  });

  track("blog_page_view", { slug });
})();
