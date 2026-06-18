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
    ga4MeasurementId: "",
    clarityId: "",
    metaPixelId: "",
    metaPixelDelay: 6500,
    googleAdsConversionId: "",
    googleAdsConversions: {},
    metaStandardEvents: {
      click_whatsapp_qualificado: "Contact",
      click_whatsapp_triagem_summary: "Contact",
      continue_whatsapp_after_triagem: "Contact",
      submit_triagem: "Lead",
      submit_triagem_google_contract: "Lead",
      triagem_success: "Lead",
    },
    includeAttributionInWhatsApp: false,
    sendLocalAnalytics: false,
    leadIdPrefix: "IE",
    trackingVersion: "shared_imovel_tracking_20260618",
    debug: ["localhost", "127.0.0.1"].includes(window.location.hostname),
    ...(window.ImovelExplicadoConfig || {}),
  };

  const params = new URLSearchParams(window.location.search);
  const fired = new Set();
  const storagePrefix = "imovelExplicado:";

  const clean = (value) => {
    if (value === undefined || value === null || value === "") return undefined;
    if (typeof value === "number" && Number.isNaN(value)) return undefined;
    return value;
  };

  const cleanObject = (input) => Object.fromEntries(
    Object.entries(input || {}).filter(([, value]) => clean(value) !== undefined)
  );

  const readJson = (storage, key) => {
    try {
      const value = storage.getItem(key);
      return value ? JSON.parse(value) : undefined;
    } catch (_error) {
      return undefined;
    }
  };

  const writeJson = (storage, key, value) => {
    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (_error) {}
  };

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

  const getCookie = (name) => {
    try {
      return document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`))
        ?.split("=")
        .slice(1)
        .join("=");
    } catch (_error) {
      return undefined;
    }
  };

  const getPage = () => (
    config.page
    || document.body?.dataset.page
    || document.body?.dataset.slug
    || window.location.pathname.replace(/^\/+/, "").replace(/\/$/, "")
    || "home"
  );

  const getCurrentTouch = () => cleanObject({
    source: params.get("utm_source") || config.defaultSource,
    medium: params.get("utm_medium") || config.defaultMedium,
    campaign: params.get("utm_campaign") || config.defaultCampaign,
    content: params.get("utm_content") || config.defaultContent,
    term: params.get("utm_term") || undefined,
    gclid: params.get("gclid") || undefined,
    gbraid: params.get("gbraid") || undefined,
    wbraid: params.get("wbraid") || undefined,
    fbclid: params.get("fbclid") || undefined,
    msclkid: params.get("msclkid") || undefined,
    ttclid: params.get("ttclid") || undefined,
    referrer: document.referrer || undefined,
    landingPage: window.location.pathname || "/",
    landingUrl: window.location.href,
    page: getPage(),
    timestamp: new Date().toISOString(),
  });

  const persistAttribution = () => {
    const currentTouch = getCurrentTouch();
    const firstKey = `${storagePrefix}firstTouch`;
    const lastKey = `${storagePrefix}lastTouch`;
    const sessionKey = `${storagePrefix}sessionTouch`;
    if (!readJson(window.localStorage, firstKey)) {
      writeJson(window.localStorage, firstKey, currentTouch);
    }
    writeJson(window.localStorage, lastKey, currentTouch);
    writeJson(window.sessionStorage, sessionKey, currentTouch);
    return currentTouch;
  };

  const currentTouch = persistAttribution();

  const prefixTouch = (prefix, touch = {}) => cleanObject({
    [`${prefix}_source`]: touch.source,
    [`${prefix}_medium`]: touch.medium,
    [`${prefix}_campaign`]: touch.campaign,
    [`${prefix}_content`]: touch.content,
    [`${prefix}_term`]: touch.term,
    [`${prefix}_landing_page`]: touch.landingPage,
    [`${prefix}_landing_url`]: touch.landingUrl,
    [`${prefix}_timestamp`]: touch.timestamp,
  });

  const getAttribution = () => {
    const firstTouch = readJson(window.localStorage, `${storagePrefix}firstTouch`) || currentTouch;
    const lastTouch = readJson(window.localStorage, `${storagePrefix}lastTouch`) || currentTouch;
    return cleanObject({
      visitorId,
      sessionId,
      page: getPage(),
      path: window.location.pathname || "/",
      url: window.location.href,
      referrer: document.referrer || lastTouch.referrer || undefined,
      utmSource: currentTouch.source,
      utmMedium: currentTouch.medium,
      utmCampaign: currentTouch.campaign,
      utmContent: currentTouch.content,
      utmTerm: currentTouch.term,
      gclid: currentTouch.gclid || lastTouch.gclid || firstTouch.gclid,
      gbraid: currentTouch.gbraid || lastTouch.gbraid || firstTouch.gbraid,
      wbraid: currentTouch.wbraid || lastTouch.wbraid || firstTouch.wbraid,
      fbclid: currentTouch.fbclid || lastTouch.fbclid || firstTouch.fbclid,
      fbp: getCookie("_fbp"),
      fbc: getCookie("_fbc"),
      msclkid: currentTouch.msclkid || lastTouch.msclkid || firstTouch.msclkid,
      ttclid: currentTouch.ttclid || lastTouch.ttclid || firstTouch.ttclid,
      firstLandingPage: firstTouch.landingPage,
      firstLandingUrl: firstTouch.landingUrl,
      lastLandingPage: lastTouch.landingPage,
      ...prefixTouch("first_touch", firstTouch),
      ...prefixTouch("last_touch", lastTouch),
    });
  };

  const randomToken = (length = 4) => Math.random().toString(36).replace(/[^a-z0-9]/gi, "").slice(2, 2 + length).toUpperCase();

  const createLeadId = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${config.leadIdPrefix}-${yyyy}${mm}${dd}-${randomToken(4)}`;
  };

  const createEventId = (eventName) => `${getPage()}:${eventName}:${Date.now()}:${randomToken(6)}`;

  const getGoogleAdsId = () => String(config.googleAdsConversionId || "").replace(/^AW-/i, "");

  const sendGoogleAdsConversion = (eventName, attribution, eventMetadata) => {
    const googleAdsId = getGoogleAdsId();
    const conversion = config.googleAdsConversions?.[eventName];
    if (!googleAdsId || !conversion || !conversion.label || typeof window.gtag !== "function") return;

    const dedupeKey = `google_ads:${conversion.dedupeKey || eventName}:${eventMetadata.lead_id || sessionId}`;
    if (conversion.once !== false && fired.has(dedupeKey)) return;
    if (conversion.once !== false) fired.add(dedupeKey);

    try {
      window.gtag("event", "conversion", cleanObject({
        send_to: conversion.sendTo || `AW-${googleAdsId}/${conversion.label}`,
        value: conversion.value ?? eventMetadata.value,
        currency: conversion.currency || eventMetadata.currency || "BRL",
        transaction_id: conversion.transactionId || eventMetadata.lead_id || `${sessionId}:${eventName}`,
        page_path: attribution.path,
        event_source: eventName,
        lead_id: eventMetadata.lead_id,
      }));
    } catch (_error) {}
  };

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
        trackingVersion: config.trackingVersion,
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
    const eventId = options.eventId || metadata.event_id || createEventId(eventName);
    const eventMetadata = cleanObject({ ...metadata, event_id: eventId });
    const dedupeKey = options.dedupeKey || `${eventName}:${JSON.stringify(eventMetadata)}`;
    if ((options.once || options.dedupeKey) && fired.has(dedupeKey)) return;
    if (options.once || options.dedupeKey) fired.add(dedupeKey);

    const attribution = getAttribution();
    const eventPayload = cleanObject({
      event: eventName,
      event_id: eventId,
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
      if (
        config.metaPixelId
        && typeof window.fbq !== "function"
        && /^(click_whatsapp_qualificado|click_whatsapp_triagem_summary|continue_whatsapp_after_triagem|submit_triagem|submit_triagem_google_contract|triagem_success)$/.test(eventName)
      ) {
        initMetaPixel();
      }
      if (typeof window.fbq === "function") {
        const metaPayload = cleanObject({ ...eventMetadata, page: attribution.page });
        const metaOptions = { eventID: eventId };
        window.fbq("trackCustom", eventName, metaPayload, metaOptions);
        const standardEvent = config.metaStandardEvents?.[eventName];
        if (standardEvent) {
          window.fbq("track", standardEvent, metaPayload, metaOptions);
        }
      }
    } catch (_error) {}

    if (config.debug) {
      console.debug("[ImovelExplicado tracking]", eventName, eventPayload);
    }

    sendInternalAnalytics(eventName, eventMetadata, options.preferBeacon !== false);

    if (!options.derived && /^submit_triagem/.test(eventName)) {
      trackEvent("triagem_success", eventMetadata, {
        derived: true,
        preferBeacon: false,
        dedupeKey: `triagem_success:${eventMetadata.lead_id || sessionId}`,
      });
      trackEvent("lead_triagem", eventMetadata, {
        derived: true,
        preferBeacon: false,
        dedupeKey: `lead_triagem:${eventMetadata.lead_id || sessionId}`,
      });
    }
  };

  const trackConversion = (eventName, metadata = {}) => trackEvent(eventName, metadata, { preferBeacon: false });

  const decodeMessage = (raw) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = raw || "Ola, Luis. Quero fazer uma triagem pelo Imovel Explicado.";
    return textarea.value;
  };

  const appendLeadContext = (message, source, campaign, service, leadId) => {
    const parts = [decodeMessage(message)];
    if (leadId && !/Codigo:/i.test(parts[0])) parts.push(`Codigo: ${leadId}`);
    if (config.includeAttributionInWhatsApp) {
      const sourceLine = [source, campaign].filter(Boolean).join(" / ");
      if (service) parts.push(`Servico de interesse: ${service}`);
      if (sourceLine) parts.push(`Origem: ${sourceLine}`);
    }
    return parts.filter(Boolean).join("\n\n");
  };

  const createWhatsAppLink = (message, source, campaign, service, leadId) => {
    const url = new URL(`https://wa.me/${config.phone}`);
    url.searchParams.set("text", appendLeadContext(message, source, campaign, service, leadId));
    return url.toString();
  };

  const inferLocation = (eventName, link) => {
    const declared = link.dataset.location;
    if (declared) return declared;
    const input = `${eventName || ""} ${link.className || ""}`.toLowerCase();
    if (input.includes("header")) return "header";
    if (input.includes("hero")) return "hero";
    if (input.includes("sticky")) return "sticky_mobile";
    if (input.includes("final")) return "final_cta";
    if (input.includes("plan")) return "pricing_card";
    if (input.includes("service") || input.includes("card")) return "service_card";
    return "cta";
  };

  const handleWhatsAppClick = (linkOrOptions = {}) => {
    const isElement = linkOrOptions && typeof linkOrOptions.getAttribute === "function";
    const link = isElement ? linkOrOptions : undefined;
    const options = isElement ? {} : linkOrOptions;
    const attribution = getAttribution();
    const eventName = link?.dataset.event || options.eventName || "click_whatsapp";
    const source = link?.dataset.source || options.source || attribution.utmSource || config.defaultSource;
    const campaign = link?.dataset.campaign || options.campaign || attribution.utmCampaign || config.defaultCampaign;
    const service = link?.dataset.service || options.service || undefined;
    const location = inferLocation(eventName, link || { dataset: {}, className: "" });
    const leadId = options.leadId || createLeadId();
    const value = link?.dataset.value ? Number(link.dataset.value) : options.value;
    const message = link?.dataset.message || link?.dataset.whatsappMessage || options.message || "Ola, Luis. Vim pelo site Imovel Explicado e quero fazer uma triagem imobiliaria.";
    const metadata = cleanObject({
      lead_id: leadId,
      service,
      page: attribution.page,
      location,
      source,
      medium: attribution.utmMedium,
      campaign,
      content: attribution.utmContent,
      term: attribution.utmTerm,
      gclid: attribution.gclid,
      fbclid: attribution.fbclid,
      value,
      intent: link?.dataset.intent || options.intent || undefined,
      label: link?.textContent?.trim() || options.label,
      timestamp: new Date().toISOString(),
    });

    if (link) link.href = createWhatsAppLink(message, source, campaign, service, leadId);
    trackEvent(eventName, metadata, { preferBeacon: false, dedupeKey: `whatsapp:${leadId}:${eventName}` });
    trackEvent(`click_cta_${location}`, metadata, { preferBeacon: false, dedupeKey: `cta:${leadId}:${location}` });
    trackEvent("click_whatsapp_qualificado", metadata, { preferBeacon: false, dedupeKey: `whatsapp:${leadId}:qualified` });
    trackEvent("lead_whatsapp", metadata, { preferBeacon: false, dedupeKey: `lead_whatsapp:${leadId}` });
    return { leadId, href: link?.href };
  };

  const bindWhatsAppLinks = () => {
    document.querySelectorAll(".js-whatsapp, .js-whatsapp-link, [data-whatsapp-message]").forEach((link) => {
      if (link.dataset.imovelTrackingBound === "whatsapp") return;
      link.dataset.imovelTrackingBound = "whatsapp";
      const message = link.dataset.message || link.dataset.whatsappMessage || "Ola, Luis. Vim pelo site Imovel Explicado e quero fazer uma triagem imobiliaria.";
      const attribution = getAttribution();
      const source = link.dataset.source || attribution.utmSource || config.defaultSource;
      const campaign = link.dataset.campaign || attribution.utmCampaign || config.defaultCampaign;
      const service = link.dataset.service || undefined;
      link.href = createWhatsAppLink(message, source, campaign, service);
      link.addEventListener("click", () => handleWhatsAppClick(link));
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

  const bindAttributionLinks = () => {
    const attribution = getAttribution();
    const persisted = cleanObject({
      utm_source: attribution.utmSource,
      utm_medium: attribution.utmMedium,
      utm_campaign: attribution.utmCampaign,
      utm_content: attribution.utmContent,
      utm_term: attribution.utmTerm,
      gclid: attribution.gclid,
      fbclid: attribution.fbclid,
      vxid: visitorId,
      sxid: sessionId,
    });
    document.querySelectorAll("a[href]").forEach((link) => {
      if (link.dataset.imovelTrackingBound === "attribution") return;
      const rawHref = link.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:") || rawHref.includes("wa.me")) return;
      try {
        const url = new URL(rawHref, window.location.href);
        if (url.origin !== window.location.origin) return;
        Object.entries(persisted).forEach(([key, value]) => {
          if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
        });
        link.href = url.toString();
        link.dataset.imovelTrackingBound = "attribution";
      } catch (_error) {}
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

  const bindForms = () => {
    document.querySelectorAll("form").forEach((form) => {
      if (form.dataset.imovelTrackingBound === "form") return;
      form.dataset.imovelTrackingBound = "form";
      const formName = form.id || form.getAttribute("name") || "form";
      let started = false;
      const start = () => {
        if (started) return;
        started = true;
        trackEvent("start_triagem", { form: formName }, { preferBeacon: false, dedupeKey: `start:${formName}:${sessionId}` });
      };
      form.addEventListener("focusin", (event) => {
        start();
        const field = event.target?.name || event.target?.id;
        if (!field) return;
        trackEvent("field_focus_triagem", { form: formName, field }, {
          preferBeacon: false,
          dedupeKey: `field:${formName}:${field}:${sessionId}`,
        });
      });
      form.addEventListener("input", start, { once: true });
      form.addEventListener("invalid", (event) => {
        trackEvent("triagem_error", {
          form: formName,
          field: event.target?.name || event.target?.id,
          reason: "invalid_field",
        }, { preferBeacon: false });
      }, true);
    });
  };

  const bindScrollDepth = () => {
    if (window.__imovelScrollTrackingBound) return;
    window.__imovelScrollTrackingBound = true;
    const thresholds = [25, 50, 75, 90];
    const reached = new Set();
    window.addEventListener("scroll", () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const progress = Math.round((window.scrollY / max) * 100);
      thresholds.forEach((threshold) => {
        if (progress >= threshold && !reached.has(threshold)) {
          reached.add(threshold);
          trackEvent(`scroll_${threshold}`, {}, { once: true });
        }
      });
    }, { passive: true });
  };

  const bindTimeEvents = () => {
    if (window.__imovelTimeTrackingBound) return;
    window.__imovelTimeTrackingBound = true;
    [15, 30, 60, 120].forEach((seconds) => {
      window.setTimeout(() => {
        trackEvent(`time_${seconds}s`, { seconds }, { once: true });
      }, seconds * 1000);
    });
  };

  const bindSectionViews = () => {
    if (window.__imovelSectionTrackingBound || !("IntersectionObserver" in window)) return;
    window.__imovelSectionTrackingBound = true;
    const sectionMap = [
      ["view_hero", [".hero", "[data-section='hero']", "#hero"]],
      ["view_services", ["#servicos", "#servicos-contratos", ".services", ".service-grid", ".cards"]],
      ["view_pricing", ["#planos", "#precos", ".pricing", ".plans", ".price-grid"]],
      ["view_how_it_works", ["#como-funciona", ".how", ".steps"]],
      ["view_faq", ["#faq", ".faq", "details"]],
      ["view_final_cta", [".final-cta", "[data-section='final_cta']"]],
    ];
    const seen = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const eventName = entry.target.dataset.imovelSectionEvent;
        if (!eventName || seen.has(eventName)) return;
        seen.add(eventName);
        trackEvent(eventName, { section: eventName.replace(/^view_/, "") }, { once: true });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.45 });
    sectionMap.forEach(([eventName, selectors]) => {
      const node = selectors.map((selector) => {
        try { return document.querySelector(selector); } catch (_error) { return undefined; }
      }).find(Boolean);
      if (node && !node.dataset.imovelSectionEvent) {
        node.dataset.imovelSectionEvent = eventName;
        observer.observe(node);
      }
    });
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

  const initGA4 = (measurementId = config.ga4MeasurementId) => {
    if (!measurementId || !/^G-[A-Z0-9]+$/i.test(measurementId) || window.__imovelGa4Loaded) return;
    window.__imovelGa4Loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { debug_mode: config.debug || undefined });
    const firstScript = document.getElementsByTagName("script")[0];
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
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

  const initClarity = (clarityId = config.clarityId) => {
    if (!clarityId || window.__imovelClarityLoaded) return;
    window.__imovelClarityLoaded = true;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r);
      t.async = true;
      t.src = `https://www.clarity.ms/tag/${i}`;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", clarityId);
    try {
      window.clarity("set", "visitor_id", visitorId);
      window.clarity("set", "session_id", sessionId);
    } catch (_error) {}
  };

  const init = () => {
    initGTM();
    initGA4();
    initGoogleAds();
    bindWhatsAppLinks();
    bindTrackedElements();
    bindAttributionLinks();
    bindFaq();
    bindForms();
    bindScrollDepth();
    bindTimeEvents();
    bindSectionViews();
    trackEvent("page_view", {}, { once: true, dedupeKey: `page_view:${sessionId}:${getPage()}` });
    trackEvent("landing_page_view", {}, { once: true, dedupeKey: `landing_page_view:${sessionId}:${getPage()}` });
    if (config.pageViewEvent && config.pageViewEvent !== "page_view") {
      trackEvent(config.pageViewEvent, {}, { once: true, dedupeKey: `${config.pageViewEvent}:${sessionId}` });
    }
    if (config.metaPixelId) {
      const load = () => setTimeout(() => initMetaPixel(), config.metaPixelDelay);
      if ("requestIdleCallback" in window) {
        requestIdleCallback(load, { timeout: 3500 });
      } else {
        window.addEventListener("load", load, { once: true });
      }
    }
    initClarity();
  };

  window.ImovelExplicado = {
    ...existing,
    config,
    persistAttribution,
    getAttribution,
    createLeadId,
    createWhatsAppLink,
    handleWhatsAppClick,
    trackEvent,
    trackConversion,
    bindWhatsAppLinks,
    bindTrackedElements,
    initGTM,
    initGA4,
    initGoogleAds,
    initMetaPixel,
    initClarity,
    init,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
