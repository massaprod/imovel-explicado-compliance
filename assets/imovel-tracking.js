(() => {
  "use strict";

  const existing = window.ImovelExplicado || {};
  const config = {
    phone: "5511964492988",
    analyticsEndpoint: "https://imovel-explicado-contratos.onrender.com/api/analytics/event",
    defaultSource: "site",
    defaultMedium: "organic",
    defaultCampaign: "imovel_explicado",
    defaultContent: undefined,
    page: undefined,
    gtmId: "",
    metaPixelId: "",
    metaPixelDelay: 6500,
    googleAdsConversionId: "",
    googleAdsConversions: {},
    includeAttributionInWhatsApp: false,
    sendLocalAnalytics: false,
    debug: ["localhost", "127.0.0.1"].includes(window.location.hostname),
    ...(window.ImovelExplicadoConfig || {}),
  };

  const params = new URLSearchParams(window.location.search);
  const fired = new Set();

  const getId = (key, storage) => {
    try {
      const existingId = storage.getItem(key);
      if (existingId) return existingId;
      const generated = window.crypto && window.crypto.randomUUID
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      storage.setItem(key, generated);
      return generated;
    } catch (_error) {
      return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
  };

  const visitorId = getId("visitorId", window.localStorage);
  const sessionId = getId("visitorSessionId", window.sessionStorage);

  const clean = (value) => {
    if (value === undefined || value === null || value === "") return undefined;
    if (typeof value === "number" && Number.isNaN(value)) return undefined;
    return value;
  };

  const cleanObject = (input) => Object.fromEntries(
    Object.entries(input || {}).filter(([, value]) => clean(value) !== undefined)
  );

  const getGoogleAdsId = () => String(config.googleAdsConversionId || "").replace(/^AW-/i, "");

  const sendGoogleAdsConversion = (eventName, attribution, eventMetadata) => {
    const googleAdsId = getGoogleAdsId();
    const conversion = config.googleAdsConversions?.[eventName];
    if (!googleAdsId || !conversion || !conversion.label || typeof window.gtag !== "function") return;

    const dedupeKey = `google_ads:${conversion.dedupeKey || eventName}`;
    if (conversion.once !== false && fired.has(dedupeKey)) return;
    if (conversion.once !== false) fired.add(dedupeKey);

    try {
      window.gtag("event", "conversion", cleanObject({
        send_to: conversion.sendTo || `AW-${googleAdsId}/${conversion.label}`,
        value: conversion.value ?? eventMetadata.value,
        currency: conversion.currency || eventMetadata.currency || "BRL",
        transaction_id: conversion.transactionId || `${sessionId}:${eventName}`,
        page_path: attribution.path,
        event_source: eventName,
      }));
    } catch (_error) {}
  };

  const getAttribution = () => cleanObject({
    visitorId,
    sessionId,
    page: config.page || document.body?.dataset.page || document.body?.dataset.slug || window.location.pathname.replace(/^\/+/, "") || "home",
    path: window.location.pathname || "/",
    url: window.location.href,
    referrer: document.referrer || undefined,
    utmSource: params.get("utm_source") || config.defaultSource,
    utmMedium: params.get("utm_medium") || config.defaultMedium,
    utmCampaign: params.get("utm_campaign") || config.defaultCampaign,
    utmContent: params.get("utm_content") || config.defaultContent,
    utmTerm: params.get("utm_term") || undefined,
    gclid: params.get("gclid") || undefined,
    gbraid: params.get("gbraid") || undefined,
    wbraid: params.get("wbraid") || undefined,
    fbclid: params.get("fbclid") || undefined,
    msclkid: params.get("msclkid") || undefined,
    ttclid: params.get("ttclid") || undefined,
  });

  const sendInternalAnalytics = (eventName, metadata, preferBeacon) => {
    if (!config.analyticsEndpoint) return;
    if (config.debug && !config.sendLocalAnalytics) return;
    const endpointUrl = new URL(config.analyticsEndpoint, window.location.href);
    const isCrossOrigin = endpointUrl.origin !== window.location.origin;
    const payload = {
      ...getAttribution(),
      eventName,
      metadata: cleanObject({
        ...metadata,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        trackingVersion: "shared_imovel_tracking_20260616",
      }),
      timestamp: new Date().toISOString(),
    };
    const body = JSON.stringify(payload);

    try {
      if (preferBeacon && !isCrossOrigin && navigator.sendBeacon) {
        const ok = navigator.sendBeacon(config.analyticsEndpoint, new Blob([body], { type: "application/json" }));
        if (ok) return;
      }
      fetch(config.analyticsEndpoint, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    } catch (_error) {
      // Tracking must never interrupt the paid traffic experience.
    }
  };

  const trackEvent = (eventName, metadata = {}, options = {}) => {
    if (!eventName) return;
    const eventMetadata = cleanObject(metadata);
    const dedupeKey = options.dedupeKey || `${eventName}:${JSON.stringify(eventMetadata)}`;
    if ((options.once || options.dedupeKey) && fired.has(dedupeKey)) return;
    if (options.once || options.dedupeKey) fired.add(dedupeKey);

    const attribution = getAttribution();
    const eventPayload = cleanObject({
      event: eventName,
      ...attribution,
      ...eventMetadata,
    });

    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(eventPayload);
    } catch (_error) {}

    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, cleanObject({ ...attribution, ...eventMetadata }));
      }
    } catch (_error) {}

    sendGoogleAdsConversion(eventName, attribution, eventMetadata);

    try {
      if (typeof window.fbq === "function") {
        window.fbq("trackCustom", eventName, cleanObject({ ...eventMetadata, page: attribution.page }));
      }
    } catch (_error) {}

    if (config.debug) {
      console.debug("[ImovelExplicado tracking]", eventName, eventPayload);
    }

    sendInternalAnalytics(eventName, eventMetadata, options.preferBeacon !== false);
  };

  const createWhatsAppLink = (message, source, campaign, service) => {
    const parts = [message || "Ola, Luis. Quero fazer uma triagem pelo Imovel Explicado."];
    if (config.includeAttributionInWhatsApp) {
      const sourceLine = [source, campaign].filter(Boolean).join(" / ");
      if (service) parts.push(`Servico de interesse: ${service}`);
      if (sourceLine) parts.push(`Origem: ${sourceLine}`);
    }
    const url = new URL(`https://wa.me/${config.phone}`);
    url.searchParams.set("text", parts.filter(Boolean).join("\n\n"));
    return url.toString();
  };

  const bindWhatsAppLinks = () => {
    document.querySelectorAll(".js-whatsapp, .js-whatsapp-link, [data-whatsapp-message]").forEach((link) => {
      if (link.dataset.imovelTrackingBound === "whatsapp") return;
      link.dataset.imovelTrackingBound = "whatsapp";
      const message = link.dataset.message || link.dataset.whatsappMessage || "Ola, Luis. Quero fazer uma triagem pelo Imovel Explicado.";
      const source = link.dataset.source || config.defaultSource;
      const campaign = link.dataset.campaign || params.get("utm_campaign") || config.defaultCampaign;
      const service = link.dataset.service || undefined;
      link.href = createWhatsAppLink(message, source, campaign, service);
      link.addEventListener("click", () => {
        const eventName = link.dataset.event || "click_whatsapp";
        const metadata = cleanObject({
          source,
          campaign,
          service,
          value: link.dataset.value ? Number(link.dataset.value) : undefined,
          label: link.textContent?.trim(),
          location: link.dataset.location || undefined,
        });
        trackEvent(eventName, metadata, { preferBeacon: false });
        trackEvent("click_whatsapp_qualificado", metadata, { preferBeacon: false });
      });
    });
  };

  const bindTrackedElements = () => {
    document.querySelectorAll("[data-track]").forEach((node) => {
      if (node.dataset.imovelTrackingBound === "track") return;
      node.dataset.imovelTrackingBound = "track";
      node.addEventListener("click", () => {
        trackEvent(node.dataset.track, cleanObject({
          label: node.textContent?.trim(),
          href: node.getAttribute("href") || undefined,
        }), { preferBeacon: false });
      });
    });
  };

  const bindFaq = () => {
    document.querySelectorAll("details").forEach((item) => {
      if (item.dataset.imovelTrackingBound === "faq") return;
      item.dataset.imovelTrackingBound = "faq";
      item.addEventListener("toggle", () => {
        if (!item.open) return;
        trackEvent("faq_open", {
          question: item.querySelector("summary")?.textContent?.trim(),
        }, { once: true });
      });
    });
  };

  const bindScrollDepth = () => {
    if (window.__imovelScrollTrackingBound) return;
    window.__imovelScrollTrackingBound = true;
    let scroll50 = false;
    let scroll90 = false;
    window.addEventListener("scroll", () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const progress = window.scrollY / max;
      if (!scroll50 && progress >= 0.5) {
        scroll50 = true;
        trackEvent("scroll_50", {}, { once: true });
      }
      if (!scroll90 && progress >= 0.9) {
        scroll90 = true;
        trackEvent("scroll_90", {}, { once: true });
      }
    }, { passive: true });
  };

  const initGTM = (gtmId = config.gtmId) => {
    if (!gtmId || !/^GTM-[A-Z0-9]+$/i.test(gtmId) || window.__imovelGtmLoaded) return;
    window.__imovelGtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    const firstScript = document.getElementsByTagName("script")[0];
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    firstScript.parentNode.insertBefore(script, firstScript);
  };

  const initGoogleAds = (conversionId = config.googleAdsConversionId) => {
    const googleAdsId = String(conversionId || "").replace(/^AW-/i, "");
    if (!/^\d+$/.test(googleAdsId) || window.__imovelGoogleAdsLoaded) return;
    window.__imovelGoogleAdsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", `AW-${googleAdsId}`);
    const firstScript = document.getElementsByTagName("script")[0];
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=AW-${encodeURIComponent(googleAdsId)}`;
    firstScript.parentNode.insertBefore(script, firstScript);
  };

  const initMetaPixel = (pixelId = config.metaPixelId) => {
    if (!pixelId || window.fbq || window.__imovelMetaPixelLoaded) return;
    window.__imovelMetaPixelLoaded = true;
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
  };

  const init = () => {
    initGTM();
    initGoogleAds();
    bindWhatsAppLinks();
    bindTrackedElements();
    bindFaq();
    bindScrollDepth();
    trackEvent(config.pageViewEvent || "page_view", {}, { once: true });
    if (config.metaPixelId) {
      const load = () => setTimeout(() => initMetaPixel(), config.metaPixelDelay);
      if ("requestIdleCallback" in window) {
        requestIdleCallback(load, { timeout: 3500 });
      } else {
        window.addEventListener("load", load, { once: true });
      }
    }
  };

  window.ImovelExplicado = {
    ...existing,
    config,
    createWhatsAppLink,
    trackEvent,
    bindWhatsAppLinks,
    bindTrackedElements,
    initGTM,
    initGoogleAds,
    initMetaPixel,
    init,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
