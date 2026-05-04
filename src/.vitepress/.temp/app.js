import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrRenderVNode, ssrRenderClass, ssrRenderStyle, renderToString } from "vue/server-renderer";
import { defineComponent, mergeProps, useSSRContext, shallowRef, readonly, inject, computed, ref, watch, reactive, markRaw, nextTick, h, unref, onMounted, onUpdated, onUnmounted, watchEffect, watchPostEffect, shallowReadonly, resolveComponent, createVNode, resolveDynamicComponent, withCtx, renderSlot, useTemplateRef, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, defineAsyncComponent, provide, toHandlers, withKeys, onBeforeUnmount, useSlots, createSSRApp } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import { usePreferredDark, useDark, tryOnUnmounted, useMediaQuery, useNavigatorLanguage, useWindowSize, onKeyStroke, useWindowScroll, useScrollLock } from "@vueuse/core";
const _sfc_main$18 = /* @__PURE__ */ defineComponent({
  __name: "VPBadge",
  __ssrInlineRender: true,
  props: {
    text: {},
    type: { default: "tip" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["VPBadge", __props.type]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`${ssrInterpolate(__props.text)}`);
      }, _push, _parent);
      _push(`</span>`);
    };
  }
});
const _sfc_setup$18 = _sfc_main$18.setup;
_sfc_main$18.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPBadge.vue");
  return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
const _sfc_main$17 = /* @__PURE__ */ defineComponent({
  __name: "VPBackdrop",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPBackdrop" }, _attrs))} data-v-c79a1216></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$17 = _sfc_main$17.setup;
_sfc_main$17.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPBackdrop.vue");
  return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
const VPBackdrop = /* @__PURE__ */ _export_sfc(_sfc_main$17, [["__scopeId", "data-v-c79a1216"]]);
function deserializeFunctions(r) {
  return Array.isArray(r) ? r.map(deserializeFunctions) : typeof r == "object" && r !== null ? Object.keys(r).reduce((t, n) => (t[n] = deserializeFunctions(r[n]), t), {}) : typeof r == "string" && r.startsWith("_vp-fn_") ? new Function(`return ${r.slice(7)}`)() : r;
}
const siteData = deserializeFunctions(JSON.parse('{"lang":"en-US","dir":"ltr","title":"PhenixPHP","description":"PhenixPHP framework documentation","base":"/","head":[],"router":{"prefetchLinks":true},"appearance":"dark","themeConfig":{"search":{"provider":"local"},"nav":[{"text":"Guide","link":"/guide/"},{"text":"GitHub","link":"https://github.com/phenixphp/phenix"}],"sidebar":{"/guide/":[{"text":"Guide","items":[{"text":"Introduction","link":"/guide/"},{"text":"Installation","link":"/guide/installation"},{"text":"Getting started","link":"/guide/getting_started"},{"text":"Hot reloading","link":"/guide/hot_reloading"},{"text":"Server","link":"/guide/server"},{"text":"Architecture","link":"/guide/architecture"},{"text":"Providers","link":"/guide/providers"},{"text":"Routing","link":"/guide/routing"},{"text":"Controllers","link":"/guide/controllers"},{"text":"Middlewares","link":"/guide/middlewares"},{"text":"Validation","link":"/guide/validation"},{"text":"Migrations","link":"/guide/migrations"},{"text":"Seeders","link":"/guide/seeders"},{"text":"Query builder","link":"/guide/query_builder"},{"text":"ORM","link":"/guide/orm"},{"text":"Filesystem","link":"/guide/filesystem"},{"text":"Caching","link":"/guide/caching"},{"text":"Logging","link":"/guide/logging"},{"text":"Crypto","link":"/guide/crypto"},{"text":"Scheduling","link":"/guide/scheduling"},{"text":"Authentication","link":"/guide/authentication"},{"text":"Sessions","link":"/guide/sessions"},{"text":"Tasks","link":"/guide/tasks"},{"text":"Queues","link":"/guide/queues"},{"text":"Events","link":"/guide/events"},{"text":"Views","link":"/guide/views"},{"text":"Translation","link":"/guide/translation"},{"text":"Mailing","link":"/guide/mailing"},{"text":"Helpers","link":"/guide/helpers"},{"text":"Testing","link":"/guide/testing"},{"text":"Deployment","link":"/guide/deployment"}]}]}},"locales":{},"scrollOffset":134,"cleanUrls":false,"additionalConfig":{}}'));
const __vite_import_meta_env__ = {};
const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i;
const APPEARANCE_KEY = "vitepress-theme-appearance";
const UnpackStackView = /* @__PURE__ */ Symbol("stack-view:unpack");
const HASH_RE = /#.*$/;
const HASH_OR_QUERY_RE = /[?#].*$/;
const INDEX_OR_EXT_RE = /(?:(^|\/)index)?\.(?:md|html)$/;
const inBrowser = typeof document !== "undefined";
const notFoundPageData = {
  relativePath: "404.md",
  filePath: "",
  title: "404",
  description: "Not Found",
  headers: [],
  frontmatter: { sidebar: false, layout: "page" },
  lastUpdated: 0,
  isNotFound: true
};
function isActive(currentPath, matchPath, asRegex = false) {
  if (matchPath === void 0) {
    return false;
  }
  currentPath = normalize(`/${currentPath}`);
  if (asRegex) {
    return new RegExp(matchPath).test(currentPath);
  }
  if (normalize(matchPath) !== currentPath) {
    return false;
  }
  const hashMatch = matchPath.match(HASH_RE);
  if (hashMatch) {
    return (inBrowser ? location.hash : "") === hashMatch[0];
  }
  return true;
}
function normalize(path) {
  return decodeURI(path).replace(HASH_OR_QUERY_RE, "").replace(INDEX_OR_EXT_RE, "$1");
}
function isExternal(path) {
  return EXTERNAL_URL_RE.test(path);
}
function getLocaleForPath(siteData2, relativePath) {
  return Object.keys(siteData2?.locales || {}).find((key) => key !== "root" && !isExternal(key) && isActive(relativePath, `^/${key}/`, true)) || "root";
}
function resolveSiteDataByRoute(siteData2, relativePath) {
  const localeIndex = getLocaleForPath(siteData2, relativePath);
  const { label, link: link2, ...localeConfig } = siteData2.locales[localeIndex] ?? {};
  Object.assign(localeConfig, { localeIndex });
  const additionalConfigs = resolveAdditionalConfig(siteData2, relativePath);
  const topLayer = {
    head: mergeHead(siteData2.head ?? [], localeConfig.head ?? [], ...additionalConfigs.map((data) => data.head ?? []).reverse())
  };
  return stackView(topLayer, ...additionalConfigs, localeConfig, siteData2);
}
function createTitle(siteData2, pageData) {
  const title = pageData.title || siteData2.title;
  const template = pageData.titleTemplate ?? siteData2.titleTemplate;
  if (typeof template === "string" && template.includes(":title")) {
    return template.replace(/:title/g, title);
  }
  const templateString = createTitleTemplate(siteData2.title, template);
  if (title === templateString.slice(3)) {
    return title;
  }
  return `${title}${templateString}`;
}
function createTitleTemplate(siteTitle, template) {
  if (template === false) {
    return "";
  }
  if (template === true || template === void 0) {
    return ` | ${siteTitle}`;
  }
  if (siteTitle === template) {
    return "";
  }
  return ` | ${template}`;
}
function mergeHead(...headArrays) {
  const merged = [];
  const metaKeyMap = /* @__PURE__ */ new Map();
  for (const current of headArrays) {
    for (const tag of current) {
      const [type, attrs] = tag;
      const keyAttr = Object.entries(attrs)[0];
      if (type !== "meta" || !keyAttr) {
        merged.push(tag);
        continue;
      }
      const key = `${keyAttr[0]}=${keyAttr[1]}`;
      const existingIndex = metaKeyMap.get(key);
      if (existingIndex != null) {
        merged[existingIndex] = tag;
      } else {
        metaKeyMap.set(key, merged.length);
        merged.push(tag);
      }
    }
  }
  return merged;
}
const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;
function sanitizeFileName(name) {
  const match = DRIVE_LETTER_REGEX.exec(name);
  const driveLetter = match ? match[0] : "";
  return driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "_").replace(/(^|\/)_+(?=[^/]*$)/, "$1");
}
const KNOWN_EXTENSIONS = /* @__PURE__ */ new Set();
function treatAsHtml(filename) {
  if (KNOWN_EXTENSIONS.size === 0) {
    const extraExts = typeof process === "object" && process.env?.VITE_EXTRA_EXTENSIONS || __vite_import_meta_env__?.VITE_EXTRA_EXTENSIONS || "";
    ("3g2,3gp,aac,ai,apng,au,avif,bin,bmp,cer,class,conf,crl,css,csv,dll,doc,eps,epub,exe,gif,gz,ics,ief,jar,jpe,jpeg,jpg,js,json,jsonld,m4a,man,mid,midi,mjs,mov,mp2,mp3,mp4,mpe,mpeg,mpg,mpp,oga,ogg,ogv,ogx,opus,otf,p10,p7c,p7m,p7s,pdf,png,ps,qt,roff,rtf,rtx,ser,svg,t,tif,tiff,tr,ts,tsv,ttf,txt,vtt,wav,weba,webm,webp,woff,woff2,xhtml,xml,yaml,yml,zip" + (extraExts && typeof extraExts === "string" ? "," + extraExts : "")).split(",").forEach((ext2) => KNOWN_EXTENSIONS.add(ext2));
  }
  const ext = filename.split(".").pop();
  return ext == null || !KNOWN_EXTENSIONS.has(ext.toLowerCase());
}
function escapeRegExp(str) {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function resolveAdditionalConfig({ additionalConfig }, path) {
  if (additionalConfig === void 0)
    return [];
  if (typeof additionalConfig === "function")
    return additionalConfig(path) ?? [];
  const configs = [];
  const segments = path.split("/").slice(0, -1);
  while (segments.length) {
    const key = `/${segments.join("/")}/`;
    configs.push(additionalConfig[key]);
    segments.pop();
  }
  configs.push(additionalConfig["/"]);
  return configs.filter((config) => config !== void 0);
}
function stackView(..._layers) {
  const layers = _layers.filter((layer) => isObject(layer));
  if (layers.length <= 1)
    return _layers[0];
  const allKeys = new Set(layers.flatMap((layer) => Reflect.ownKeys(layer)));
  const allKeysArray = [...allKeys];
  return new Proxy({}, {
    // TODO: optimize for performance, this is a hot path
    get(_, prop) {
      if (prop === UnpackStackView)
        return layers;
      return stackView(...layers.map((layer) => layer[prop]).filter((v) => v !== void 0));
    },
    set() {
      throw new Error("StackView is read-only and cannot be mutated.");
    },
    has(_, prop) {
      return allKeys.has(prop);
    },
    ownKeys() {
      return allKeysArray;
    },
    getOwnPropertyDescriptor(_, prop) {
      for (const layer of layers) {
        const descriptor = Object.getOwnPropertyDescriptor(layer, prop);
        if (descriptor)
          return descriptor;
      }
    }
  });
}
stackView.unpack = function(obj) {
  return obj?.[UnpackStackView];
};
function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
const shellLangs = ["shellscript", "shell", "bash", "sh", "zsh"];
function isShell(lang) {
  return shellLangs.includes(lang);
}
const dataSymbol = /* @__PURE__ */ Symbol();
const siteDataRef = shallowRef(readonly(siteData));
function initData(route) {
  const site = computed(() => resolveSiteDataByRoute(siteDataRef.value, route.data.relativePath));
  const appearance = site.value.appearance;
  const isDark = appearance === "force-dark" ? ref(true) : appearance === "force-auto" ? usePreferredDark() : appearance ? useDark({
    storageKey: APPEARANCE_KEY,
    initialValue: () => appearance === "dark" ? "dark" : "auto",
    ...typeof appearance === "object" ? appearance : {}
  }) : ref(false);
  const hashRef = ref(inBrowser ? location.hash : "");
  if (inBrowser) {
    window.addEventListener("hashchange", () => {
      hashRef.value = location.hash;
    });
  }
  watch(() => route.data, () => {
    hashRef.value = inBrowser ? location.hash : "";
  });
  return {
    site,
    theme: computed(() => site.value.themeConfig),
    page: computed(() => route.data),
    frontmatter: computed(() => route.data.frontmatter),
    params: computed(() => route.data.params),
    lang: computed(() => site.value.lang),
    dir: computed(() => route.data.frontmatter.dir || site.value.dir),
    localeIndex: computed(() => site.value.localeIndex || "root"),
    title: computed(() => createTitle(site.value, route.data)),
    description: computed(() => route.data.description || site.value.description),
    isDark,
    hash: computed(() => hashRef.value)
  };
}
function useData$1() {
  const data = inject(dataSymbol);
  if (!data) {
    throw new Error("vitepress data not properly injected in app");
  }
  return data;
}
function joinPath(base, path) {
  return `${base}${path}`.replace(/\/+/g, "/");
}
function withBase(path) {
  return EXTERNAL_URL_RE.test(path) || !path.startsWith("/") ? path : joinPath(siteDataRef.value.base, path);
}
function pathToFile(path) {
  let pagePath = path.replace(/\.html$/, "");
  pagePath = decodeURIComponent(pagePath);
  pagePath = pagePath.replace(/\/$/, "/index");
  {
    if (inBrowser) {
      const base = "/";
      pagePath = sanitizeFileName(pagePath.slice(base.length).replace(/\//g, "_") || "index") + ".md";
      let pageHash = __VP_HASH_MAP__[pagePath.toLowerCase()];
      if (!pageHash) {
        pagePath = pagePath.endsWith("_index.md") ? pagePath.slice(0, -9) + ".md" : pagePath.slice(0, -3) + "_index.md";
        pageHash = __VP_HASH_MAP__[pagePath.toLowerCase()];
      }
      if (!pageHash)
        return null;
      pagePath = `${base}${"assets"}/${pagePath}.${pageHash}.js`;
    } else {
      pagePath = `./${sanitizeFileName(pagePath.slice(1).replace(/\//g, "_"))}.md.js`;
    }
  }
  return pagePath;
}
let contentUpdatedCallbacks = [];
function onContentUpdated(fn) {
  contentUpdatedCallbacks.push(fn);
  tryOnUnmounted(() => {
    contentUpdatedCallbacks = contentUpdatedCallbacks.filter((f) => f !== fn);
  });
}
function getScrollOffset() {
  let scrollOffset = siteDataRef.value.scrollOffset;
  let offset = 0;
  let padding = 24;
  if (typeof scrollOffset === "object" && "padding" in scrollOffset) {
    padding = scrollOffset.padding;
    scrollOffset = scrollOffset.selector;
  }
  if (typeof scrollOffset === "number") {
    offset = scrollOffset;
  } else if (typeof scrollOffset === "string") {
    offset = tryOffsetSelector(scrollOffset, padding);
  } else if (Array.isArray(scrollOffset)) {
    for (const selector of scrollOffset) {
      const res = tryOffsetSelector(selector, padding);
      if (res) {
        offset = res;
        break;
      }
    }
  }
  return offset;
}
function tryOffsetSelector(selector, padding) {
  const el = document.querySelector(selector);
  if (!el)
    return 0;
  const bot = el.getBoundingClientRect().bottom;
  if (bot < 0)
    return 0;
  return bot + padding;
}
const RouterSymbol = /* @__PURE__ */ Symbol();
const fakeHost = "http://a.com";
const getDefaultRoute = () => ({
  path: "/",
  hash: "",
  query: "",
  component: null,
  data: notFoundPageData
});
function createRouter(loadPageModule, fallbackComponent) {
  const route = reactive(getDefaultRoute());
  const router = {
    route,
    async go(href, options) {
      href = normalizeHref(href);
      if (await router.onBeforeRouteChange?.(href) === false)
        return;
      if (!inBrowser || await changeRoute(href, options))
        await loadPage(href);
      syncRouteQueryAndHash();
      await router.onAfterRouteChange?.(href);
    }
  };
  let latestPendingPath = null;
  async function loadPage(href, scrollPosition = 0, isRetry = false) {
    if (await router.onBeforePageLoad?.(href) === false)
      return;
    const targetLoc = new URL(href, fakeHost);
    const pendingPath = latestPendingPath = targetLoc.pathname;
    try {
      let page = await loadPageModule(pendingPath);
      if (!page)
        throw new Error(`Page not found: ${pendingPath}`);
      if (latestPendingPath === pendingPath) {
        latestPendingPath = null;
        const { default: comp, __pageData } = page;
        if (!comp)
          throw new Error(`Invalid route component: ${comp}`);
        await router.onAfterPageLoad?.(href);
        route.path = inBrowser ? pendingPath : withBase(pendingPath);
        route.component = markRaw(comp);
        route.data = true ? markRaw(__pageData) : readonly(__pageData);
        syncRouteQueryAndHash(targetLoc);
        if (inBrowser) {
          nextTick(() => {
            let actualPathname = siteDataRef.value.base + __pageData.relativePath.replace(/(?:(^|\/)index)?\.md$/, "$1");
            if (!siteDataRef.value.cleanUrls && !actualPathname.endsWith("/")) {
              actualPathname += ".html";
            }
            if (actualPathname !== targetLoc.pathname) {
              targetLoc.pathname = actualPathname;
              href = actualPathname + targetLoc.search + targetLoc.hash;
              history.replaceState({}, "", href);
            }
            return scrollTo(targetLoc.hash, false, scrollPosition);
          });
        }
      }
    } catch (err) {
      if (!/fetch|Page not found/.test(err.message) && !/^\/404(\.html|\/)?$/.test(href)) {
        console.error(err);
      }
      if (!isRetry) {
        try {
          const res = await fetch(siteDataRef.value.base + "hashmap.json");
          window.__VP_HASH_MAP__ = await res.json();
          await loadPage(href, scrollPosition, true);
          return;
        } catch (e) {
        }
      }
      if (latestPendingPath === pendingPath) {
        latestPendingPath = null;
        route.path = inBrowser ? pendingPath : withBase(pendingPath);
        route.component = fallbackComponent ? markRaw(fallbackComponent) : null;
        const relativePath = inBrowser ? route.path.replace(/(^|\/)$/, "$1index").replace(/(\.html)?$/, ".md").slice(siteDataRef.value.base.length) : "404.md";
        route.data = { ...notFoundPageData, relativePath };
        syncRouteQueryAndHash(targetLoc);
      }
    }
  }
  function syncRouteQueryAndHash(loc = inBrowser ? location : { search: "", hash: "" }) {
    route.query = loc.search;
    route.hash = decodeURIComponent(loc.hash);
  }
  if (inBrowser) {
    if (history.state === null)
      history.replaceState({}, "");
    window.addEventListener("click", (e) => {
      if (e.defaultPrevented || !(e.target instanceof Element) || e.target.closest("button") || // temporary fix for docsearch action buttons
      e.button !== 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) {
        return;
      }
      const link2 = e.target.closest("a");
      if (!link2 || link2.closest(".vp-raw") || link2.hasAttribute("download") || link2.hasAttribute("target")) {
        return;
      }
      const linkHref = link2.getAttribute("href") ?? (link2 instanceof SVGAElement ? link2.getAttribute("xlink:href") : null);
      if (linkHref == null)
        return;
      const { href, origin, pathname } = new URL(linkHref, link2.baseURI);
      const currentLoc = new URL(location.href);
      if (origin === currentLoc.origin && treatAsHtml(pathname)) {
        e.preventDefault();
        router.go(href, {
          // use smooth scroll when clicking on header anchor links
          smoothScroll: link2.classList.contains("header-anchor")
        });
      }
    }, { capture: true });
    window.addEventListener("popstate", async (e) => {
      if (e.state === null)
        return;
      const href = normalizeHref(location.href);
      await loadPage(href, e.state && e.state.scrollPosition || 0);
      syncRouteQueryAndHash();
      await router.onAfterRouteChange?.(href);
    });
    window.addEventListener("hashchange", (e) => {
      e.preventDefault();
      syncRouteQueryAndHash();
    });
  }
  return router;
}
function useRouter() {
  const router = inject(RouterSymbol);
  if (!router)
    throw new Error("useRouter() is called without provider.");
  return router;
}
function useRoute() {
  return useRouter().route;
}
function scrollTo(hash, smooth = false, scrollPosition = 0) {
  if (!hash || scrollPosition) {
    window.scrollTo(0, scrollPosition);
    return;
  }
  let target = null;
  try {
    target = document.getElementById(decodeURIComponent(hash).slice(1));
  } catch (e) {
    console.warn(e);
  }
  if (!target)
    return;
  const targetTop = window.scrollY + target.getBoundingClientRect().top - getScrollOffset() + Number.parseInt(window.getComputedStyle(target).paddingTop, 10) || 0;
  const behavior = window.matchMedia("(prefers-reduced-motion)").matches ? "instant" : (
    // only smooth scroll if distance is smaller than screen height
    smooth && Math.abs(targetTop - window.scrollY) <= window.innerHeight ? "smooth" : "auto"
  );
  const scrollToTarget = () => {
    window.scrollTo({ left: 0, top: targetTop, behavior });
    target.focus({ preventScroll: true });
    if (document.activeElement === target)
      return;
    if (target.hasAttribute("tabindex"))
      return;
    const restoreTabindex = () => {
      target.removeAttribute("tabindex");
      target.removeEventListener("blur", restoreTabindex);
    };
    target.setAttribute("tabindex", "-1");
    target.addEventListener("blur", restoreTabindex);
    target.focus({ preventScroll: true });
    if (document.activeElement !== target)
      restoreTabindex();
  };
  requestAnimationFrame(scrollToTarget);
}
function normalizeHref(href) {
  const url = new URL(href, fakeHost);
  url.pathname = url.pathname.replace(/(^|\/)index(\.html)?$/, "$1");
  if (siteDataRef.value.cleanUrls) {
    url.pathname = url.pathname.replace(/\.html$/, "");
  } else if (!url.pathname.endsWith("/") && !url.pathname.endsWith(".html")) {
    url.pathname += ".html";
  }
  return url.pathname + url.search + url.hash;
}
async function changeRoute(href, { smoothScroll = false, initialLoad = false, replace = false } = {}) {
  const loc = normalizeHref(location.href);
  const nextUrl = new URL(href, location.origin);
  const currentUrl = new URL(loc, location.origin);
  if (href === loc) {
    if (!initialLoad) {
      scrollTo(nextUrl.hash, smoothScroll);
      return false;
    }
  } else {
    if (replace) {
      history.replaceState({}, "", href);
    } else {
      history.replaceState({ scrollPosition: window.scrollY }, "");
      history.pushState({}, "", href);
    }
    if (nextUrl.pathname === currentUrl.pathname) {
      if (nextUrl.hash !== currentUrl.hash) {
        window.dispatchEvent(new HashChangeEvent("hashchange", {
          oldURL: currentUrl.href,
          newURL: nextUrl.href
        }));
        scrollTo(nextUrl.hash, smoothScroll);
      }
      return false;
    }
  }
  return true;
}
const runCbs = () => contentUpdatedCallbacks.forEach((fn) => fn());
const Content = defineComponent({
  name: "VitePressContent",
  props: {
    as: { type: [Object, String], default: "div" }
  },
  setup(props) {
    const route = useRoute();
    const { frontmatter, site } = useData$1();
    watch(frontmatter, runCbs, { deep: true, flush: "post" });
    return () => h(props.as, site.value.contentProps ?? { style: { position: "relative" } }, [
      route.component ? h(route.component, {
        onVnodeMounted: runCbs,
        onVnodeUpdated: runCbs,
        onVnodeUnmounted: runCbs
      }) : "404 Page Not Found"
    ]);
  }
});
const useData = useData$1;
function throttleAndDebounce(fn, delay) {
  let timeoutId;
  let called = false;
  return () => {
    if (timeoutId)
      clearTimeout(timeoutId);
    if (!called) {
      fn();
      (called = true) && setTimeout(() => called = false, delay);
    } else
      timeoutId = setTimeout(fn, delay);
  };
}
function ensureStartingSlash(path) {
  return path.startsWith("/") ? path : `/${path}`;
}
function normalizeLink$1(url) {
  const { pathname, search, hash, protocol } = new URL(url, "http://a.com");
  if (isExternal(url) || url.startsWith("#") || !protocol.startsWith("http") || !treatAsHtml(pathname))
    return url;
  const { site } = useData();
  const normalizedPath = pathname.endsWith("/") || pathname.endsWith(".html") ? url : url.replace(/(?:(^\.+)\/)?.*$/, `$1${pathname.replace(/(\.md)?$/, site.value.cleanUrls ? "" : ".html")}${search}${hash}`);
  return withBase(normalizedPath);
}
function useLangs({ correspondingLink = false } = {}) {
  const { site, localeIndex, page, theme: theme2, hash } = useData();
  const currentLang = computed(() => ({
    label: site.value.locales[localeIndex.value]?.label,
    link: site.value.locales[localeIndex.value]?.link || (localeIndex.value === "root" ? "/" : `/${localeIndex.value}/`)
  }));
  const localeLinks = computed(() => Object.entries(site.value.locales).flatMap(([key, value]) => currentLang.value.label === value.label ? [] : {
    text: value.label,
    link: normalizeLink(value.link || (key === "root" ? "/" : `/${key}/`), theme2.value.i18nRouting !== false && correspondingLink, page.value.relativePath.slice(currentLang.value.link.length - 1), !site.value.cleanUrls) + hash.value,
    lang: value.lang,
    dir: value.dir
  }));
  return { localeLinks, currentLang };
}
function normalizeLink(link2, addPath, path, addExt) {
  return addPath ? link2.replace(/\/$/, "") + ensureStartingSlash(path.replace(/(^|\/)index\.md$/, "$1").replace(/\.md$/, addExt ? ".html" : "")) : link2;
}
const _sfc_main$16 = /* @__PURE__ */ defineComponent({
  __name: "NotFound",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    const { currentLang } = useLangs();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "NotFound" }, _attrs))} data-v-829df670><p class="code" data-v-829df670>${ssrInterpolate(unref(theme2).notFound?.code ?? "404")}</p><h1 class="title" data-v-829df670>${ssrInterpolate(unref(theme2).notFound?.title ?? "PAGE NOT FOUND")}</h1><div class="divider" data-v-829df670></div><blockquote class="quote" data-v-829df670>${ssrInterpolate(unref(theme2).notFound?.quote ?? "But if you don't change your direction, and if you keep looking, you may end up where you are heading.")}</blockquote><div class="action" data-v-829df670><a class="link"${ssrRenderAttr("href", unref(withBase)(unref(theme2).notFound?.link ?? unref(currentLang).link))}${ssrRenderAttr("aria-label", unref(theme2).notFound?.linkLabel ?? "go to home")} data-v-829df670>${ssrInterpolate(unref(theme2).notFound?.linkText ?? "Take me home")}</a></div></div>`);
    };
  }
});
const _sfc_setup$16 = _sfc_main$16.setup;
_sfc_main$16.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/NotFound.vue");
  return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
const NotFound = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["__scopeId", "data-v-829df670"]]);
function getSidebar(_sidebar, path) {
  if (Array.isArray(_sidebar))
    return addBase(_sidebar);
  if (_sidebar == null)
    return [];
  path = ensureStartingSlash(path);
  const dir = Object.keys(_sidebar).sort((a, b) => {
    return b.split("/").length - a.split("/").length;
  }).find((dir2) => {
    return path.startsWith(ensureStartingSlash(dir2));
  });
  const sidebar2 = dir ? _sidebar[dir] : [];
  return Array.isArray(sidebar2) ? addBase(sidebar2) : addBase(sidebar2.items, sidebar2.base);
}
function getSidebarGroups(sidebar2) {
  const groups = [];
  let lastGroupIndex = 0;
  for (const index in sidebar2) {
    const item = sidebar2[index];
    if (item.items) {
      lastGroupIndex = groups.push(item);
      continue;
    }
    if (!groups[lastGroupIndex]) {
      groups.push({ items: [] });
    }
    groups[lastGroupIndex].items.push(item);
  }
  return groups;
}
function getFlatSideBarLinks(sidebar2) {
  const links = [];
  function recursivelyExtractLinks(items) {
    for (const item of items) {
      if (item.text && item.link) {
        links.push({
          text: item.text,
          link: item.link,
          docFooterText: item.docFooterText
        });
      }
      if (item.items) {
        recursivelyExtractLinks(item.items);
      }
    }
  }
  recursivelyExtractLinks(sidebar2);
  return links;
}
function hasActiveLink(path, items) {
  if (Array.isArray(items)) {
    return items.some((item) => hasActiveLink(path, item));
  }
  return isActive(path, items.link) ? true : items.items ? hasActiveLink(path, items.items) : false;
}
function addBase(items, _base) {
  return [...items].map((_item) => {
    const item = { ..._item };
    const base = item.base || _base;
    if (base && item.link)
      item.link = base + item.link.replace(/^\//, base.endsWith("/") ? "" : "/");
    if (item.items)
      item.items = addBase(item.items, base);
    return item;
  });
}
function useAside() {
  const { hasSidebar } = useLayout();
  const is9602 = useMediaQuery("(min-width: 960px)");
  const is1280 = useMediaQuery("(min-width: 1280px)");
  const isAsideEnabled = computed(() => {
    if (!is1280.value && !is9602.value) {
      return false;
    }
    return hasSidebar.value ? is1280.value : is9602.value;
  });
  return {
    isAsideEnabled
  };
}
const ignoreRE = /\b(?:VPBadge|header-anchor|footnote-ref|ignore-header)\b/;
const resolvedHeaders = [];
function resolveTitle(theme2) {
  return typeof theme2.outline === "object" && !Array.isArray(theme2.outline) && theme2.outline.label || theme2.outlineTitle || "On this page";
}
function getHeaders(range) {
  const headers2 = [
    ...document.querySelectorAll(".VPDoc h1, .VPDoc h2, .VPDoc h3, .VPDoc h4, .VPDoc h5, .VPDoc h6")
  ].filter((el) => el.id && el.hasChildNodes()).map((el) => {
    const level = Number(el.tagName[1]);
    return {
      element: el,
      title: serializeHeader(el),
      link: "#" + el.id,
      level
    };
  });
  return resolveHeaders(headers2, range);
}
function serializeHeader(h2) {
  let ret = "";
  for (const node of h2.childNodes) {
    if (node.nodeType === 1) {
      if (ignoreRE.test(node.className))
        continue;
      ret += node.textContent;
    } else if (node.nodeType === 3) {
      ret += node.textContent;
    }
  }
  return ret.trim();
}
function resolveHeaders(headers2, range) {
  if (range === false) {
    return [];
  }
  const levelsRange = (typeof range === "object" && !Array.isArray(range) ? range.level : range) || 2;
  const [high, low] = typeof levelsRange === "number" ? [levelsRange, levelsRange] : levelsRange === "deep" ? [2, 6] : levelsRange;
  return buildTree(headers2, high, low);
}
function useActiveAnchor(container, marker) {
  const { isAsideEnabled } = useAside();
  const onScroll = throttleAndDebounce(setActiveLink, 100);
  let prevActiveLink = null;
  onMounted(() => {
    requestAnimationFrame(setActiveLink);
    window.addEventListener("scroll", onScroll);
  });
  onUpdated(() => {
    activateLink(location.hash);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
  });
  function setActiveLink() {
    if (!isAsideEnabled.value) {
      return;
    }
    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const offsetHeight = document.body.offsetHeight;
    const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1;
    const headers2 = resolvedHeaders.map(({ element, link: link2 }) => ({
      link: link2,
      top: getAbsoluteTop(element)
    })).filter(({ top }) => !Number.isNaN(top)).sort((a, b) => a.top - b.top);
    if (!headers2.length) {
      activateLink(null);
      return;
    }
    if (scrollY < 1) {
      activateLink(null);
      return;
    }
    if (isBottom) {
      activateLink(headers2[headers2.length - 1].link);
      return;
    }
    let activeLink = null;
    for (const { link: link2, top } of headers2) {
      if (top > scrollY + getScrollOffset() + 4) {
        break;
      }
      activeLink = link2;
    }
    activateLink(activeLink);
  }
  function activateLink(hash) {
    if (prevActiveLink) {
      prevActiveLink.classList.remove("active");
    }
    if (hash == null) {
      prevActiveLink = null;
    } else {
      prevActiveLink = container.value.querySelector(`a[href="${decodeURIComponent(hash)}"]`);
    }
    const activeLink = prevActiveLink;
    if (activeLink) {
      activeLink.classList.add("active");
      marker.value.style.top = activeLink.offsetTop + 39 + "px";
      marker.value.style.opacity = "1";
    } else {
      marker.value.style.top = "33px";
      marker.value.style.opacity = "0";
    }
  }
}
function getAbsoluteTop(element) {
  let offsetTop = 0;
  while (element !== document.body) {
    if (element === null) {
      return NaN;
    }
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
}
function buildTree(data, min, max) {
  resolvedHeaders.length = 0;
  const result = [];
  const stack = [];
  data.forEach((item) => {
    const node = { ...item, children: [] };
    let parent = stack[stack.length - 1];
    while (parent && parent.level >= node.level) {
      stack.pop();
      parent = stack[stack.length - 1];
    }
    if (node.element.classList.contains("ignore-header") || parent && "shouldIgnore" in parent) {
      stack.push({ level: node.level, shouldIgnore: true });
      return;
    }
    if (node.level > max || node.level < min)
      return;
    resolvedHeaders.push({ element: node.element, link: node.link });
    if (parent)
      parent.children.push(node);
    else
      result.push(node);
    stack.push(node);
  });
  return result;
}
const isOpen = ref(false);
function useCloseSidebarOnEscape(close) {
  let triggerElement;
  watchEffect(() => {
    triggerElement = isOpen.value ? document.activeElement : void 0;
  });
  onMounted(() => {
    window.addEventListener("keyup", onEscape);
  });
  onUnmounted(() => {
    window.removeEventListener("keyup", onEscape);
  });
  function onEscape(e) {
    if (e.key === "Escape" && isOpen.value) {
      close();
      triggerElement?.focus();
    }
  }
}
function useSidebarControl() {
  function open() {
    isOpen.value = true;
  }
  function close() {
    isOpen.value = false;
  }
  function toggle() {
    isOpen.value ? close() : open();
  }
  return {
    isOpen,
    open,
    close,
    toggle
  };
}
function useSidebarItemControl(item) {
  const { page, hash } = useData();
  const collapsed = ref(false);
  const collapsible = computed(() => {
    return item.value.collapsed != null;
  });
  const isLink = computed(() => {
    return !!item.value.link;
  });
  const isActiveLink = ref(false);
  const updateIsActiveLink = () => {
    isActiveLink.value = isActive(page.value.relativePath, item.value.link);
  };
  watch([page, item, hash], updateIsActiveLink);
  onMounted(updateIsActiveLink);
  const hasActiveLink$1 = computed(() => {
    if (isActiveLink.value) {
      return true;
    }
    return item.value.items ? hasActiveLink(page.value.relativePath, item.value.items) : false;
  });
  const hasChildren = computed(() => {
    return !!(item.value.items && item.value.items.length);
  });
  watchEffect(() => {
    collapsed.value = !!(collapsible.value && item.value.collapsed);
  });
  watchPostEffect(() => {
    (isActiveLink.value || hasActiveLink$1.value) && (collapsed.value = false);
  });
  function toggle() {
    if (collapsible.value) {
      collapsed.value = !collapsed.value;
    }
  }
  return {
    collapsed,
    collapsible,
    isLink,
    isActiveLink,
    hasActiveLink: hasActiveLink$1,
    hasChildren,
    toggle
  };
}
const headers = shallowRef([]);
const sidebar = shallowRef([]);
const is960 = shallowRef(false);
function useLayout() {
  const { frontmatter, theme: theme2 } = useData();
  const isHome = computed(() => {
    return !!(frontmatter.value.isHome ?? frontmatter.value.layout === "home");
  });
  const hasSidebar = computed(() => {
    return frontmatter.value.sidebar !== false && sidebar.value.length > 0 && !isHome.value;
  });
  const isSidebarEnabled = computed(() => hasSidebar.value && is960.value);
  const sidebarGroups = computed(() => {
    return hasSidebar.value ? getSidebarGroups(sidebar.value) : [];
  });
  const hasAside = computed(() => {
    if (isHome.value)
      return false;
    if (frontmatter.value.aside != null)
      return !!frontmatter.value.aside;
    return theme2.value.aside !== false;
  });
  const leftAside = computed(() => {
    if (!hasAside.value)
      return false;
    return frontmatter.value.aside == null ? theme2.value.aside === "left" : frontmatter.value.aside === "left";
  });
  const hasLocalNav = computed(() => {
    return headers.value.length > 0;
  });
  return {
    isHome,
    sidebar: shallowReadonly(sidebar),
    sidebarGroups,
    hasSidebar,
    isSidebarEnabled,
    hasAside,
    leftAside,
    headers: shallowReadonly(headers),
    hasLocalNav
  };
}
function registerWatchers({ closeSidebar }) {
  const { frontmatter, page, theme: theme2 } = useData();
  watch(() => [page.value.relativePath, theme2.value.sidebar], ([relativePath, sidebarConfig]) => {
    const newSidebar = sidebarConfig ? getSidebar(sidebarConfig, relativePath) : [];
    if (JSON.stringify(newSidebar) !== JSON.stringify(sidebar.value)) {
      sidebar.value = newSidebar;
    }
  }, { immediate: true, deep: true, flush: "sync" });
  onContentUpdated(() => {
    headers.value = getHeaders(frontmatter.value.outline ?? theme2.value.outline);
  });
  if (inBrowser) {
    is960.value = window.innerWidth >= 960;
    window.addEventListener("resize", () => {
      is960.value = window.innerWidth >= 960;
    }, { passive: true });
  }
  const route = useRoute();
  watch(() => route.path, closeSidebar);
  useCloseSidebarOnEscape(closeSidebar);
}
const layoutInfoInjectionKey = /* @__PURE__ */ Symbol("layout-info");
const _sfc_main$15 = /* @__PURE__ */ defineComponent({
  __name: "VPDocOutlineItem",
  __ssrInlineRender: true,
  props: {
    headers: {},
    root: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VPDocOutlineItem = resolveComponent("VPDocOutlineItem", true);
      _push(`<ul${ssrRenderAttrs(mergeProps({
        class: ["VPDocOutlineItem", __props.root ? "root" : "nested"]
      }, _attrs))} data-v-1ce71065><!--[-->`);
      ssrRenderList(__props.headers, ({ children, link: link2, title }) => {
        _push(`<li data-v-1ce71065><a class="outline-link"${ssrRenderAttr("href", link2)}${ssrRenderAttr("title", title)} data-v-1ce71065>${ssrInterpolate(title)}</a>`);
        if (children?.length) {
          _push(ssrRenderComponent(_component_VPDocOutlineItem, { headers: children }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup$15 = _sfc_main$15.setup;
_sfc_main$15.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocOutlineItem.vue");
  return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
const VPDocOutlineItem = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["__scopeId", "data-v-1ce71065"]]);
const _sfc_main$14 = /* @__PURE__ */ defineComponent({
  __name: "VPDocAsideOutline",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    const container = ref();
    const marker = ref();
    const { headers: headers2, hasLocalNav } = useLayout();
    useActiveAnchor(container, marker);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({
        "aria-labelledby": "doc-outline-aria-label",
        class: ["VPDocAsideOutline", { "has-outline": unref(hasLocalNav) }],
        ref_key: "container",
        ref: container
      }, _attrs))} data-v-60d5052e><div class="content" data-v-60d5052e><div class="outline-marker" data-v-60d5052e></div><div aria-level="2" class="outline-title" id="doc-outline-aria-label" role="heading" data-v-60d5052e>${ssrInterpolate(unref(resolveTitle)(unref(theme2)))}</div>`);
      _push(ssrRenderComponent(VPDocOutlineItem, {
        headers: unref(headers2),
        root: true
      }, null, _parent));
      _push(`</div></nav>`);
    };
  }
});
const _sfc_setup$14 = _sfc_main$14.setup;
_sfc_main$14.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAsideOutline.vue");
  return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
const VPDocAsideOutline = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["__scopeId", "data-v-60d5052e"]]);
const _sfc_main$13 = /* @__PURE__ */ defineComponent({
  __name: "VPDocAsideCarbonAds",
  __ssrInlineRender: true,
  props: {
    carbonAds: {}
  },
  setup(__props) {
    const VPCarbonAds = () => null;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPDocAsideCarbonAds" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(VPCarbonAds), { "carbon-ads": __props.carbonAds }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$13 = _sfc_main$13.setup;
_sfc_main$13.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAsideCarbonAds.vue");
  return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
const _sfc_main$12 = /* @__PURE__ */ defineComponent({
  __name: "VPDocAside",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPDocAside" }, _attrs))} data-v-3f215769>`);
      ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push, _parent);
      _push(ssrRenderComponent(VPDocAsideOutline, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push, _parent);
      _push(`<div class="spacer" data-v-3f215769></div>`);
      ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push, _parent);
      if (unref(theme2).carbonAds) {
        _push(ssrRenderComponent(_sfc_main$13, {
          "carbon-ads": unref(theme2).carbonAds
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAside.vue");
  return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
const VPDocAside = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["__scopeId", "data-v-3f215769"]]);
function useEditLink() {
  const { theme: theme2, page } = useData();
  return computed(() => {
    const { text = "Edit this page", pattern = "" } = theme2.value.editLink || {};
    let url;
    if (typeof pattern === "function") {
      url = pattern(page.value);
    } else {
      url = pattern.replace(/:path/g, page.value.filePath);
    }
    return { url, text };
  });
}
function usePrevNext() {
  const { page, theme: theme2, frontmatter } = useData();
  return computed(() => {
    const sidebar2 = getSidebar(theme2.value.sidebar, page.value.relativePath);
    const links = getFlatSideBarLinks(sidebar2);
    const candidates = uniqBy(links, (link2) => link2.link.replace(/[?#].*$/, ""));
    const index = candidates.findIndex((link2) => {
      return isActive(page.value.relativePath, link2.link);
    });
    const hidePrev = theme2.value.docFooter?.prev === false && !frontmatter.value.prev || frontmatter.value.prev === false;
    const hideNext = theme2.value.docFooter?.next === false && !frontmatter.value.next || frontmatter.value.next === false;
    return {
      prev: hidePrev ? void 0 : {
        text: (typeof frontmatter.value.prev === "string" ? frontmatter.value.prev : typeof frontmatter.value.prev === "object" ? frontmatter.value.prev.text : void 0) ?? candidates[index - 1]?.docFooterText ?? candidates[index - 1]?.text,
        link: (typeof frontmatter.value.prev === "object" ? frontmatter.value.prev.link : void 0) ?? candidates[index - 1]?.link
      },
      next: hideNext ? void 0 : {
        text: (typeof frontmatter.value.next === "string" ? frontmatter.value.next : typeof frontmatter.value.next === "object" ? frontmatter.value.next.text : void 0) ?? candidates[index + 1]?.docFooterText ?? candidates[index + 1]?.text,
        link: (typeof frontmatter.value.next === "object" ? frontmatter.value.next.link : void 0) ?? candidates[index + 1]?.link
      }
    };
  });
}
function uniqBy(array, keyFn) {
  const seen = /* @__PURE__ */ new Set();
  return array.filter((item) => {
    const k = keyFn(item);
    return seen.has(k) ? false : seen.add(k);
  });
}
const _sfc_main$11 = /* @__PURE__ */ defineComponent({
  __name: "VPLink",
  __ssrInlineRender: true,
  props: {
    tag: {},
    href: {},
    noIcon: { type: Boolean },
    target: {},
    rel: {}
  },
  setup(__props) {
    const props = __props;
    const tag = computed(() => props.tag ?? (props.href ? "a" : "span"));
    const isExternal2 = computed(
      () => props.href && EXTERNAL_URL_RE.test(props.href) || props.target === "_blank"
    );
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(tag.value), mergeProps({
        class: ["VPLink", {
          link: __props.href,
          "vp-external-link-icon": isExternal2.value,
          "no-icon": __props.noIcon
        }],
        href: __props.href ? unref(normalizeLink$1)(__props.href) : void 0,
        target: __props.target ?? (isExternal2.value ? "_blank" : void 0),
        rel: __props.rel ?? (isExternal2.value ? "noreferrer" : void 0)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPLink.vue");
  return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
const _sfc_main$10 = /* @__PURE__ */ defineComponent({
  __name: "VPDocFooterLastUpdated",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2, page, lang: pageLang } = useData();
    const { language: browserLang } = useNavigatorLanguage();
    const timeRef = useTemplateRef("timeRef");
    const date = computed(() => new Date(page.value.lastUpdated));
    const isoDatetime = computed(() => date.value.toISOString());
    const datetime = shallowRef("");
    onMounted(() => {
      watchEffect(() => {
        const lang = theme2.value.lastUpdated?.formatOptions?.forceLocale ? pageLang.value : browserLang.value;
        datetime.value = new Intl.DateTimeFormat(
          lang,
          theme2.value.lastUpdated?.formatOptions ?? {
            dateStyle: "medium",
            timeStyle: "medium"
          }
        ).format(date.value);
        if (lang && pageLang.value !== lang) {
          timeRef.value?.setAttribute("lang", lang);
        } else {
          timeRef.value?.removeAttribute("lang");
        }
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(mergeProps({ class: "VPLastUpdated" }, _attrs))} data-v-3c637f39>${ssrInterpolate(unref(theme2).lastUpdated?.text || unref(theme2).lastUpdatedText || "Last updated")}: <time${ssrRenderAttr("datetime", isoDatetime.value)} data-v-3c637f39>${ssrInterpolate(datetime.value)}</time></p>`);
    };
  }
});
const _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocFooterLastUpdated.vue");
  return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
const VPDocFooterLastUpdated = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["__scopeId", "data-v-3c637f39"]]);
const _sfc_main$$ = /* @__PURE__ */ defineComponent({
  __name: "VPDocFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2, page, frontmatter } = useData();
    const editLink = useEditLink();
    const control = usePrevNext();
    const hasEditLink = computed(
      () => theme2.value.editLink && frontmatter.value.editLink !== false
    );
    const hasLastUpdated = computed(() => page.value.lastUpdated);
    const showFooter = computed(
      () => hasEditLink.value || hasLastUpdated.value || control.value.prev || control.value.next
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (showFooter.value) {
        _push(`<footer${ssrRenderAttrs(mergeProps({ class: "VPDocFooter" }, _attrs))} data-v-e257564d>`);
        ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push, _parent);
        if (hasEditLink.value || hasLastUpdated.value) {
          _push(`<div class="edit-info" data-v-e257564d>`);
          if (hasEditLink.value) {
            _push(`<div class="edit-link" data-v-e257564d>`);
            _push(ssrRenderComponent(_sfc_main$11, {
              class: "edit-link-button",
              href: unref(editLink).url,
              "no-icon": true
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="vpi-square-pen edit-link-icon" data-v-e257564d${_scopeId}></span> ${ssrInterpolate(unref(editLink).text)}`);
                } else {
                  return [
                    createVNode("span", { class: "vpi-square-pen edit-link-icon" }),
                    createTextVNode(" " + toDisplayString(unref(editLink).text), 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (hasLastUpdated.value) {
            _push(`<div class="last-updated" data-v-e257564d>`);
            _push(ssrRenderComponent(VPDocFooterLastUpdated, null, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(control).prev?.link || unref(control).next?.link) {
          _push(`<nav class="prev-next" aria-labelledby="doc-footer-aria-label" data-v-e257564d><span class="visually-hidden" id="doc-footer-aria-label" data-v-e257564d>Pager</span><div class="pager" data-v-e257564d>`);
          if (unref(control).prev?.link) {
            _push(ssrRenderComponent(_sfc_main$11, {
              class: "pager-link prev",
              href: unref(control).prev.link
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="desc" data-v-e257564d${_scopeId}>${(unref(theme2).docFooter?.prev || "Previous page") ?? ""}</span><span class="title" data-v-e257564d${_scopeId}>${unref(control).prev.text ?? ""}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: "desc",
                      innerHTML: unref(theme2).docFooter?.prev || "Previous page"
                    }, null, 8, ["innerHTML"]),
                    createVNode("span", {
                      class: "title",
                      innerHTML: unref(control).prev.text
                    }, null, 8, ["innerHTML"])
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="pager" data-v-e257564d>`);
          if (unref(control).next?.link) {
            _push(ssrRenderComponent(_sfc_main$11, {
              class: "pager-link next",
              href: unref(control).next.link
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="desc" data-v-e257564d${_scopeId}>${(unref(theme2).docFooter?.next || "Next page") ?? ""}</span><span class="title" data-v-e257564d${_scopeId}>${unref(control).next.text ?? ""}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: "desc",
                      innerHTML: unref(theme2).docFooter?.next || "Next page"
                    }, null, 8, ["innerHTML"]),
                    createVNode("span", {
                      class: "title",
                      innerHTML: unref(control).next.text
                    }, null, 8, ["innerHTML"])
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div></nav>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</footer>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$$ = _sfc_main$$.setup;
_sfc_main$$.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocFooter.vue");
  return _sfc_setup$$ ? _sfc_setup$$(props, ctx) : void 0;
};
const VPDocFooter = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["__scopeId", "data-v-e257564d"]]);
const _sfc_main$_ = /* @__PURE__ */ defineComponent({
  __name: "VPDoc",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    const route = useRoute();
    const { hasSidebar, hasAside, leftAside } = useLayout();
    const pageName = computed(
      () => route.path.replace(/[./]+/g, "_").replace(/_html$/, "")
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Content = resolveComponent("Content");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPDoc", { "has-sidebar": unref(hasSidebar), "has-aside": unref(hasAside) }]
      }, _attrs))} data-v-7011f0d8>`);
      ssrRenderSlot(_ctx.$slots, "doc-top", {}, null, _push, _parent);
      _push(`<div class="container" data-v-7011f0d8>`);
      if (unref(hasAside)) {
        _push(`<div class="${ssrRenderClass([{ "left-aside": unref(leftAside) }, "aside"])}" data-v-7011f0d8><div class="aside-curtain" data-v-7011f0d8></div><div class="aside-container" data-v-7011f0d8><div class="aside-content" data-v-7011f0d8>`);
        _push(ssrRenderComponent(VPDocAside, null, {
          "aside-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)
              ];
            }
          }),
          "aside-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="content" data-v-7011f0d8><div class="content-container" data-v-7011f0d8>`);
      ssrRenderSlot(_ctx.$slots, "doc-before", {}, null, _push, _parent);
      _push(`<main class="main" data-v-7011f0d8>`);
      _push(ssrRenderComponent(_component_Content, {
        class: ["vp-doc", [
          pageName.value,
          unref(theme2).externalLinkIcon && "external-link-icon-enabled"
        ]]
      }, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(VPDocFooter, null, {
        "doc-footer-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      ssrRenderSlot(_ctx.$slots, "doc-after", {}, null, _push, _parent);
      _push(`</div></div></div>`);
      ssrRenderSlot(_ctx.$slots, "doc-bottom", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$_ = _sfc_main$_.setup;
_sfc_main$_.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDoc.vue");
  return _sfc_setup$_ ? _sfc_setup$_(props, ctx) : void 0;
};
const VPDoc = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["__scopeId", "data-v-7011f0d8"]]);
const _sfc_main$Z = /* @__PURE__ */ defineComponent({
  __name: "VPButton",
  __ssrInlineRender: true,
  props: {
    tag: {},
    size: { default: "medium" },
    theme: { default: "brand" },
    text: {},
    href: {},
    target: {},
    rel: {}
  },
  setup(__props) {
    const props = __props;
    const isExternal2 = computed(
      () => props.href && EXTERNAL_URL_RE.test(props.href)
    );
    const component = computed(() => {
      return props.tag || (props.href ? "a" : "button");
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(component.value), mergeProps({
        class: ["VPButton", [__props.size, __props.theme]],
        href: __props.href ? unref(normalizeLink$1)(__props.href) : void 0,
        target: props.target ?? (isExternal2.value ? "_blank" : void 0),
        rel: props.rel ?? (isExternal2.value ? "noreferrer" : void 0)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(`${ssrInterpolate(__props.text)}`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(toDisplayString(__props.text), 1)
              ], true)
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup$Z = _sfc_main$Z.setup;
_sfc_main$Z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPButton.vue");
  return _sfc_setup$Z ? _sfc_setup$Z(props, ctx) : void 0;
};
const VPButton = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["__scopeId", "data-v-01bff58b"]]);
const _sfc_main$Y = /* @__PURE__ */ defineComponent({
  ...{ inheritAttrs: false },
  __name: "VPImage",
  __ssrInlineRender: true,
  props: {
    image: {},
    alt: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VPImage = resolveComponent("VPImage", true);
      if (__props.image) {
        _push(`<!--[-->`);
        if (typeof __props.image === "string" || "src" in __props.image) {
          _push(`<img${ssrRenderAttrs(mergeProps({ class: "VPImage" }, typeof __props.image === "string" ? _ctx.$attrs : { ...__props.image, ..._ctx.$attrs }, {
            src: unref(withBase)(typeof __props.image === "string" ? __props.image : __props.image.src),
            alt: __props.alt ?? (typeof __props.image === "string" ? "" : __props.image.alt || "")
          }))} data-v-8426fc1a>`);
        } else {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_VPImage, mergeProps({
            class: "dark",
            image: __props.image.dark,
            alt: __props.image.alt
          }, _ctx.$attrs), null, _parent));
          _push(ssrRenderComponent(_component_VPImage, mergeProps({
            class: "light",
            image: __props.image.light,
            alt: __props.image.alt
          }, _ctx.$attrs), null, _parent));
          _push(`<!--]-->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$Y = _sfc_main$Y.setup;
_sfc_main$Y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPImage.vue");
  return _sfc_setup$Y ? _sfc_setup$Y(props, ctx) : void 0;
};
const VPImage = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["__scopeId", "data-v-8426fc1a"]]);
const _sfc_main$X = /* @__PURE__ */ defineComponent({
  __name: "VPHero",
  __ssrInlineRender: true,
  props: {
    name: {},
    text: {},
    tagline: {},
    image: {},
    actions: {}
  },
  setup(__props) {
    const { heroImageSlotExists } = inject(
      layoutInfoInjectionKey,
      { heroImageSlotExists: computed(() => false) }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPHero", { "has-image": __props.image || unref(heroImageSlotExists) }]
      }, _attrs))} data-v-e394c869><div class="container" data-v-e394c869><div class="main" data-v-e394c869>`);
      ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, () => {
        _push(`<h1 class="heading" data-v-e394c869>`);
        if (__props.name) {
          _push(`<span class="name clip" data-v-e394c869>${__props.name ?? ""}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.text) {
          _push(`<span class="text" data-v-e394c869>${__props.text ?? ""}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</h1>`);
        if (__props.tagline) {
          _push(`<p class="tagline" data-v-e394c869>${__props.tagline ?? ""}</p>`);
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push, _parent);
      if (__props.actions) {
        _push(`<div class="actions" data-v-e394c869><!--[-->`);
        ssrRenderList(__props.actions, (action) => {
          _push(`<div class="action" data-v-e394c869>`);
          _push(ssrRenderComponent(VPButton, {
            tag: "a",
            size: "medium",
            theme: action.theme,
            text: action.text,
            href: action.link,
            target: action.target,
            rel: action.rel
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push, _parent);
      _push(`</div>`);
      if (__props.image || unref(heroImageSlotExists)) {
        _push(`<div class="image" data-v-e394c869><div class="image-container" data-v-e394c869><div class="image-bg" data-v-e394c869></div>`);
        ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, () => {
          if (__props.image) {
            _push(ssrRenderComponent(VPImage, {
              class: "image-src",
              image: __props.image
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent);
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$X = _sfc_main$X.setup;
_sfc_main$X.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHero.vue");
  return _sfc_setup$X ? _sfc_setup$X(props, ctx) : void 0;
};
const VPHero = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["__scopeId", "data-v-e394c869"]]);
const _sfc_main$W = /* @__PURE__ */ defineComponent({
  __name: "VPHomeHero",
  __ssrInlineRender: true,
  setup(__props) {
    const { frontmatter: fm } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(fm).hero) {
        _push(ssrRenderComponent(VPHero, mergeProps({
          class: "VPHomeHero",
          name: unref(fm).hero.name,
          text: unref(fm).hero.text,
          tagline: unref(fm).hero.tagline,
          image: unref(fm).hero.image,
          actions: unref(fm).hero.actions
        }, _attrs), {
          "home-hero-info-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info-before")
              ];
            }
          }),
          "home-hero-info": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info")
              ];
            }
          }),
          "home-hero-info-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info-after")
              ];
            }
          }),
          "home-hero-actions-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-actions-after")
              ];
            }
          }),
          "home-hero-image": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-image")
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$W = _sfc_main$W.setup;
_sfc_main$W.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHomeHero.vue");
  return _sfc_setup$W ? _sfc_setup$W(props, ctx) : void 0;
};
const _sfc_main$V = /* @__PURE__ */ defineComponent({
  __name: "VPFeature",
  __ssrInlineRender: true,
  props: {
    icon: {},
    title: {},
    details: {},
    link: {},
    linkText: {},
    rel: {},
    target: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$11, mergeProps({
        class: "VPFeature",
        href: __props.link,
        rel: __props.rel,
        target: __props.target,
        "no-icon": true,
        tag: __props.link ? "a" : "div"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<article class="box" data-v-5219619b${_scopeId}>`);
            if (typeof __props.icon === "object" && __props.icon.wrap) {
              _push2(`<div class="icon" data-v-5219619b${_scopeId}>`);
              _push2(ssrRenderComponent(VPImage, {
                image: __props.icon,
                alt: __props.icon.alt,
                height: __props.icon.height || 48,
                width: __props.icon.width || 48
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (typeof __props.icon === "object") {
              _push2(ssrRenderComponent(VPImage, {
                image: __props.icon,
                alt: __props.icon.alt,
                height: __props.icon.height || 48,
                width: __props.icon.width || 48
              }, null, _parent2, _scopeId));
            } else if (__props.icon) {
              _push2(`<div class="icon" data-v-5219619b${_scopeId}>${__props.icon ?? ""}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<h2 class="title" data-v-5219619b${_scopeId}>${__props.title ?? ""}</h2>`);
            if (__props.details) {
              _push2(`<p class="details" data-v-5219619b${_scopeId}>${__props.details ?? ""}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.linkText) {
              _push2(`<div class="link-text" data-v-5219619b${_scopeId}><p class="link-text-value" data-v-5219619b${_scopeId}>${ssrInterpolate(__props.linkText)} <span class="vpi-arrow-right link-text-icon" data-v-5219619b${_scopeId}></span></p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</article>`);
          } else {
            return [
              createVNode("article", { class: "box" }, [
                typeof __props.icon === "object" && __props.icon.wrap ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "icon"
                }, [
                  createVNode(VPImage, {
                    image: __props.icon,
                    alt: __props.icon.alt,
                    height: __props.icon.height || 48,
                    width: __props.icon.width || 48
                  }, null, 8, ["image", "alt", "height", "width"])
                ])) : typeof __props.icon === "object" ? (openBlock(), createBlock(VPImage, {
                  key: 1,
                  image: __props.icon,
                  alt: __props.icon.alt,
                  height: __props.icon.height || 48,
                  width: __props.icon.width || 48
                }, null, 8, ["image", "alt", "height", "width"])) : __props.icon ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "icon",
                  innerHTML: __props.icon
                }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                createVNode("h2", {
                  class: "title",
                  innerHTML: __props.title
                }, null, 8, ["innerHTML"]),
                __props.details ? (openBlock(), createBlock("p", {
                  key: 3,
                  class: "details",
                  innerHTML: __props.details
                }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                __props.linkText ? (openBlock(), createBlock("div", {
                  key: 4,
                  class: "link-text"
                }, [
                  createVNode("p", { class: "link-text-value" }, [
                    createTextVNode(toDisplayString(__props.linkText) + " ", 1),
                    createVNode("span", { class: "vpi-arrow-right link-text-icon" })
                  ])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$V = _sfc_main$V.setup;
_sfc_main$V.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFeature.vue");
  return _sfc_setup$V ? _sfc_setup$V(props, ctx) : void 0;
};
const VPFeature = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["__scopeId", "data-v-5219619b"]]);
const _sfc_main$U = /* @__PURE__ */ defineComponent({
  __name: "VPFeatures",
  __ssrInlineRender: true,
  props: {
    features: {}
  },
  setup(__props) {
    const props = __props;
    const grid = computed(() => {
      const length = props.features.length;
      if (!length) {
        return;
      } else if (length === 2) {
        return "grid-2";
      } else if (length === 3) {
        return "grid-3";
      } else if (length % 3 === 0) {
        return "grid-6";
      } else if (length > 3) {
        return "grid-4";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.features) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPFeatures" }, _attrs))} data-v-a6181336><div class="container" data-v-a6181336><div class="items" data-v-a6181336><!--[-->`);
        ssrRenderList(__props.features, (feature) => {
          _push(`<div class="${ssrRenderClass([[grid.value], "item"])}" data-v-a6181336>`);
          _push(ssrRenderComponent(VPFeature, {
            icon: feature.icon,
            title: feature.title,
            details: feature.details,
            link: feature.link,
            "link-text": feature.linkText,
            rel: feature.rel,
            target: feature.target
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$U = _sfc_main$U.setup;
_sfc_main$U.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFeatures.vue");
  return _sfc_setup$U ? _sfc_setup$U(props, ctx) : void 0;
};
const VPFeatures = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["__scopeId", "data-v-a6181336"]]);
const _sfc_main$T = /* @__PURE__ */ defineComponent({
  __name: "VPHomeFeatures",
  __ssrInlineRender: true,
  setup(__props) {
    const { frontmatter: fm } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(fm).features) {
        _push(ssrRenderComponent(VPFeatures, mergeProps({
          class: "VPHomeFeatures",
          features: unref(fm).features
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$T = _sfc_main$T.setup;
_sfc_main$T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHomeFeatures.vue");
  return _sfc_setup$T ? _sfc_setup$T(props, ctx) : void 0;
};
const _sfc_main$S = /* @__PURE__ */ defineComponent({
  __name: "VPHomeContent",
  __ssrInlineRender: true,
  setup(__props) {
    const { width: vw } = useWindowSize({
      initialWidth: 0,
      includeScrollbar: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "vp-doc container",
        style: unref(vw) ? { "--vp-offset": `calc(50% - ${unref(vw) / 2}px)` } : {}
      }, _attrs))} data-v-8e2d4988>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHomeContent.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const VPHomeContent = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["__scopeId", "data-v-8e2d4988"]]);
const _sfc_main$R = /* @__PURE__ */ defineComponent({
  __name: "VPHome",
  __ssrInlineRender: true,
  setup(__props) {
    const { frontmatter, theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Content = resolveComponent("Content");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPHome", {
          "external-link-icon-enabled": unref(theme2).externalLinkIcon
        }]
      }, _attrs))} data-v-8b561e3d>`);
      ssrRenderSlot(_ctx.$slots, "home-hero-before", {}, null, _push, _parent);
      _push(ssrRenderComponent(_sfc_main$W, null, {
        "home-hero-info-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "home-hero-info-before", {}, void 0, true)
            ];
          }
        }),
        "home-hero-info": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "home-hero-info", {}, void 0, true)
            ];
          }
        }),
        "home-hero-info-after": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "home-hero-info-after", {}, void 0, true)
            ];
          }
        }),
        "home-hero-actions-after": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "home-hero-actions-after", {}, void 0, true)
            ];
          }
        }),
        "home-hero-image": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "home-hero-image", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      ssrRenderSlot(_ctx.$slots, "home-hero-after", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "home-features-before", {}, null, _push, _parent);
      _push(ssrRenderComponent(_sfc_main$T, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "home-features-after", {}, null, _push, _parent);
      if (unref(frontmatter).markdownStyles !== false) {
        _push(ssrRenderComponent(VPHomeContent, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Content, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Content)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_Content, null, null, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHome.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const VPHome = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["__scopeId", "data-v-8b561e3d"]]);
const _sfc_main$Q = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_Content = resolveComponent("Content");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPPage" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "page-top", {}, null, _push, _parent);
  _push(ssrRenderComponent(_component_Content, null, null, _parent));
  ssrRenderSlot(_ctx.$slots, "page-bottom", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPPage.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const VPPage = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$P = /* @__PURE__ */ defineComponent({
  __name: "VPContent",
  __ssrInlineRender: true,
  setup(__props) {
    const { page, frontmatter } = useData();
    const { isHome, hasSidebar } = useLayout();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPContent", { "has-sidebar": unref(hasSidebar), "is-home": unref(isHome) }],
        id: "VPContent"
      }, _attrs))} data-v-c87f25bf>`);
      if (unref(page).isNotFound) {
        ssrRenderSlot(_ctx.$slots, "not-found", {}, () => {
          _push(ssrRenderComponent(NotFound, null, null, _parent));
        }, _push, _parent);
      } else if (unref(frontmatter).layout === "page") {
        _push(ssrRenderComponent(VPPage, null, {
          "page-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "page-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "page-top", {}, void 0, true)
              ];
            }
          }),
          "page-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "page-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "page-bottom", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
      } else if (unref(frontmatter).layout === "home") {
        _push(ssrRenderComponent(VPHome, null, {
          "home-hero-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-before", {}, void 0, true)
              ];
            }
          }),
          "home-hero-info-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info-before", {}, void 0, true)
              ];
            }
          }),
          "home-hero-info": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info", {}, void 0, true)
              ];
            }
          }),
          "home-hero-info-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info-after", {}, void 0, true)
              ];
            }
          }),
          "home-hero-actions-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-actions-after", {}, void 0, true)
              ];
            }
          }),
          "home-hero-image": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-image", {}, void 0, true)
              ];
            }
          }),
          "home-hero-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-after", {}, void 0, true)
              ];
            }
          }),
          "home-features-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-features-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-features-before", {}, void 0, true)
              ];
            }
          }),
          "home-features-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-features-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-features-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
      } else if (unref(frontmatter).layout && unref(frontmatter).layout !== "doc") {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(frontmatter).layout), null, null), _parent);
      } else {
        _push(ssrRenderComponent(VPDoc, null, {
          "doc-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-top", {}, void 0, true)
              ];
            }
          }),
          "doc-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-bottom", {}, void 0, true)
              ];
            }
          }),
          "doc-footer-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)
              ];
            }
          }),
          "doc-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-before", {}, void 0, true)
              ];
            }
          }),
          "doc-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-after", {}, void 0, true)
              ];
            }
          }),
          "aside-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)
              ];
            }
          }),
          "aside-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPContent.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const VPContent = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["__scopeId", "data-v-c87f25bf"]]);
const _sfc_main$O = /* @__PURE__ */ defineComponent({
  __name: "VPFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2, frontmatter } = useData();
    const { hasSidebar } = useLayout();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).footer && unref(frontmatter).footer !== false) {
        _push(`<footer${ssrRenderAttrs(mergeProps({
          class: ["VPFooter", { "has-sidebar": unref(hasSidebar) }]
        }, _attrs))} data-v-c3855bb3><div class="container" data-v-c3855bb3>`);
        if (unref(theme2).footer.message) {
          _push(`<p class="message" data-v-c3855bb3>${unref(theme2).footer.message ?? ""}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(theme2).footer.copyright) {
          _push(`<p class="copyright" data-v-c3855bb3>${unref(theme2).footer.copyright ?? ""}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></footer>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFooter.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const VPFooter = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["__scopeId", "data-v-c3855bb3"]]);
const _sfc_main$N = /* @__PURE__ */ defineComponent({
  __name: "VPLocalNavOutlineDropdown",
  __ssrInlineRender: true,
  props: {
    headers: {},
    navHeight: {}
  },
  setup(__props) {
    const { theme: theme2 } = useData();
    const open = ref(false);
    const vh = ref(0);
    const main = ref();
    ref();
    function closeOnClickOutside(e) {
      if (!main.value?.contains(e.target)) {
        open.value = false;
      }
    }
    watch(open, (value) => {
      if (value) {
        document.addEventListener("click", closeOnClickOutside);
        return;
      }
      document.removeEventListener("click", closeOnClickOutside);
    });
    onKeyStroke("Escape", () => {
      open.value = false;
    });
    onContentUpdated(() => {
      open.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "VPLocalNavOutlineDropdown",
        style: { "--vp-vh": vh.value + "px" },
        ref_key: "main",
        ref: main
      }, _attrs))} data-v-0bf0e06f>`);
      if (__props.headers.length > 0) {
        _push(`<button class="${ssrRenderClass({ open: open.value })}" data-v-0bf0e06f><span class="menu-text" data-v-0bf0e06f>${ssrInterpolate(unref(resolveTitle)(unref(theme2)))}</span><span class="vpi-chevron-right icon" data-v-0bf0e06f></span></button>`);
      } else {
        _push(`<button data-v-0bf0e06f>${ssrInterpolate(unref(theme2).returnToTopLabel || "Return to top")}</button>`);
      }
      if (open.value) {
        _push(`<div class="items" data-v-0bf0e06f><div class="header" data-v-0bf0e06f><a class="top-link" href="#" data-v-0bf0e06f>${ssrInterpolate(unref(theme2).returnToTopLabel || "Return to top")}</a></div><div class="outline" data-v-0bf0e06f>`);
        _push(ssrRenderComponent(VPDocOutlineItem, { headers: __props.headers }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPLocalNavOutlineDropdown.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const VPLocalNavOutlineDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["__scopeId", "data-v-0bf0e06f"]]);
const _sfc_main$M = /* @__PURE__ */ defineComponent({
  __name: "VPLocalNav",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean }
  },
  emits: ["open-menu"],
  setup(__props) {
    const { theme: theme2 } = useData();
    const { isHome, hasSidebar, headers: headers2, hasLocalNav } = useLayout();
    const { y } = useWindowScroll();
    const navHeight = ref(0);
    onMounted(() => {
      navHeight.value = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--vp-nav-height"
        )
      );
    });
    const classes = computed(() => {
      return {
        VPLocalNav: true,
        "has-sidebar": hasSidebar.value,
        empty: !hasLocalNav.value,
        fixed: !hasLocalNav.value && !hasSidebar.value
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (!unref(isHome) && (unref(hasLocalNav) || unref(hasSidebar) || unref(y) >= navHeight.value)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: classes.value }, _attrs))} data-v-db738f89><div class="container" data-v-db738f89>`);
        if (unref(hasSidebar)) {
          _push(`<button class="menu"${ssrRenderAttr("aria-expanded", __props.open)} aria-controls="VPSidebarNav" data-v-db738f89><span class="vpi-align-left menu-icon" data-v-db738f89></span><span class="menu-text" data-v-db738f89>${ssrInterpolate(unref(theme2).sidebarMenuLabel || "Menu")}</span></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(VPLocalNavOutlineDropdown, {
          headers: unref(headers2),
          navHeight: navHeight.value
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPLocalNav.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const VPLocalNav = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["__scopeId", "data-v-db738f89"]]);
function useNav() {
  const isScreenOpen = ref(false);
  function openScreen() {
    isScreenOpen.value = true;
    window.addEventListener("resize", closeScreenOnTabletWindow);
  }
  function closeScreen() {
    isScreenOpen.value = false;
    window.removeEventListener("resize", closeScreenOnTabletWindow);
  }
  function toggleScreen() {
    isScreenOpen.value ? closeScreen() : openScreen();
  }
  function closeScreenOnTabletWindow() {
    window.outerWidth >= 768 && closeScreen();
  }
  const route = useRoute();
  watch(() => route.path, closeScreen);
  return {
    isScreenOpen,
    openScreen,
    closeScreen,
    toggleScreen
  };
}
const navInjectionKey = /* @__PURE__ */ Symbol("nav");
const _sfc_main$L = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<button${ssrRenderAttrs(mergeProps({
    class: "VPSwitch",
    type: "button",
    role: "switch"
  }, _attrs))} data-v-1d5665e3><span class="check" data-v-1d5665e3>`);
  if (_ctx.$slots.default) {
    _push(`<span class="icon" data-v-1d5665e3>`);
    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
    _push(`</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</span></button>`);
}
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSwitch.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const VPSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-1d5665e3"]]);
const _sfc_main$K = /* @__PURE__ */ defineComponent({
  __name: "VPSwitchAppearance",
  __ssrInlineRender: true,
  setup(__props) {
    const { isDark, theme: theme2 } = useData();
    const toggleAppearance = inject("toggle-appearance", () => {
      isDark.value = !isDark.value;
    });
    const switchTitle = ref("");
    watchPostEffect(() => {
      switchTitle.value = isDark.value ? theme2.value.lightModeSwitchTitle || "Switch to light theme" : theme2.value.darkModeSwitchTitle || "Switch to dark theme";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VPSwitch, mergeProps({
        title: switchTitle.value,
        class: "VPSwitchAppearance",
        "aria-checked": unref(isDark),
        onClick: unref(toggleAppearance)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="vpi-sun sun" data-v-5337faa4${_scopeId}></span><span class="vpi-moon moon" data-v-5337faa4${_scopeId}></span>`);
          } else {
            return [
              createVNode("span", { class: "vpi-sun sun" }),
              createVNode("span", { class: "vpi-moon moon" })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const VPSwitchAppearance = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__scopeId", "data-v-5337faa4"]]);
const _sfc_main$J = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarAppearance",
  __ssrInlineRender: true,
  setup(__props) {
    const { site } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(site).appearance && unref(site).appearance !== "force-dark" && unref(site).appearance !== "force-auto") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavBarAppearance" }, _attrs))} data-v-6c893767>`);
        _push(ssrRenderComponent(VPSwitchAppearance, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarAppearance.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const VPNavBarAppearance = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__scopeId", "data-v-6c893767"]]);
const focusedElement = ref();
let active = false;
let listeners = 0;
function useFlyout(options) {
  const focus = ref(false);
  if (inBrowser) {
    !active && activateFocusTracking();
    listeners++;
    const unwatch = watch(focusedElement, (el) => {
      if (el === options.el.value || options.el.value?.contains(el)) {
        focus.value = true;
        options.onFocus?.();
      } else {
        focus.value = false;
        options.onBlur?.();
      }
    });
    onUnmounted(() => {
      unwatch();
      listeners--;
      if (!listeners) {
        deactivateFocusTracking();
      }
    });
  }
  return readonly(focus);
}
function activateFocusTracking() {
  document.addEventListener("focusin", handleFocusIn);
  active = true;
  focusedElement.value = document.activeElement;
}
function deactivateFocusTracking() {
  document.removeEventListener("focusin", handleFocusIn);
}
function handleFocusIn() {
  focusedElement.value = document.activeElement;
}
const _sfc_main$I = /* @__PURE__ */ defineComponent({
  ...{ inheritAttrs: false },
  __name: "VPMenuLink",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const props = __props;
    const { page } = useData();
    const href = computed(
      () => typeof props.item.link === "function" ? props.item.link(page.value) : props.item.link
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPMenuLink" }, _attrs))} data-v-faf5b206>`);
      _push(ssrRenderComponent(_sfc_main$11, mergeProps(_ctx.$attrs, {
        class: {
          active: unref(isActive)(
            unref(page).relativePath,
            __props.item.activeMatch || href.value,
            !!__props.item.activeMatch
          )
        },
        href: href.value,
        target: __props.item.target,
        rel: __props.item.rel,
        "no-icon": __props.item.noIcon
      }), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-faf5b206${_scopeId}>${__props.item.text ?? ""}</span>`);
          } else {
            return [
              createVNode("span", {
                innerHTML: __props.item.text
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPMenuLink.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const VPMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["__scopeId", "data-v-faf5b206"]]);
const _sfc_main$H = /* @__PURE__ */ defineComponent({
  __name: "VPMenuGroup",
  __ssrInlineRender: true,
  props: {
    text: {},
    items: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPMenuGroup" }, _attrs))} data-v-1963e1bb>`);
      if (__props.text) {
        _push(`<p class="title" data-v-1963e1bb>${ssrInterpolate(__props.text)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<!--[-->`);
        if ("link" in item) {
          _push(ssrRenderComponent(VPMenuLink, { item }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPMenuGroup.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const VPMenuGroup = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__scopeId", "data-v-1963e1bb"]]);
const _sfc_main$G = /* @__PURE__ */ defineComponent({
  __name: "VPMenu",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPMenu" }, _attrs))} data-v-25a6cce8>`);
      if (__props.items) {
        _push(`<div class="items" data-v-25a6cce8><!--[-->`);
        ssrRenderList(__props.items, (item) => {
          _push(`<!--[-->`);
          if ("link" in item) {
            _push(ssrRenderComponent(VPMenuLink, { item }, null, _parent));
          } else if ("component" in item) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.component), mergeProps({ ref_for: true }, item.props), null), _parent);
          } else {
            _push(ssrRenderComponent(VPMenuGroup, {
              text: item.text,
              items: item.items
            }, null, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPMenu.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const VPMenu = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__scopeId", "data-v-25a6cce8"]]);
const _sfc_main$F = /* @__PURE__ */ defineComponent({
  __name: "VPFlyout",
  __ssrInlineRender: true,
  props: {
    icon: {},
    button: {},
    label: {},
    items: {}
  },
  setup(__props) {
    const open = ref(false);
    const el = ref();
    useFlyout({ el, onBlur });
    function onBlur() {
      open.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "VPFlyout",
        ref_key: "el",
        ref: el
      }, _attrs))} data-v-42cb505d><button type="button" class="button" aria-haspopup="true"${ssrRenderAttr("aria-expanded", open.value)}${ssrRenderAttr("aria-label", __props.label)} data-v-42cb505d>`);
      if (__props.button || __props.icon) {
        _push(`<span class="text" data-v-42cb505d>`);
        if (__props.icon) {
          _push(`<span class="${ssrRenderClass([__props.icon, "option-icon"])}" data-v-42cb505d></span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.button) {
          _push(`<span data-v-42cb505d>${__props.button ?? ""}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="vpi-chevron-down text-icon" data-v-42cb505d></span></span>`);
      } else {
        _push(`<span class="vpi-more-horizontal icon" data-v-42cb505d></span>`);
      }
      _push(`</button><div class="menu" data-v-42cb505d>`);
      _push(ssrRenderComponent(VPMenu, { items: __props.items }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFlyout.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const VPFlyout = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__scopeId", "data-v-42cb505d"]]);
const _sfc_main$E = /* @__PURE__ */ defineComponent({
  __name: "VPSocialLink",
  __ssrInlineRender: true,
  props: {
    icon: {},
    link: {},
    ariaLabel: {},
    me: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const el = ref();
    onMounted(async () => {
      await nextTick();
      const span = el.value?.children[0];
      if (span instanceof HTMLElement && span.className.startsWith("vpi-social-") && (getComputedStyle(span).maskImage || getComputedStyle(span).webkitMaskImage) === "none") {
        span.style.setProperty(
          "--icon",
          `url('https://api.iconify.design/simple-icons/${props.icon}.svg')`
        );
      }
    });
    const svg = computed(() => {
      if (typeof props.icon === "object") return props.icon.svg;
      return `<span class="vpi-social-${props.icon}"></span>`;
    });
    {
      typeof props.icon === "string" && useSSRContext()?.vpSocialIcons.add(props.icon);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        ref_key: "el",
        ref: el,
        class: "VPSocialLink no-icon",
        href: __props.link,
        "aria-label": __props.ariaLabel ?? (typeof __props.icon === "string" ? __props.icon : ""),
        target: "_blank",
        rel: __props.me ? "me noopener" : "noopener"
      }, _attrs))} data-v-591a6b30>${svg.value ?? ""}</a>`);
    };
  }
});
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSocialLink.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const VPSocialLink = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__scopeId", "data-v-591a6b30"]]);
const _sfc_main$D = /* @__PURE__ */ defineComponent({
  __name: "VPSocialLinks",
  __ssrInlineRender: true,
  props: {
    links: {},
    me: { type: Boolean, default: true }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPSocialLinks" }, _attrs))} data-v-d07f11e6><!--[-->`);
      ssrRenderList(__props.links, ({ link: link2, icon, ariaLabel }) => {
        _push(ssrRenderComponent(VPSocialLink, {
          key: link2,
          icon,
          link: link2,
          ariaLabel,
          me: __props.me
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSocialLinks.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const VPSocialLinks = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__scopeId", "data-v-d07f11e6"]]);
const _sfc_main$C = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarExtra",
  __ssrInlineRender: true,
  setup(__props) {
    const { site, theme: theme2 } = useData();
    const { localeLinks, currentLang } = useLangs({ correspondingLink: true });
    const hasExtraContent = computed(
      () => localeLinks.value.length && currentLang.value.label || site.value.appearance || theme2.value.socialLinks
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (hasExtraContent.value) {
        _push(ssrRenderComponent(VPFlyout, mergeProps({
          class: "VPNavBarExtra",
          label: "extra navigation"
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(localeLinks).length && unref(currentLang).label) {
                _push2(`<div class="group translations" data-v-bf2fac68${_scopeId}><p class="trans-title" data-v-bf2fac68${_scopeId}>${ssrInterpolate(unref(currentLang).label)}</p><!--[-->`);
                ssrRenderList(unref(localeLinks), (locale) => {
                  _push2(ssrRenderComponent(VPMenuLink, {
                    item: locale,
                    lang: locale.lang,
                    dir: locale.dir
                  }, null, _parent2, _scopeId));
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(site).appearance && unref(site).appearance !== "force-dark" && unref(site).appearance !== "force-auto") {
                _push2(`<div class="group" data-v-bf2fac68${_scopeId}><div class="item appearance" data-v-bf2fac68${_scopeId}><p class="label" data-v-bf2fac68${_scopeId}>${ssrInterpolate(unref(theme2).darkModeSwitchLabel || "Appearance")}</p><div class="appearance-action" data-v-bf2fac68${_scopeId}>`);
                _push2(ssrRenderComponent(VPSwitchAppearance, null, null, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(theme2).socialLinks) {
                _push2(`<div class="group" data-v-bf2fac68${_scopeId}><div class="item social-links" data-v-bf2fac68${_scopeId}>`);
                _push2(ssrRenderComponent(VPSocialLinks, {
                  class: "social-links-list",
                  links: unref(theme2).socialLinks
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(localeLinks).length && unref(currentLang).label ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "group translations"
                }, [
                  createVNode("p", { class: "trans-title" }, toDisplayString(unref(currentLang).label), 1),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(localeLinks), (locale) => {
                    return openBlock(), createBlock(VPMenuLink, {
                      key: locale.link,
                      item: locale,
                      lang: locale.lang,
                      dir: locale.dir
                    }, null, 8, ["item", "lang", "dir"]);
                  }), 128))
                ])) : createCommentVNode("", true),
                unref(site).appearance && unref(site).appearance !== "force-dark" && unref(site).appearance !== "force-auto" ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "group"
                }, [
                  createVNode("div", { class: "item appearance" }, [
                    createVNode("p", { class: "label" }, toDisplayString(unref(theme2).darkModeSwitchLabel || "Appearance"), 1),
                    createVNode("div", { class: "appearance-action" }, [
                      createVNode(VPSwitchAppearance)
                    ])
                  ])
                ])) : createCommentVNode("", true),
                unref(theme2).socialLinks ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "group"
                }, [
                  createVNode("div", { class: "item social-links" }, [
                    createVNode(VPSocialLinks, {
                      class: "social-links-list",
                      links: unref(theme2).socialLinks
                    }, null, 8, ["links"])
                  ])
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarExtra.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const VPNavBarExtra = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-bf2fac68"]]);
const _sfc_main$B = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarHamburger",
  __ssrInlineRender: true,
  props: {
    active: { type: Boolean }
  },
  emits: ["click"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: ["VPNavBarHamburger", { active: __props.active }],
        "aria-label": "mobile navigation",
        "aria-expanded": __props.active,
        "aria-controls": "VPNavScreen"
      }, _attrs))} data-v-e5dd9c1c><span class="container" data-v-e5dd9c1c><span class="top" data-v-e5dd9c1c></span><span class="middle" data-v-e5dd9c1c></span><span class="bottom" data-v-e5dd9c1c></span></span></button>`);
    };
  }
});
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarHamburger.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const VPNavBarHamburger = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__scopeId", "data-v-e5dd9c1c"]]);
const _sfc_main$A = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarMenuLink",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const props = __props;
    const { page } = useData();
    const href = computed(
      () => typeof props.item.link === "function" ? props.item.link(page.value) : props.item.link
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$11, mergeProps({
        class: {
          VPNavBarMenuLink: true,
          active: unref(isActive)(
            unref(page).relativePath,
            __props.item.activeMatch || href.value,
            !!__props.item.activeMatch
          )
        },
        href: href.value,
        target: __props.item.target,
        rel: __props.item.rel,
        "no-icon": __props.item.noIcon,
        tabindex: "0"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-52a1d768${_scopeId}>${__props.item.text ?? ""}</span>`);
          } else {
            return [
              createVNode("span", {
                innerHTML: __props.item.text
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const VPNavBarMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__scopeId", "data-v-52a1d768"]]);
const _sfc_main$z = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarMenuGroup",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const props = __props;
    const { page } = useData();
    const isChildActive = (navItem) => {
      if ("component" in navItem) return false;
      if ("link" in navItem) {
        return isActive(
          page.value.relativePath,
          typeof navItem.link === "function" ? navItem.link(page.value) : navItem.link,
          !!props.item.activeMatch
        );
      }
      return navItem.items.some(isChildActive);
    };
    const childrenActive = computed(() => isChildActive(props.item));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VPFlyout, mergeProps({
        class: {
          VPNavBarMenuGroup: true,
          active: unref(isActive)(unref(page).relativePath, __props.item.activeMatch, !!__props.item.activeMatch) || childrenActive.value
        },
        button: __props.item.text,
        items: __props.item.items
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).nav) {
        _push(`<nav${ssrRenderAttrs(mergeProps({
          "aria-labelledby": "main-nav-aria-label",
          class: "VPNavBarMenu"
        }, _attrs))} data-v-39714824><span id="main-nav-aria-label" class="visually-hidden" data-v-39714824> Main Navigation </span><!--[-->`);
        ssrRenderList(unref(theme2).nav, (item) => {
          _push(`<!--[-->`);
          if ("link" in item) {
            _push(ssrRenderComponent(VPNavBarMenuLink, { item }, null, _parent));
          } else if ("component" in item) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.component), mergeProps({ ref_for: true }, item.props), null), _parent);
          } else {
            _push(ssrRenderComponent(_sfc_main$z, { item }, null, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenu.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const VPNavBarMenu = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__scopeId", "data-v-39714824"]]);
function resolveMode(options) {
  const mode = options.mode ?? "auto";
  const hasKeyword = hasKeywordSearch(options);
  const askAi = options.askAi;
  const hasSidePanelConfig = Boolean(askAi && typeof askAi === "object" && askAi.sidePanel);
  switch (mode) {
    case "sidePanel":
      return {
        mode,
        showKeywordSearch: false,
        useSidePanel: true
      };
    case "hybrid":
      if (!hasKeyword) {
        console.error('[vitepress] mode: "hybrid" requires keyword search credentials (appId, apiKey, indexName).');
      }
      return {
        mode,
        showKeywordSearch: hasKeyword,
        useSidePanel: true
      };
    case "modal":
      return {
        mode,
        showKeywordSearch: hasKeyword,
        useSidePanel: false
      };
    case "auto":
    default:
      return {
        mode: "auto",
        showKeywordSearch: hasKeyword,
        useSidePanel: hasSidePanelConfig
      };
  }
}
function hasKeywordSearch(options) {
  return Boolean(options.appId && options.apiKey && options.indexName);
}
function mergeLangFacetFilters(rawFacetFilters, lang) {
  const input = Array.isArray(rawFacetFilters) ? rawFacetFilters : rawFacetFilters ? [rawFacetFilters] : [];
  const filtered = input.map((filter) => {
    if (Array.isArray(filter)) {
      return filter.filter((f) => typeof f === "string" && !f.startsWith("lang:"));
    }
    return filter;
  }).filter((filter) => {
    if (typeof filter === "string") {
      return !filter.startsWith("lang:");
    }
    return Array.isArray(filter) && filter.length > 0;
  });
  return [...filtered, `lang:${lang}`];
}
function buildAskAiConfig(askAiProp, options, lang) {
  const isAskAiString = typeof askAiProp === "string";
  const askAiSearchParameters = !isAskAiString && askAiProp.searchParameters ? { ...askAiProp.searchParameters } : void 0;
  const askAiFacetFiltersSource = askAiSearchParameters?.facetFilters ?? options.searchParameters?.facetFilters;
  const askAiFacetFilters = mergeLangFacetFilters(askAiFacetFiltersSource, lang);
  const mergedAskAiSearchParameters = {
    ...askAiSearchParameters,
    facetFilters: askAiFacetFilters.length ? askAiFacetFilters : void 0
  };
  const result = {
    ...isAskAiString ? {} : askAiProp,
    indexName: isAskAiString ? options.indexName : askAiProp.indexName,
    apiKey: isAskAiString ? options.apiKey : askAiProp.apiKey,
    appId: isAskAiString ? options.appId : askAiProp.appId,
    assistantId: isAskAiString ? askAiProp : askAiProp.assistantId
  };
  if (Object.values(mergedAskAiSearchParameters).some((v) => v != null)) {
    result.searchParameters = mergedAskAiSearchParameters;
  }
  return result;
}
function resolveOptionsForLanguage(options, localeIndex, lang) {
  options = deepMerge(options, options.locales?.[localeIndex] || {});
  const facetFilters = mergeLangFacetFilters(options.searchParameters?.facetFilters, lang);
  const askAi = options.askAi ? buildAskAiConfig(options.askAi, options, lang) : void 0;
  return {
    ...options,
    searchParameters: { ...options.searchParameters, facetFilters },
    askAi
  };
}
function deepMerge(target, source) {
  const result = { ...target };
  for (const key in source) {
    const value = source[key];
    if (value === void 0)
      continue;
    if (key === "searchParameters") {
      result[key] = value;
      continue;
    }
    if (isObject(value) && isObject(result[key])) {
      result[key] = deepMerge(result[key], value);
    } else {
      result[key] = value;
    }
  }
  delete result.locales;
  return result;
}
function smartComputed(getter, comparator = (oldValue, newValue) => JSON.stringify(oldValue) === JSON.stringify(newValue)) {
  return computed((oldValue) => {
    const newValue = getter();
    return oldValue === void 0 || !comparator(oldValue, newValue) ? newValue : oldValue;
  });
}
const _sfc_main$x = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<button${ssrRenderAttrs(mergeProps({
    type: "button",
    class: "VPNavBarAskAiButton"
  }, _attrs))} data-v-4eb17e89><span class="vpi-sparkles" aria-hidden="true" data-v-4eb17e89></span></button>`);
}
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarAskAiButton.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const VPNavBarAskAiButton = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-4eb17e89"]]);
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarSearchButton",
  __ssrInlineRender: true,
  props: {
    text: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: "VPNavBarSearchButton"
      }, _attrs))} data-v-baa3be99><span class="vpi-search" aria-hidden="true" data-v-baa3be99></span><span class="text" data-v-baa3be99>${ssrInterpolate(__props.text)}</span><span class="keys" aria-hidden="true" data-v-baa3be99><kbd class="key-cmd" data-v-baa3be99>⌘</kbd><kbd class="key-ctrl" data-v-baa3be99>Ctrl</kbd><kbd data-v-baa3be99>K</kbd></span></button>`);
    };
  }
});
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarSearchButton.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const VPNavBarSearchButton = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__scopeId", "data-v-baa3be99"]]);
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarSearch",
  __ssrInlineRender: true,
  setup(__props) {
    const VPLocalSearchBox = defineAsyncComponent(() => import("./VPLocalSearchBox.CsJp4R99.js"));
    const VPAlgoliaSearchBox = () => null;
    const { theme: theme2, localeIndex, lang } = useData();
    const provider = "local";
    const algoliaOptions = smartComputed(() => {
      return resolveOptionsForLanguage(
        theme2.value.search?.options || {},
        localeIndex.value,
        lang.value
      );
    });
    const resolvedMode = computed(() => resolveMode(algoliaOptions.value));
    const askAiSidePanelConfig = computed(() => {
      if (!resolvedMode.value.useSidePanel) return null;
      const askAi = algoliaOptions.value.askAi;
      if (!askAi || typeof askAi === "string") return null;
      if (!askAi.sidePanel) return null;
      return askAi.sidePanel === true ? {} : askAi.sidePanel;
    });
    const askAiShortcutEnabled = computed(() => {
      return askAiSidePanelConfig.value?.keyboardShortcuts?.["Ctrl/Cmd+I"] !== false;
    });
    const openRequest = ref(null);
    let openNonce = 0;
    const loaded = ref(false);
    const actuallyLoaded = ref(false);
    onMounted(() => {
      return;
    });
    function loadAndOpen(target) {
      if (!loaded.value) {
        loaded.value = true;
      }
      openRequest.value = { target, nonce: ++openNonce };
    }
    const showSearch = ref(false);
    {
      onKeyStroke("k", (event) => {
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          showSearch.value = true;
        }
      });
      onKeyStroke("/", (event) => {
        if (!isEditingContent(event)) {
          event.preventDefault();
          showSearch.value = true;
        }
      });
    }
    function isEditingContent(event) {
      const element = event.target;
      const tagName = element.tagName;
      return element.isContentEditable || tagName === "INPUT" || tagName === "SELECT" || tagName === "TEXTAREA";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavBarSearch" }, _attrs))} data-v-2fc7f2c6>`);
      if (unref(provider) === "algolia") {
        _push(`<!--[-->`);
        if (resolvedMode.value.showKeywordSearch) {
          _push(ssrRenderComponent(VPNavBarSearchButton, {
            text: unref(algoliaOptions).translations?.button?.buttonText || "Search",
            "aria-label": unref(algoliaOptions).translations?.button?.buttonAriaLabel || "Search",
            "aria-keyshortcuts": "/ control+k meta+k",
            onClick: ($event) => loadAndOpen("search")
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (askAiSidePanelConfig.value) {
          _push(ssrRenderComponent(VPNavBarAskAiButton, {
            "aria-label": askAiSidePanelConfig.value.button?.translations?.buttonAriaLabel || "Ask AI",
            "aria-keyshortcuts": askAiShortcutEnabled.value ? "control+i meta+i" : void 0,
            onClick: ($event) => actuallyLoaded.value ? loadAndOpen("toggleAskAi") : loadAndOpen("askAi")
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (loaded.value) {
          _push(ssrRenderComponent(unref(VPAlgoliaSearchBox), {
            "algolia-options": unref(algoliaOptions),
            "open-request": openRequest.value,
            onVnodeBeforeMount: ($event) => actuallyLoaded.value = true
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else if (unref(provider) === "local") {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(VPNavBarSearchButton, {
          text: unref(algoliaOptions).translations?.button?.buttonText || "Search",
          "aria-label": unref(algoliaOptions).translations?.button?.buttonAriaLabel || "Search",
          "aria-keyshortcuts": "/ control+k meta+k",
          onClick: ($event) => showSearch.value = true
        }, null, _parent));
        if (showSearch.value) {
          _push(ssrRenderComponent(unref(VPLocalSearchBox), {
            onClose: ($event) => showSearch.value = false
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarSearch.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const VPNavBarSearch = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-2fc7f2c6"]]);
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarSocialLinks",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).socialLinks) {
        _push(ssrRenderComponent(VPSocialLinks, mergeProps({
          class: "VPNavBarSocialLinks",
          links: unref(theme2).socialLinks
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarSocialLinks.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const VPNavBarSocialLinks = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-0394ad82"]]);
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarTitle",
  __ssrInlineRender: true,
  setup(__props) {
    const { site, theme: theme2 } = useData();
    const { hasSidebar } = useLayout();
    const { currentLang } = useLangs();
    const link2 = computed(
      () => typeof theme2.value.logoLink === "string" ? theme2.value.logoLink : theme2.value.logoLink?.link
    );
    const rel = computed(
      () => typeof theme2.value.logoLink === "string" ? void 0 : theme2.value.logoLink?.rel
    );
    const target = computed(
      () => typeof theme2.value.logoLink === "string" ? void 0 : theme2.value.logoLink?.target
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPNavBarTitle", { "has-sidebar": unref(hasSidebar) }]
      }, _attrs))} data-v-1e38c6bc><a class="title"${ssrRenderAttr("href", link2.value ?? unref(normalizeLink$1)(unref(currentLang).link))}${ssrRenderAttr("rel", rel.value)}${ssrRenderAttr("target", target.value)} data-v-1e38c6bc>`);
      ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push, _parent);
      if (unref(theme2).logo) {
        _push(ssrRenderComponent(VPImage, {
          class: "logo",
          image: unref(theme2).logo
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(theme2).siteTitle) {
        _push(`<span data-v-1e38c6bc>${unref(theme2).siteTitle ?? ""}</span>`);
      } else if (unref(theme2).siteTitle === void 0) {
        _push(`<span data-v-1e38c6bc>${ssrInterpolate(unref(site).title)}</span>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push, _parent);
      _push(`</a></div>`);
    };
  }
});
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarTitle.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const VPNavBarTitle = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-1e38c6bc"]]);
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarTranslations",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    const { localeLinks, currentLang } = useLangs({ correspondingLink: true });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(localeLinks).length && unref(currentLang).label) {
        _push(ssrRenderComponent(VPFlyout, mergeProps({
          class: "VPNavBarTranslations",
          icon: "vpi-languages",
          label: unref(theme2).langMenuLabel || "Change language"
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="items" data-v-4c1766e2${_scopeId}><p class="title" data-v-4c1766e2${_scopeId}>${ssrInterpolate(unref(currentLang).label)}</p><!--[-->`);
              ssrRenderList(unref(localeLinks), (locale) => {
                _push2(ssrRenderComponent(VPMenuLink, {
                  item: locale,
                  lang: locale.lang,
                  dir: locale.dir
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "items" }, [
                  createVNode("p", { class: "title" }, toDisplayString(unref(currentLang).label), 1),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(localeLinks), (locale) => {
                    return openBlock(), createBlock(VPMenuLink, {
                      key: locale.link,
                      item: locale,
                      lang: locale.lang,
                      dir: locale.dir
                    }, null, 8, ["item", "lang", "dir"]);
                  }), 128))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarTranslations.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const VPNavBarTranslations = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-4c1766e2"]]);
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "VPNavBar",
  __ssrInlineRender: true,
  props: {
    isScreenOpen: { type: Boolean }
  },
  emits: ["toggle-screen"],
  setup(__props) {
    const { y } = useWindowScroll();
    const { isHome, hasSidebar } = useLayout();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPNavBar", {
          "has-sidebar": unref(hasSidebar),
          "home": unref(isHome),
          "top": unref(y) === 0,
          "screen-open": __props.isScreenOpen
        }]
      }, _attrs))} data-v-9ca1369d><div class="wrapper" data-v-9ca1369d><div class="container" data-v-9ca1369d><div class="title" data-v-9ca1369d>`);
      _push(ssrRenderComponent(VPNavBarTitle, null, {
        "nav-bar-title-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)
            ];
          }
        }),
        "nav-bar-title-after": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div><div class="content" data-v-9ca1369d><div class="content-body" data-v-9ca1369d>`);
      ssrRenderSlot(_ctx.$slots, "nav-bar-content-before", {}, null, _push, _parent);
      _push(ssrRenderComponent(VPNavBarSearch, { class: "search" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarMenu, { class: "menu" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarTranslations, { class: "translations" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarAppearance, { class: "appearance" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarSocialLinks, { class: "social-links" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarExtra, { class: "extra" }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "nav-bar-content-after", {}, null, _push, _parent);
      _push(ssrRenderComponent(VPNavBarHamburger, {
        class: "hamburger",
        active: __props.isScreenOpen,
        onClick: ($event) => _ctx.$emit("toggle-screen")
      }, null, _parent));
      _push(`</div></div></div></div><div class="divider" data-v-9ca1369d><div class="divider-line" data-v-9ca1369d></div></div></div>`);
    };
  }
});
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBar.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const VPNavBar = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-9ca1369d"]]);
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenAppearance",
  __ssrInlineRender: true,
  setup(__props) {
    const { site, theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(site).appearance && unref(site).appearance !== "force-dark" && unref(site).appearance !== "force-auto") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavScreenAppearance" }, _attrs))} data-v-b44890b2><p class="text" data-v-b44890b2>${ssrInterpolate(unref(theme2).darkModeSwitchLabel || "Appearance")}</p>`);
        _push(ssrRenderComponent(VPSwitchAppearance, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenAppearance.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const VPNavScreenAppearance = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-b44890b2"]]);
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuLink",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const props = __props;
    const { page } = useData();
    const href = computed(
      () => typeof props.item.link === "function" ? props.item.link(page.value) : props.item.link
    );
    const isActiveLink = computed(
      () => isActive(
        page.value.relativePath,
        props.item.activeMatch || href.value,
        !!props.item.activeMatch
      )
    );
    const { closeScreen } = inject(navInjectionKey);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$11, mergeProps({
        class: { VPNavScreenMenuLink: true, active: isActiveLink.value },
        href: href.value,
        target: __props.item.target,
        rel: __props.item.rel,
        "no-icon": __props.item.noIcon,
        onClick: unref(closeScreen)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-b924ab8a${_scopeId}>${__props.item.text ?? ""}</span>`);
          } else {
            return [
              createVNode("span", {
                innerHTML: __props.item.text
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuLink.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const VPNavScreenMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-b924ab8a"]]);
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuGroupLink",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const props = __props;
    const { page } = useData();
    const href = computed(
      () => typeof props.item.link === "function" ? props.item.link(page.value) : props.item.link
    );
    const isActiveLink = computed(
      () => isActive(
        page.value.relativePath,
        props.item.activeMatch || href.value,
        !!props.item.activeMatch
      )
    );
    const { closeScreen } = inject(navInjectionKey);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$11, mergeProps({
        class: { VPNavScreenMenuGroupLink: true, active: isActiveLink.value },
        href: href.value,
        target: __props.item.target,
        rel: __props.item.rel,
        "no-icon": __props.item.noIcon,
        onClick: unref(closeScreen)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-ecf4b472${_scopeId}>${__props.item.text ?? ""}</span>`);
          } else {
            return [
              createVNode("span", {
                innerHTML: __props.item.text
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroupLink.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const VPNavScreenMenuGroupLink = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-ecf4b472"]]);
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuGroupSection",
  __ssrInlineRender: true,
  props: {
    text: {},
    items: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavScreenMenuGroupSection" }, _attrs))} data-v-4b7a798b>`);
      if (__props.text) {
        _push(`<p class="title" data-v-4b7a798b>${ssrInterpolate(__props.text)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(ssrRenderComponent(VPNavScreenMenuGroupLink, {
          key: item.text,
          item
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroupSection.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const VPNavScreenMenuGroupSection = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-4b7a798b"]]);
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuGroup",
  __ssrInlineRender: true,
  props: {
    text: {},
    items: {}
  },
  setup(__props) {
    const props = __props;
    const isOpen2 = ref(false);
    const groupId = computed(
      () => `NavScreenGroup-${props.text.replace(" ", "-").toLowerCase()}`
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPNavScreenMenuGroup", { open: isOpen2.value }]
      }, _attrs))} data-v-956364f9><button class="button"${ssrRenderAttr("aria-controls", groupId.value)}${ssrRenderAttr("aria-expanded", isOpen2.value)} data-v-956364f9><span class="button-text" data-v-956364f9>${__props.text ?? ""}</span><span class="vpi-plus button-icon" data-v-956364f9></span></button><div${ssrRenderAttr("id", groupId.value)} class="items" data-v-956364f9><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<!--[-->`);
        if ("link" in item) {
          _push(`<div class="item" data-v-956364f9>`);
          _push(ssrRenderComponent(VPNavScreenMenuGroupLink, { item }, null, _parent));
          _push(`</div>`);
        } else if ("component" in item) {
          _push(`<div class="item" data-v-956364f9>`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.component), mergeProps({ ref_for: true }, item.props, { "screen-menu": "" }), null), _parent);
          _push(`</div>`);
        } else {
          _push(`<div class="group" data-v-956364f9>`);
          _push(ssrRenderComponent(VPNavScreenMenuGroupSection, {
            text: item.text,
            items: item.items
          }, null, _parent));
          _push(`</div>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroup.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const VPNavScreenMenuGroup = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-956364f9"]]);
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).nav) {
        _push(`<nav${ssrRenderAttrs(mergeProps({ class: "VPNavScreenMenu" }, _attrs))}><!--[-->`);
        ssrRenderList(unref(theme2).nav, (item) => {
          _push(`<!--[-->`);
          if ("link" in item) {
            _push(ssrRenderComponent(VPNavScreenMenuLink, { item }, null, _parent));
          } else if ("component" in item) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.component), mergeProps({ ref_for: true }, item.props, { "screen-menu": "" }), null), _parent);
          } else {
            _push(ssrRenderComponent(VPNavScreenMenuGroup, {
              text: item.text || "",
              items: item.items
            }, null, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenu.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenSocialLinks",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).socialLinks) {
        _push(ssrRenderComponent(VPSocialLinks, mergeProps({
          class: "VPNavScreenSocialLinks",
          links: unref(theme2).socialLinks
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenSocialLinks.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenTranslations",
  __ssrInlineRender: true,
  setup(__props) {
    const { localeLinks, currentLang } = useLangs({ correspondingLink: true });
    const isOpen2 = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(localeLinks).length && unref(currentLang).label) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ["VPNavScreenTranslations", { open: isOpen2.value }]
        }, _attrs))} data-v-a4d9b172><button class="title" data-v-a4d9b172><span class="vpi-languages icon lang" data-v-a4d9b172></span> ${ssrInterpolate(unref(currentLang).label)} <span class="vpi-chevron-down icon chevron" data-v-a4d9b172></span></button><ul class="list" data-v-a4d9b172><!--[-->`);
        ssrRenderList(unref(localeLinks), (locale) => {
          _push(`<li class="item" data-v-a4d9b172>`);
          _push(ssrRenderComponent(_sfc_main$11, {
            class: "link",
            href: locale.link,
            lang: locale.lang,
            dir: locale.dir
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(locale.text)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(locale.text), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenTranslations.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const VPNavScreenTranslations = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-a4d9b172"]]);
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreen",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean }
  },
  setup(__props) {
    useScrollLock(inBrowser ? document.body : null);
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.open) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "VPNavScreen",
          id: "VPNavScreen"
        }, _attrs))} data-v-05f3d7bc><div class="container" data-v-05f3d7bc>`);
        ssrRenderSlot(_ctx.$slots, "nav-screen-content-before", {}, null, _push, _parent);
        _push(ssrRenderComponent(_sfc_main$l, { class: "menu" }, null, _parent));
        _push(ssrRenderComponent(VPNavScreenTranslations, { class: "translations" }, null, _parent));
        _push(ssrRenderComponent(VPNavScreenAppearance, { class: "appearance" }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$k, { class: "social-links" }, null, _parent));
        ssrRenderSlot(_ctx.$slots, "nav-screen-content-after", {}, null, _push, _parent);
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreen.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const VPNavScreen = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-05f3d7bc"]]);
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "VPNav",
  __ssrInlineRender: true,
  setup(__props) {
    const { isScreenOpen, closeScreen, toggleScreen } = useNav();
    const { frontmatter } = useData();
    const hasNavbar = computed(() => {
      return frontmatter.value.navbar !== false;
    });
    provide(navInjectionKey, { closeScreen });
    watchEffect(() => {
      if (inBrowser) {
        document.documentElement.classList.toggle("hide-nav", !hasNavbar.value);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (hasNavbar.value) {
        _push(`<header${ssrRenderAttrs(mergeProps({ class: "VPNav" }, _attrs))} data-v-9f75dce3>`);
        _push(ssrRenderComponent(VPNavBar, {
          "is-screen-open": unref(isScreenOpen),
          onToggleScreen: unref(toggleScreen)
        }, {
          "nav-bar-title-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-title-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-content-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-content-before", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-content-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-content-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(ssrRenderComponent(VPNavScreen, { open: unref(isScreenOpen) }, {
          "nav-screen-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-screen-content-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-screen-content-before", {}, void 0, true)
              ];
            }
          }),
          "nav-screen-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-screen-content-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-screen-content-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(`</header>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNav.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const VPNav = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-9f75dce3"]]);
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "VPSidebarItem",
  __ssrInlineRender: true,
  props: {
    item: {},
    depth: {}
  },
  setup(__props) {
    const props = __props;
    const {
      collapsed,
      collapsible,
      isLink,
      isActiveLink,
      hasActiveLink: hasActiveLink2,
      hasChildren,
      toggle
    } = useSidebarItemControl(computed(() => props.item));
    const sectionTag = computed(() => hasChildren.value ? "section" : `div`);
    const linkTag = computed(() => isLink.value ? "a" : "div");
    const textTag = computed(() => {
      return !hasChildren.value ? "p" : props.depth + 2 === 7 ? "p" : `h${props.depth + 2}`;
    });
    const itemRole = computed(() => isLink.value ? void 0 : "button");
    const classes = computed(() => [
      [`level-${props.depth}`],
      { collapsible: collapsible.value },
      { collapsed: collapsed.value },
      { "is-link": isLink.value },
      { "is-active": isActiveLink.value },
      { "has-active": hasActiveLink2.value }
    ]);
    function onItemInteraction(e) {
      if ("key" in e && e.key !== "Enter") {
        return;
      }
      !props.item.link && toggle();
    }
    function onCaretClick() {
      props.item.link && toggle();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VPSidebarItem = resolveComponent("VPSidebarItem", true);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(sectionTag.value), mergeProps({
        class: ["VPSidebarItem", classes.value]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.item.text) {
              _push2(`<div class="item"${ssrRenderAttr("role", itemRole.value)}${ssrRenderAttr("tabindex", __props.item.items && 0)} data-v-d81de50c${_scopeId}><div class="indicator" data-v-d81de50c${_scopeId}></div>`);
              if (__props.item.link) {
                _push2(ssrRenderComponent(_sfc_main$11, {
                  tag: linkTag.value,
                  class: "link",
                  href: __props.item.link,
                  rel: __props.item.rel,
                  target: __props.item.target
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(textTag.value), { class: "text" }, null), _parent3, _scopeId2);
                    } else {
                      return [
                        (openBlock(), createBlock(resolveDynamicComponent(textTag.value), {
                          class: "text",
                          innerHTML: __props.item.text
                        }, null, 8, ["innerHTML"]))
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(textTag.value), { class: "text" }, null), _parent2, _scopeId);
              }
              if (__props.item.collapsed != null && __props.item.items && __props.item.items.length) {
                _push2(`<div class="caret" role="button" aria-label="toggle section" tabindex="0" data-v-d81de50c${_scopeId}><span class="vpi-chevron-right caret-icon" data-v-d81de50c${_scopeId}></span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.item.items && __props.item.items.length) {
              _push2(`<div class="items" data-v-d81de50c${_scopeId}>`);
              if (__props.depth < 5) {
                _push2(`<!--[-->`);
                ssrRenderList(__props.item.items, (i) => {
                  _push2(ssrRenderComponent(_component_VPSidebarItem, {
                    key: i.text,
                    item: i,
                    depth: __props.depth + 1
                  }, null, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.item.text ? (openBlock(), createBlock("div", mergeProps({
                key: 0,
                class: "item",
                role: itemRole.value
              }, toHandlers(
                __props.item.items ? { click: onItemInteraction, keydown: onItemInteraction } : {},
                true
              ), {
                tabindex: __props.item.items && 0
              }), [
                createVNode("div", { class: "indicator" }),
                __props.item.link ? (openBlock(), createBlock(_sfc_main$11, {
                  key: 0,
                  tag: linkTag.value,
                  class: "link",
                  href: __props.item.link,
                  rel: __props.item.rel,
                  target: __props.item.target
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(textTag.value), {
                      class: "text",
                      innerHTML: __props.item.text
                    }, null, 8, ["innerHTML"]))
                  ]),
                  _: 1
                }, 8, ["tag", "href", "rel", "target"])) : (openBlock(), createBlock(resolveDynamicComponent(textTag.value), {
                  key: 1,
                  class: "text",
                  innerHTML: __props.item.text
                }, null, 8, ["innerHTML"])),
                __props.item.collapsed != null && __props.item.items && __props.item.items.length ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "caret",
                  role: "button",
                  "aria-label": "toggle section",
                  onClick: onCaretClick,
                  onKeydown: withKeys(onCaretClick, ["enter"]),
                  tabindex: "0"
                }, [
                  createVNode("span", { class: "vpi-chevron-right caret-icon" })
                ], 32)) : createCommentVNode("", true)
              ], 16, ["role", "tabindex"])) : createCommentVNode("", true),
              __props.item.items && __props.item.items.length ? (openBlock(), createBlock("div", {
                key: 1,
                class: "items"
              }, [
                __props.depth < 5 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(__props.item.items, (i) => {
                  return openBlock(), createBlock(_component_VPSidebarItem, {
                    key: i.text,
                    item: i,
                    depth: __props.depth + 1
                  }, null, 8, ["item", "depth"]);
                }), 128)) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }), _parent);
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSidebarItem.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const VPSidebarItem = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-d81de50c"]]);
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "VPSidebarGroup",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    const disableTransition = ref(true);
    let timer = null;
    onMounted(() => {
      timer = setTimeout(() => {
        timer = null;
        disableTransition.value = false;
      }, 300);
    });
    onBeforeUnmount(() => {
      if (timer != null) {
        clearTimeout(timer);
        timer = null;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<div class="${ssrRenderClass([{ "no-transition": disableTransition.value }, "group"])}" data-v-8d50c081>`);
        _push(ssrRenderComponent(VPSidebarItem, {
          item,
          depth: 0
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSidebarGroup.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const VPSidebarGroup = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-8d50c081"]]);
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "VPSidebar",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean }
  },
  setup(__props) {
    const { sidebarGroups, hasSidebar } = useLayout();
    const props = __props;
    const navEl = ref(null);
    const isLocked = useScrollLock(inBrowser ? document.body : null);
    watch(
      [props, navEl],
      () => {
        if (props.open) {
          isLocked.value = true;
          navEl.value?.focus();
        } else isLocked.value = false;
      },
      { immediate: true, flush: "post" }
    );
    const key = ref(0);
    watch(
      sidebarGroups,
      () => {
        key.value += 1;
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(hasSidebar)) {
        _push(`<aside${ssrRenderAttrs(mergeProps({
          class: ["VPSidebar", { open: __props.open }],
          ref_key: "navEl",
          ref: navEl
        }, _attrs))} data-v-af661f50><div class="curtain" data-v-af661f50></div><nav class="nav" id="VPSidebarNav" aria-labelledby="sidebar-aria-label" tabindex="-1" data-v-af661f50><span class="visually-hidden" id="sidebar-aria-label" data-v-af661f50> Sidebar Navigation </span>`);
        ssrRenderSlot(_ctx.$slots, "sidebar-nav-before", {}, null, _push, _parent);
        _push(ssrRenderComponent(VPSidebarGroup, {
          items: unref(sidebarGroups),
          key: key.value
        }, null, _parent));
        ssrRenderSlot(_ctx.$slots, "sidebar-nav-after", {}, null, _push, _parent);
        _push(`</nav></aside>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSidebar.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const VPSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-af661f50"]]);
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "VPSkipLink",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    const route = useRoute();
    const backToTop = ref();
    watch(() => route.path, () => backToTop.value.focus());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><span tabindex="-1" data-v-331ec75c></span><a href="#VPContent" class="VPSkipLink visually-hidden" data-v-331ec75c>${ssrInterpolate(unref(theme2).skipToContentLabel || "Skip to content")}</a><!--]-->`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSkipLink.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const VPSkipLink = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-331ec75c"]]);
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      isOpen: isSidebarOpen,
      open: openSidebar,
      close: closeSidebar
    } = useSidebarControl();
    registerWatchers({ closeSidebar });
    const { frontmatter } = useData();
    const slots = useSlots();
    const heroImageSlotExists = computed(() => !!slots["home-hero-image"]);
    provide(layoutInfoInjectionKey, { heroImageSlotExists });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Content = resolveComponent("Content");
      if (unref(frontmatter).layout !== false) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ["Layout", unref(frontmatter).pageClass]
        }, _attrs))} data-v-1df9f90f>`);
        ssrRenderSlot(_ctx.$slots, "layout-top", {}, null, _push, _parent);
        _push(ssrRenderComponent(VPSkipLink, null, null, _parent));
        _push(ssrRenderComponent(VPBackdrop, {
          class: "backdrop",
          show: unref(isSidebarOpen),
          onClick: unref(closeSidebar)
        }, null, _parent));
        _push(ssrRenderComponent(VPNav, null, {
          "nav-bar-title-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-title-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-content-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-content-before", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-content-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-content-after", {}, void 0, true)
              ];
            }
          }),
          "nav-screen-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-screen-content-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-screen-content-before", {}, void 0, true)
              ];
            }
          }),
          "nav-screen-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-screen-content-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-screen-content-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(ssrRenderComponent(VPLocalNav, {
          open: unref(isSidebarOpen),
          onOpenMenu: unref(openSidebar)
        }, null, _parent));
        _push(ssrRenderComponent(VPSidebar, { open: unref(isSidebarOpen) }, {
          "sidebar-nav-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "sidebar-nav-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "sidebar-nav-before", {}, void 0, true)
              ];
            }
          }),
          "sidebar-nav-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "sidebar-nav-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "sidebar-nav-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(ssrRenderComponent(VPContent, null, {
          "page-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "page-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "page-top", {}, void 0, true)
              ];
            }
          }),
          "page-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "page-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "page-bottom", {}, void 0, true)
              ];
            }
          }),
          "not-found": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "not-found", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "not-found", {}, void 0, true)
              ];
            }
          }),
          "home-hero-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-before", {}, void 0, true)
              ];
            }
          }),
          "home-hero-info-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info-before", {}, void 0, true)
              ];
            }
          }),
          "home-hero-info": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info", {}, void 0, true)
              ];
            }
          }),
          "home-hero-info-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info-after", {}, void 0, true)
              ];
            }
          }),
          "home-hero-actions-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-actions-after", {}, void 0, true)
              ];
            }
          }),
          "home-hero-image": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-image", {}, void 0, true)
              ];
            }
          }),
          "home-hero-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-after", {}, void 0, true)
              ];
            }
          }),
          "home-features-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-features-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-features-before", {}, void 0, true)
              ];
            }
          }),
          "home-features-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-features-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-features-after", {}, void 0, true)
              ];
            }
          }),
          "doc-footer-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)
              ];
            }
          }),
          "doc-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-before", {}, void 0, true)
              ];
            }
          }),
          "doc-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-after", {}, void 0, true)
              ];
            }
          }),
          "doc-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-top", {}, void 0, true)
              ];
            }
          }),
          "doc-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-bottom", {}, void 0, true)
              ];
            }
          }),
          "aside-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)
              ];
            }
          }),
          "aside-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(ssrRenderComponent(VPFooter, null, null, _parent));
        ssrRenderSlot(_ctx.$slots, "layout-bottom", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(_component_Content, _attrs, null, _parent));
      }
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/Layout.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const Layout$1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-1df9f90f"]]);
const GridSettings = {
  xmini: [[0, 2]],
  mini: [],
  small: [
    [920, 6],
    [768, 5],
    [640, 4],
    [480, 3],
    [0, 2]
  ],
  medium: [
    [960, 5],
    [832, 4],
    [640, 3],
    [480, 2]
  ],
  big: [
    [832, 3],
    [640, 2]
  ]
};
function useSponsorsGrid({ el, size = "medium" }) {
  const onResize = throttleAndDebounce(manage, 100);
  onMounted(() => {
    manage();
    window.addEventListener("resize", onResize);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });
  function manage() {
    adjustSlots(el.value, size);
  }
}
function adjustSlots(el, size) {
  const tsize = el.children.length;
  const asize = el.querySelectorAll(".vp-sponsor-grid-item:not(.empty)").length;
  const grid = setGrid(el, size, asize);
  manageSlots(el, grid, tsize, asize);
}
function setGrid(el, size, items) {
  const settings = GridSettings[size];
  const screen = window.innerWidth;
  let grid = 1;
  settings.some(([breakpoint, value]) => {
    if (screen >= breakpoint) {
      grid = items < value ? items : value;
      return true;
    }
  });
  setGridData(el, grid);
  return grid;
}
function setGridData(el, value) {
  el.dataset.vpGrid = String(value);
}
function manageSlots(el, grid, tsize, asize) {
  const diff = tsize - asize;
  const rem = asize % grid;
  const drem = rem === 0 ? rem : grid - rem;
  neutralizeSlots(el, drem - diff);
}
function neutralizeSlots(el, count) {
  if (count === 0) {
    return;
  }
  count > 0 ? addSlots(el, count) : removeSlots(el, count * -1);
}
function addSlots(el, count) {
  for (let i = 0; i < count; i++) {
    const slot = document.createElement("div");
    slot.classList.add("vp-sponsor-grid-item", "empty");
    el.append(slot);
  }
}
function removeSlots(el, count) {
  for (let i = 0; i < count; i++) {
    el.removeChild(el.lastElementChild);
  }
}
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "VPSponsorsGrid",
  __ssrInlineRender: true,
  props: {
    size: { default: "medium" },
    data: {}
  },
  setup(__props) {
    const props = __props;
    const el = ref(null);
    useSponsorsGrid({ el, size: props.size });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPSponsorsGrid vp-sponsor-grid", [__props.size]],
        ref_key: "el",
        ref: el
      }, _attrs))}><!--[-->`);
      ssrRenderList(__props.data, (sponsor) => {
        _push(`<div class="vp-sponsor-grid-item"><a class="vp-sponsor-grid-link"${ssrRenderAttr("href", sponsor.url)} target="_blank" rel="sponsored noopener"><article class="vp-sponsor-grid-box"><img class="vp-sponsor-grid-image"${ssrRenderAttr("src", sponsor.img)}${ssrRenderAttr("alt", sponsor.name)}></article></a></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSponsorsGrid.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "VPSponsors",
  __ssrInlineRender: true,
  props: {
    mode: { default: "normal" },
    tier: {},
    size: {},
    data: {}
  },
  setup(__props) {
    const props = __props;
    const sponsors = computed(() => {
      const isSponsors = props.data.some((s) => {
        return "items" in s;
      });
      if (isSponsors) {
        return props.data;
      }
      return [
        { tier: props.tier, size: props.size, items: props.data }
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPSponsors vp-sponsor", [__props.mode]]
      }, _attrs))}><!--[-->`);
      ssrRenderList(sponsors.value, (sponsor, index) => {
        _push(`<section class="vp-sponsor-section">`);
        if (sponsor.tier) {
          _push(`<h3 class="vp-sponsor-tier">${ssrInterpolate(sponsor.tier)}</h3>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_sfc_main$b, {
          size: sponsor.size,
          data: sponsor.items
        }, null, _parent));
        _push(`</section>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSponsors.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "VPDocAsideSponsors",
  __ssrInlineRender: true,
  props: {
    tier: {},
    size: {},
    data: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPDocAsideSponsors" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$a, {
        mode: "aside",
        tier: __props.tier,
        size: __props.size,
        data: __props.data
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAsideSponsors.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "VPHomeSponsors",
  __ssrInlineRender: true,
  props: {
    message: {},
    actionText: { default: "Become a sponsor" },
    actionLink: {},
    data: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "VPHomeSponsors" }, _attrs))} data-v-0eeda4b8><div class="container" data-v-0eeda4b8><div class="header" data-v-0eeda4b8><div class="love" data-v-0eeda4b8><span class="vpi-heart icon" data-v-0eeda4b8></span></div>`);
      if (__props.message) {
        _push(`<h2 class="message" data-v-0eeda4b8>${ssrInterpolate(__props.message)}</h2>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="sponsors" data-v-0eeda4b8>`);
      _push(ssrRenderComponent(_sfc_main$a, { data: __props.data }, null, _parent));
      _push(`</div>`);
      if (__props.actionLink) {
        _push(`<div class="action" data-v-0eeda4b8>`);
        _push(ssrRenderComponent(VPButton, {
          theme: "sponsor",
          text: __props.actionText,
          href: __props.actionLink
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHomeSponsors.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "VPTeamMembersItem",
  __ssrInlineRender: true,
  props: {
    size: { default: "medium" },
    member: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({
        class: ["VPTeamMembersItem", [__props.size]]
      }, _attrs))} data-v-962fd8c0><div class="profile" data-v-962fd8c0><figure class="avatar" data-v-962fd8c0><img class="avatar-img"${ssrRenderAttr("src", __props.member.avatar)}${ssrRenderAttr("alt", __props.member.name)} data-v-962fd8c0></figure><div class="data" data-v-962fd8c0><h1 class="name" data-v-962fd8c0>${ssrInterpolate(__props.member.name)}</h1>`);
      if (__props.member.title || __props.member.org) {
        _push(`<p class="affiliation" data-v-962fd8c0>`);
        if (__props.member.title) {
          _push(`<span class="title" data-v-962fd8c0>${ssrInterpolate(__props.member.title)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.member.title && __props.member.org) {
          _push(`<span class="at" data-v-962fd8c0> @ </span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.member.org) {
          _push(ssrRenderComponent(_sfc_main$11, {
            class: ["org", { link: __props.member.orgLink }],
            href: __props.member.orgLink,
            "no-icon": ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(__props.member.org)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(__props.member.org), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.member.desc) {
        _push(`<p class="desc" data-v-962fd8c0>${__props.member.desc ?? ""}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.member.links) {
        _push(`<div class="links" data-v-962fd8c0>`);
        _push(ssrRenderComponent(VPSocialLinks, {
          links: __props.member.links,
          me: false
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (__props.member.sponsor) {
        _push(`<div class="sp" data-v-962fd8c0>`);
        _push(ssrRenderComponent(_sfc_main$11, {
          class: "sp-link",
          href: __props.member.sponsor,
          "no-icon": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="vpi-heart sp-icon" data-v-962fd8c0${_scopeId}></span> ${ssrInterpolate(__props.member.actionText || "Sponsor")}`);
            } else {
              return [
                createVNode("span", { class: "vpi-heart sp-icon" }),
                createTextVNode(" " + toDisplayString(__props.member.actionText || "Sponsor"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</article>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamMembersItem.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const VPTeamMembersItem = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-962fd8c0"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "VPTeamMembers",
  __ssrInlineRender: true,
  props: {
    size: { default: "medium" },
    members: {}
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => [props.size, `count-${props.members.length}`]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPTeamMembers", classes.value]
      }, _attrs))} data-v-0e8561f6><div class="container" data-v-0e8561f6><!--[-->`);
      ssrRenderList(__props.members, (member) => {
        _push(`<div class="item" data-v-0e8561f6>`);
        _push(ssrRenderComponent(VPTeamMembersItem, {
          size: __props.size,
          member
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamMembers.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamPage.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamPageSection.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamPageTitle.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const theme = {
  Layout: Layout$1,
  enhanceApp: ({ app }) => {
    app.component("Badge", _sfc_main$18);
  }
};
const _sfc_main$2 = {
  __name: "HeroParticles",
  __ssrInlineRender: true,
  setup(__props) {
    const canvasRef = ref(null);
    let animationId = null;
    let particles = [];
    let resizeObserver = null;
    let resizeHandler = null;
    let themeObserver = null;
    const fallbackTheme = {
      palette: [
        { r: 0, g: 120, b: 179 },
        { r: 0, g: 154, b: 218 },
        { r: 56, g: 110, b: 194 },
        { r: 74, g: 89, b: 201 }
      ],
      ember: { r: 12, g: 99, b: 168 },
      emberGlow: { r: 0, g: 169, b: 214 }
    };
    let particleTheme = { ...fallbackTheme };
    function parseCssColor(value, fallback) {
      const normalizedValue = value.trim();
      if (!normalizedValue) {
        return fallback;
      }
      const hexMatch = normalizedValue.match(/^#([\da-f]{3}|[\da-f]{6})$/i);
      if (hexMatch) {
        const hex = hexMatch[1];
        const segments = hex.length === 3 ? hex.split("").map((char) => `${char}${char}`) : hex.match(/.{2}/g);
        return {
          r: Number.parseInt(segments[0], 16),
          g: Number.parseInt(segments[1], 16),
          b: Number.parseInt(segments[2], 16)
        };
      }
      const rgbMatch = normalizedValue.match(/^rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
      if (rgbMatch) {
        return {
          r: Number.parseInt(rgbMatch[1], 10),
          g: Number.parseInt(rgbMatch[2], 10),
          b: Number.parseInt(rgbMatch[3], 10)
        };
      }
      return fallback;
    }
    function readParticleTheme() {
      const rootStyles = getComputedStyle(document.documentElement);
      return {
        palette: [
          parseCssColor(rootStyles.getPropertyValue("--phenix-particle-1"), fallbackTheme.palette[0]),
          parseCssColor(rootStyles.getPropertyValue("--phenix-particle-2"), fallbackTheme.palette[1]),
          parseCssColor(rootStyles.getPropertyValue("--phenix-particle-3"), fallbackTheme.palette[2]),
          parseCssColor(rootStyles.getPropertyValue("--phenix-particle-accent"), fallbackTheme.palette[3])
        ],
        ember: parseCssColor(rootStyles.getPropertyValue("--phenix-ember"), fallbackTheme.ember),
        emberGlow: parseCssColor(rootStyles.getPropertyValue("--phenix-ember-glow"), fallbackTheme.emberGlow)
      };
    }
    function pickParticleColor() {
      const colorVariation = Math.random();
      if (colorVariation < 0.4) {
        return particleTheme.palette[0];
      }
      if (colorVariation < 0.7) {
        return particleTheme.palette[1];
      }
      if (colorVariation < 0.9) {
        return particleTheme.palette[2];
      }
      return particleTheme.palette[3];
    }
    function refreshThemeColors() {
      particleTheme = readParticleTheme();
      particles.forEach((particle) => {
        if (typeof particle.applyTheme === "function") {
          particle.applyTheme();
        }
      });
    }
    class Particle {
      constructor(canvas) {
        this.canvas = canvas;
        this.reset();
      }
      reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = this.canvas.height + Math.random() * 100;
        this.size = Math.random() * 4 + 1;
        this.speedY = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.life = 0;
        this.maxLife = Math.random() * 100 + 100;
        this.applyTheme();
      }
      applyTheme() {
        this.color = pickParticleColor();
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.life * 0.05) * 0.5;
        this.life++;
        const lifeRatio = this.life / this.maxLife;
        this.opacity = (1 - lifeRatio) * 0.6;
        this.size = (1 - lifeRatio * 0.5) * (Math.random() * 3 + 2);
        if (Math.random() < 0.1) {
          this.opacity *= Math.random() * 0.5 + 0.5;
        }
        if (this.y < -10 || this.life > this.maxLife) {
          this.reset();
        }
      }
      draw(ctx) {
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 2
        );
        const { r, g, b } = this.color;
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity})`);
        gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }
    class Ember {
      constructor(canvas) {
        this.canvas = canvas;
        this.reset();
      }
      applyTheme() {
      }
      reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = this.canvas.height + 50;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.life = 0;
        this.maxLife = Math.random() * 80 + 40;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.life * 0.1) * 0.8;
        this.life++;
        const lifeRatio = this.life / this.maxLife;
        this.opacity = (1 - lifeRatio) * 0.8;
        if (Math.random() < 0.15) {
          this.opacity = Math.random() * 0.5 + 0.3;
        }
        if (this.y < -10 || this.life > this.maxLife) {
          this.reset();
        }
      }
      draw(ctx) {
        const { ember, emberGlow } = particleTheme;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ember.r}, ${ember.g}, ${ember.b}, ${this.opacity})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${emberGlow.r}, ${emberGlow.g}, ${emberGlow.b}, ${this.opacity * 0.3})`;
        ctx.fill();
      }
    }
    function initParticles(canvas) {
      particles = [];
      const particleCount = Math.min(60, Math.floor(canvas.width / 20));
      const emberCount = Math.min(30, Math.floor(canvas.width / 30));
      for (let i = 0; i < particleCount; i++) {
        const particle = new Particle(canvas);
        particle.y = Math.random() * canvas.height;
        particles.push(particle);
      }
      for (let i = 0; i < emberCount; i++) {
        const ember = new Ember(canvas);
        ember.y = Math.random() * canvas.height;
        particles.push(ember);
      }
    }
    function animate(canvas, ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });
      animationId = requestAnimationFrame(() => animate(canvas, ctx));
    }
    function handleResize(canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas);
    }
    onMounted(() => {
      const canvas = canvasRef.value;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      refreshThemeColors();
      handleResize(canvas);
      animate(canvas, ctx);
      resizeObserver = new ResizeObserver(() => handleResize(canvas));
      resizeObserver.observe(document.documentElement);
      themeObserver = new MutationObserver((mutations) => {
        const hasThemeChange = mutations.some((mutation) => mutation.attributeName === "class");
        if (hasThemeChange) {
          refreshThemeColors();
        }
      });
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"]
      });
      resizeHandler = () => handleResize(canvas);
      window.addEventListener("resize", resizeHandler);
    });
    onUnmounted(() => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (themeObserver) {
        themeObserver.disconnect();
      }
      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "particles-wrapper" }, _attrs))} data-v-badfeb47><canvas class="particles-canvas" data-v-badfeb47></canvas></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/HeroParticles.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const HeroParticles = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-badfeb47"]]);
const _sfc_main$1 = {
  __name: "PhoenixLogo",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoaded = ref(false);
    onMounted(() => {
      isLoaded.value = true;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["phoenix-container", { loaded: isLoaded.value }]
      }, _attrs))} data-v-53d7d9b2><div class="glow-layer glow-1" data-v-53d7d9b2></div><div class="glow-layer glow-2" data-v-53d7d9b2></div><div class="glow-layer glow-3" data-v-53d7d9b2></div><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1023 758" width="100%" height="100%" data-v-53d7d9b2><path d="M0 0 C2.2597071 2.07995768 3.67313259 3.98569289 5 6.75 C5.309375 7.38421875 5.61875 8.0184375 5.9375 8.671875 C7.34619657 11.75857777 8.67154723 14.87796867 10 18 C10.69029297 19.57974609 10.69029297 19.57974609 11.39453125 21.19140625 C16.01571598 32.1778592 19.31506787 43.39286147 22 55 C22.21462891 55.91958496 22.42925781 56.83916992 22.65039062 57.78662109 C29.07407575 86.89203252 29.4921119 122.07195742 22 151 C21.79681152 151.78987305 21.59362305 152.57974609 21.38427734 153.39355469 C20.07889759 158.3181638 18.56691795 163.15313484 17 168 C16.50693359 169.73636719 16.50693359 169.73636719 16.00390625 171.5078125 C14.11856608 178.12606055 11.69338747 184.06815622 8.46484375 190.1484375 C7.13197303 192.74309249 5.9913138 195.37214786 4.85961914 198.05859375 C0.05375949 208.91238414 -5.7446316 219.60169579 -13 229 C-13.82603998 230.09075287 -14.65152025 231.18192975 -15.4765625 232.2734375 C-19.53660546 237.6145765 -23.68035613 242.86561903 -28 248 C-27.09121094 247.27296875 -27.09121094 247.27296875 -26.1640625 246.53125 C-24.90722656 245.52578125 -24.90722656 245.52578125 -23.625 244.5 C-22.70976563 243.76652344 -21.79453125 243.03304687 -20.8515625 242.27734375 C-19.05982486 240.84640808 -17.2635893 239.4210679 -15.4609375 238.00390625 C20.97625874 209.259007 48.51125861 170.81857606 64 127 C64.53884245 125.56143897 65.08019187 124.12381234 65.625 122.6875 C66.305625 120.8621875 66.305625 120.8621875 67 119 C67.56221606 117.49989355 68.12471315 115.9998924 68.6875 114.5 C69.3371875 112.7675 69.3371875 112.7675 70 111 C72.33543736 114.50315604 72.88022782 117.6860505 73.5625 121.75 C73.75646362 122.89227051 73.75646362 122.89227051 73.9543457 124.05761719 C75.13963861 131.35289407 75.77565696 138.61233146 76 146 C76.02723145 146.74636719 76.05446289 147.49273437 76.08251953 148.26171875 C77.21313006 183.13287615 70.65708418 216.10192441 54.9375 247.13671875 C53.81592039 249.355706 52.73331588 251.57543448 51.6875 253.83203125 C48.38176818 260.93705902 43.83537108 266.86153739 39 273 C38.38382813 273.81082031 37.76765625 274.62164062 37.1328125 275.45703125 C18.88256987 299.07268856 -5.00168571 319.06417708 -32 332 C-16.8924728 329.65199986 -3.17688162 325.68750299 11 320 C12.3307959 319.47962158 12.3307959 319.47962158 13.68847656 318.94873047 C42.27640293 307.71588738 67.80197605 290.20745366 89 268 C90.22968404 271.68905212 89.66985229 272.34151774 88.04296875 275.76171875 C87.59493896 276.70797119 87.14690918 277.65422363 86.68530273 278.62915039 C86.19102783 279.63840576 85.69675293 280.64766113 85.1875 281.6875 C84.68484619 282.72318115 84.18219238 283.7588623 83.66430664 284.82592773 C79.32766876 293.61291341 74.50708908 301.90288895 69 310 C68.39937744 310.89356201 68.39937744 310.89356201 67.78662109 311.80517578 C54.49389895 331.45784714 38.22684785 349.05519452 19 363 C18.15695312 363.6175415 18.15695312 363.6175415 17.296875 364.24755859 C0.42951984 376.45801495 -18.66208505 385.44822736 -38 393 C-39.06734375 393.41894531 -40.1346875 393.83789062 -41.234375 394.26953125 C-47.38304093 396.58830781 -53.63536002 398.37498554 -60 400 C-57.97933022 402.02066978 -53.88219274 401.21136832 -51.109375 401.23828125 C-49.89766129 401.25304001 -49.89766129 401.25304001 -48.66146851 401.26809692 C-24.53207393 401.50098998 -4.19426934 400.09071195 18 390 C18.99 389.67 19.98 389.34 21 389 C14.01345666 406.14878819 -13.10294833 418.77822163 -29 426 C-29.8763208 426.40130127 -30.7526416 426.80260254 -31.65551758 427.21606445 C-39.40773233 430.61842179 -47.1927229 432.81431558 -55.4375 434.6875 C-56.42118561 434.91303558 -56.42118561 434.91303558 -57.42474365 435.14312744 C-78.15029816 439.86069607 -98.8048001 440.4309703 -120 441 C-117.02508237 442.44641139 -114.04433874 443.8804181 -111.0625 445.3125 C-109.81629883 445.91868164 -109.81629883 445.91868164 -108.54492188 446.53710938 C-99.41824798 450.9051284 -90.97836722 453.40880919 -80.9375 454.6875 C-79.97650391 454.81705078 -79.01550781 454.94660156 -78.02539062 455.08007812 C-75.68451226 455.39452447 -73.34289368 455.70100947 -71 456 C-74.12783753 459.4883503 -77.64696263 460.2942162 -82.0625 461.4375 C-82.85382324 461.64922852 -83.64514648 461.86095703 -84.46044922 462.07910156 C-90.15607709 463.57919388 -95.87979895 464.9535942 -101.625 466.25 C-102.3456665 466.41298584 -103.06633301 466.57597168 -103.80883789 466.74389648 C-104.50356201 466.89544189 -105.19828613 467.0469873 -105.9140625 467.203125 C-106.5117041 467.33364258 -107.1093457 467.46416016 -107.72509766 467.59863281 C-113.821909 468.67430977 -119.80157606 469.16342849 -125.98828125 469.203125 C-126.7248848 469.21018463 -127.46148834 469.21724426 -128.22041321 469.22451782 C-150.02676471 469.3860708 -170.64295246 468.8129721 -191 460 C-191.66 459.01 -192.32 458.02 -193 457 C-194.2600631 473.33415135 -190.19943021 488.62449177 -186.42138672 504.41894531 C-178.48709784 537.8875072 -185.68850903 572.9618263 -203.5 601.875 C-215.74905723 620.41561844 -232.49377986 635.10107428 -253 644 C-253.66 643.67 -254.32 643.34 -255 643 C-254.030625 642.2575 -253.06125 641.515 -252.0625 640.75 C-237.07917989 627.79883059 -229.27283984 607.31913861 -227 588 C-226.86793082 584.97561573 -226.90068344 582.02915523 -227 579 C-227.54914063 580.07314453 -227.54914063 580.07314453 -228.109375 581.16796875 C-232.92709756 590.03487241 -238.87939638 596.91891413 -246 604 C-246.69480469 604.69480469 -247.38960937 605.38960937 -248.10546875 606.10546875 C-257.1582621 614.58003977 -267.75245927 621.67618699 -277.921875 628.73828125 C-285.88779659 634.27658634 -293.01875935 640.26264548 -300 647 C-300.75152344 647.69996094 -301.50304687 648.39992188 -302.27734375 649.12109375 C-314.50839205 660.78871564 -326.16804906 678.62466172 -327.16796875 695.90234375 C-327.20352098 701.42716067 -326.95848855 705.77736386 -325 711 C-325.44140625 713.15625 -325.44140625 713.15625 -326 715 C-342.91189624 699.04138393 -355.2594542 680.80953095 -356.30859375 657.09375 C-357.00370451 632.14154053 -349.48590321 609.60618305 -332.578125 590.78515625 C-330.74161042 588.70771278 -329.03099738 586.55106477 -327.3125 584.375 C-324.06132628 580.27977156 -320.70917018 576.28649013 -317.3125 572.3125 C-313.64457224 568.01594547 -310.16034588 563.6860301 -307 559 C-307.4640625 559.38929688 -307.928125 559.77859375 -308.40625 560.1796875 C-313.33937042 564.17404247 -318.462423 567.58429069 -323.875 570.875 C-330.76767765 575.08433623 -336.88897251 579.70443116 -343 585 C-343.98742187 585.78761719 -344.97484375 586.57523438 -345.9921875 587.38671875 C-357.424664 597.31961067 -363.65410742 610.75512987 -368 625 C-368.33 625 -368.66 625 -369 625 C-374.2492685 596.12902327 -359.02154978 570.33905138 -346.02856445 545.72241211 C-334.49088759 523.80253681 -325.5167586 498.74130495 -332.5625 473.75 C-335.64655939 465.48209611 -340.34750553 457.8461315 -347 452 C-346.525625 453.175625 -346.05125 454.35125 -345.5625 455.5625 C-340.26555615 469.92921092 -342.47547018 486.19063695 -348.28515625 500.0703125 C-357.287312 517.67341373 -373.47255737 531.17714777 -392 538 C-392.66 537.67 -393.32 537.34 -394 537 C-392.9790625 536.319375 -392.9790625 536.319375 -391.9375 535.625 C-380.43240806 525.34385401 -373.21401346 508.21818442 -372 493 C-371.52585351 482.31807917 -371.43445316 471.59269196 -373 461 C-374.10214844 461.32613281 -375.20429688 461.65226562 -376.33984375 461.98828125 C-377.87226406 462.43014477 -379.40482406 462.87152399 -380.9375 463.3125 C-381.65357422 463.52583984 -382.36964844 463.73917969 -383.10742188 463.95898438 C-397.02117915 467.92588538 -410.58716394 469.50169685 -425.01123047 469.39111328 C-427.49892963 469.37500693 -429.98500515 469.39108442 -432.47265625 469.41015625 C-443.28886295 469.42429404 -453.42783385 468.24108485 -464 466 C-464.89847656 465.82259277 -465.79695312 465.64518555 -466.72265625 465.46240234 C-472.10518371 464.35430376 -477.29213025 462.74170478 -482.5 461 C-483.30953125 460.73960937 -484.1190625 460.47921875 -484.953125 460.2109375 C-486.98980697 459.53432168 -488.99822065 458.77379706 -491 458 C-491.33 457.34 -491.66 456.68 -492 456 C-491.1478894 455.90295776 -491.1478894 455.90295776 -490.27856445 455.80395508 C-478.88658456 454.46243516 -468.48518226 452.89828217 -458 448 C-456.62650993 447.37324224 -455.25279923 446.74696781 -453.87890625 446.12109375 C-450.23578826 444.44820766 -446.61411871 442.73457703 -443 441 C-443.84481934 440.98018066 -444.68963867 440.96036133 -445.56005859 440.93994141 C-496.91861138 439.67502127 -545.34654263 431.17840756 -582.5234375 392.58203125 C-583.01070312 392.05996094 -583.49796875 391.53789062 -584 391 C-583.67 390.34 -583.34 389.68 -583 389 C-582.26523437 389.43699219 -582.26523437 389.43699219 -581.515625 389.8828125 C-575.71422572 393.06357969 -569.7334995 395.23227336 -563.4375 397.1875 C-562.66631836 397.43709473 -561.89513672 397.68668945 -561.10058594 397.94384766 C-546.73268306 402.24841331 -531.79641018 402.28527724 -516.9375 402.125 C-515.28060449 402.11492966 -513.62370292 402.10581112 -511.96679688 402.09765625 C-507.97770964 402.07601061 -503.98892574 402.04171509 -500 402 C-500.33 401.34 -500.66 400.68 -501 400 C-503.45962361 399.3561035 -505.88604677 398.81551607 -508.375 398.3125 C-541.49397682 391.00860163 -572.81560364 373.28139198 -597.51171875 350.30078125 C-599.67179288 348.30347565 -601.87547945 346.39456662 -604.125 344.5 C-608.84703235 340.3850861 -612.92632716 335.7465886 -617 331 C-617.61230469 330.29875 -618.22460938 329.5975 -618.85546875 328.875 C-632.11758422 313.03963824 -647.93010406 291.41912217 -653 271 C-652.67 270.34 -652.34 269.68 -652 269 C-651.47792969 269.54527344 -650.95585938 270.09054687 -650.41796875 270.65234375 C-644.62281679 276.5895835 -638.50629344 281.86116047 -632 287 C-631.04738281 287.78117187 -630.09476563 288.56234375 -629.11328125 289.3671875 C-604.81072478 308.84657335 -575.20625254 322.71102331 -545 330 C-543.8231665 330.28472168 -543.8231665 330.28472168 -542.62255859 330.57519531 C-541.83316895 330.75920898 -541.0437793 330.94322266 -540.23046875 331.1328125 C-539.15962036 331.38248779 -539.15962036 331.38248779 -538.06713867 331.63720703 C-535.69315826 332.11524189 -535.69315826 332.11524189 -532 332 C-532.969375 331.47792969 -533.93875 330.95585937 -534.9375 330.41796875 C-553.1038913 320.49862954 -569.56590568 308.92430884 -584 294 C-584.81726563 293.18402344 -585.63453125 292.36804688 -586.4765625 291.52734375 C-606.9125114 271.05976026 -620.89254569 247.38760259 -630 220 C-630.38671875 218.89914063 -630.7734375 217.79828125 -631.171875 216.6640625 C-633.38243546 210.04938542 -634.84680182 203.33386181 -636.1875 196.5 C-636.35467529 195.65775879 -636.52185059 194.81551758 -636.6940918 193.94775391 C-639.02026298 181.47199811 -639.20323766 168.90045299 -639.1875 156.25 C-639.18756042 155.50120575 -639.18762085 154.7524115 -639.18768311 153.98092651 C-639.17528958 143.19581819 -638.85427456 132.64954984 -637 122 C-636.80921875 120.86304688 -636.6184375 119.72609375 -636.421875 118.5546875 C-635.97872838 116.02875176 -635.51021294 113.51307012 -635 111 C-634.34 111 -633.68 111 -633 111 C-632.76514893 111.70680908 -632.53029785 112.41361816 -632.28833008 113.1418457 C-619.91072247 150.00178574 -602.74355222 183.48287887 -576 212 C-574.78516182 213.39017565 -573.57626166 214.78557612 -572.375 216.1875 C-561.96830967 228.09468987 -549.52574919 237.46131342 -537 247 C-538.48893035 244.76660447 -539.98498507 242.71158703 -541.65234375 240.62109375 C-572.28406405 201.7530641 -590.21347449 154.02492648 -590.25 104.375 C-590.25067474 103.55153076 -590.25134949 102.72806152 -590.25204468 101.87963867 C-590.20828161 68.18125569 -583.89237006 31.25186906 -566 2 C-565.34 1.67 -564.68 1.34 -564 1 C-563.90295776 2.30928467 -563.90295776 2.30928467 -563.80395508 3.64501953 C-558.91257344 67.92575162 -542.05241433 127.72868333 -503 180 C-502.30261719 180.95390625 -501.60523438 181.9078125 -500.88671875 182.890625 C-495.242541 190.54986443 -489.23481476 197.82158861 -483 205 C-481.94232422 206.22783203 -481.94232422 206.22783203 -480.86328125 207.48046875 C-476.0864254 212.91243626 -471.03829537 218.0620546 -465.9375 223.1875 C-464.94617065 224.18583862 -464.94617065 224.18583862 -463.93481445 225.2043457 C-449.31580508 239.77624958 -432.61669605 252.65439275 -415.1875 263.6875 C-408.36805137 268.01927874 -402.05753762 272.6312203 -396 278 C-395.47954102 278.46019531 -394.95908203 278.92039062 -394.42285156 279.39453125 C-380.30544024 291.94702132 -368.91774685 305.67616568 -359.125 321.8125 C-358.76792969 322.39797607 -358.41085937 322.98345215 -358.04296875 323.58666992 C-355.29411105 328.22147739 -353.10785394 333.04478081 -351 338 C-350.90501221 337.38705078 -350.81002441 336.77410156 -350.7121582 336.14257812 C-345.94817247 305.90187108 -336.42317954 279.96056165 -317 256 C-317.76183594 255.87882813 -318.52367187 255.75765625 -319.30859375 255.6328125 C-324.08716021 254.85726488 -328.81032414 254.08412453 -333.5 252.875 C-341.86425555 250.95061512 -350.57765818 251.87702109 -359 253 C-333.62863275 227.39881964 -333.62863275 227.39881964 -319 223 C-318.28328125 222.77828125 -317.5665625 222.5565625 -316.828125 222.328125 C-315.22761318 221.8543735 -313.61510325 221.42133128 -312 221 C-312.87140625 220.92523438 -313.7428125 220.85046875 -314.640625 220.7734375 C-328.25866847 219.27014699 -338.24222473 214.69812068 -347 204 C-351.38674128 198.23281566 -353.975584 191.88078924 -356.4375 185.125 C-356.70908936 184.38701172 -356.98067871 183.64902344 -357.26049805 182.88867188 C-358.55167988 179.14840138 -359.20262357 176.77222056 -358 173 C-357.42894531 173.556875 -356.85789062 174.11375 -356.26953125 174.6875 C-339.80060153 190.18766915 -322.10720361 196.90615399 -300 198 C-300 197.34 -300 196.68 -300 196 C-300.804375 195.95875 -301.60875 195.9175 -302.4375 195.875 C-311.71933314 193.59525151 -319.16157497 186.25887822 -324.06005859 178.27148438 C-330.44203816 167.1225568 -335.39832381 155.02850805 -335 142 C-332.21092046 144.72675374 -329.52783382 147.49780859 -326.94140625 150.41796875 C-319.36018358 158.9256229 -311.71716896 166.02164275 -302 172 C-301.41669922 172.36174316 -300.83339844 172.72348633 -300.23242188 173.09619141 C-284.22688637 182.80756325 -267.22217133 186.34906194 -248.8984375 189.08203125 C-232.14073734 191.61678698 -214.69186246 196.16404348 -202 208 C-200.79537109 209.12148438 -200.79537109 209.12148438 -199.56640625 210.265625 C-193.45956127 216.16727999 -193.45956127 216.16727999 -191.56640625 219.59765625 C-189.64741909 222.5407413 -187.97230052 223.3373322 -184.8125 224.8125 C-176.3966641 229.1651347 -170.33732508 235.02504668 -167 244 C-166.08433107 246.9879723 -165.89161957 249.6301309 -165.9375 252.75 C-165.94652344 253.54921875 -165.95554687 254.3484375 -165.96484375 255.171875 C-165.98224609 256.07679688 -165.98224609 256.07679688 -166 257 C-166.81082031 256.60167969 -167.62164063 256.20335937 -168.45703125 255.79296875 C-178.85960718 250.81571763 -187.65008425 247.77317189 -199.1875 247.625 C-199.93604248 247.61098145 -200.68458496 247.59696289 -201.45581055 247.58251953 C-206.8569369 247.62901416 -211.07193882 248.85850456 -216 251 C-216.79148437 251.29261719 -217.58296875 251.58523438 -218.3984375 251.88671875 C-231.22080185 257.08155016 -239.40025423 266.63278157 -244.8125 279.125 C-245.56463975 281.07462542 -246.29646896 283.03231162 -247 285 C-247.37125 286.01320313 -247.37125 286.01320313 -247.75 287.046875 C-252.82303571 303.53424105 -246.30197888 321.38815282 -238.97509766 336.18115234 C-235.05186425 343.49915156 -229.49052418 349.8231603 -224 356 C-221.84795961 352.77193941 -221.04584861 350.08538568 -219.9375 346.375 C-213.27783079 325.5911448 -200.12259664 307.4737745 -185 292 C-184.16339844 291.10152344 -183.32679688 290.20304687 -182.46484375 289.27734375 C-171.4524544 277.73343636 -158.56255824 268.79795258 -145.03515625 260.45605469 C-136.97819699 255.45347548 -129.45028782 249.85859724 -122 244 C-121.00484375 243.21882812 -120.0096875 242.43765625 -118.984375 241.6328125 C-108.62063058 233.31220627 -99.0959319 224.18067987 -89.6875 214.8125 C-88.93460693 214.06427979 -88.18171387 213.31605957 -87.40600586 212.54516602 C-64.56513825 189.63859838 -45.72378817 162.03654895 -31.88378906 132.84863281 C-31.03516234 131.07354951 -30.15492896 129.31368177 -29.2734375 127.5546875 C-23.49729478 115.76502633 -19.21224164 103.41964013 -15 91 C-14.70174316 90.12150391 -14.40348633 89.24300781 -14.09619141 88.33789062 C-4.62779378 59.94947576 -0.96587611 29.80893504 0 0 Z " transform="translate(794,23)" style="${ssrRenderStyle({ "fill": "#1281C7" })}" data-v-53d7d9b2></path><path d="M0 0 C0.66 0 1.32 0 2 0 C2.35227661 1.06021362 2.35227661 1.06021362 2.71166992 2.1418457 C15.08927753 39.00178574 32.25644778 72.48287887 59 101 C60.21483818 102.39017565 61.42373834 103.78557612 62.625 105.1875 C70.37833773 114.05876085 79.08541001 121.43465743 88.39453125 128.62890625 C96.85209303 135.17480324 104.75453576 142.09850625 112.52490234 149.44091797 C136.22427948 171.79586148 162.56777982 190.14716479 191.5625 205 C208.60904447 213.75001928 224.0253665 224.07500975 239 236 C239.98226563 236.76828125 240.96453125 237.5365625 241.9765625 238.328125 C260.87875223 253.38296638 277.91222141 271.01838393 291.9296875 290.7109375 C296.35985892 296.73825226 301.39232128 300.83253991 307.54589844 304.9831543 C313.9090096 309.33804363 318.33874804 314.54866444 322.25 321.1875 C324.88129551 325.44658142 327.80002318 329.27664093 331.0625 333.0625 C344.16202289 348.5040588 349.42972111 365.21049239 349.375 385.25 C349.37478851 385.96009216 349.37457703 386.67018433 349.37435913 387.40179443 C349.33902039 399.30006481 348.31205565 410.53349206 345 422 C344.66097656 423.20527344 344.32195312 424.41054688 343.97265625 425.65234375 C338.83302854 441.61994159 330.86115357 455.24867192 319 467 C317.75697457 468.42553313 316.52603229 469.86177731 315.3125 471.3125 C310.78291318 476.53894634 305.55237339 480.90035402 300 485 C303.75222393 476.87018149 309.91137156 469.91033155 315.90234375 463.34765625 C319.75916779 459.03117348 323.36414618 454.50273563 327 450 C317.10881935 450 295.68423283 470.00207534 288.5859375 476.37109375 C277.93069117 487.203391 271.43318239 499.46901329 267 514 C266.67 514 266.34 514 266 514 C260.7507315 485.12902327 275.97845022 459.33905138 288.97143555 434.72241211 C300.50911241 412.80253681 309.4832414 387.74130495 302.4375 362.75 C299.35344061 354.48209611 294.65249447 346.8461315 288 341 C288.474375 342.175625 288.94875 343.35125 289.4375 344.5625 C294.73444385 358.92921092 292.52452982 375.19063695 286.71484375 389.0703125 C277.712688 406.67341373 261.52744263 420.17714777 243 427 C242.34 426.67 241.68 426.34 241 426 C242.0209375 425.319375 242.0209375 425.319375 243.0625 424.625 C254.56759194 414.34385401 261.78598654 397.21818442 263 382 C263.47414649 371.31807917 263.56554684 360.59269196 262 350 C260.89785156 350.32613281 259.79570312 350.65226562 258.66015625 350.98828125 C257.12773594 351.43014477 255.59517594 351.87152399 254.0625 352.3125 C253.34642578 352.52583984 252.63035156 352.73917969 251.89257812 352.95898438 C237.97882085 356.92588538 224.41283606 358.50169685 209.98876953 358.39111328 C207.50107037 358.37500693 205.01499485 358.39108442 202.52734375 358.41015625 C191.71113705 358.42429404 181.57216615 357.24108485 171 355 C170.10152344 354.82259277 169.20304688 354.64518555 168.27734375 354.46240234 C162.89481629 353.35430376 157.70786975 351.74170478 152.5 350 C151.69046875 349.73960937 150.8809375 349.47921875 150.046875 349.2109375 C148.01019303 348.53432168 146.00177935 347.77379706 144 347 C143.67 346.34 143.34 345.68 143 345 C143.8521106 344.90295776 143.8521106 344.90295776 144.72143555 344.80395508 C156.11341544 343.46243516 166.51481774 341.89828217 177 337 C178.37349007 336.37324224 179.74720077 335.74696781 181.12109375 335.12109375 C184.76421174 333.44820766 188.38588129 331.73457703 192 330 C191.15518066 329.98018066 190.31036133 329.96036133 189.43994141 329.93994141 C138.08138862 328.67502127 89.65345737 320.17840756 52.4765625 281.58203125 C51.98929687 281.05996094 51.50203125 280.53789062 51 280 C51.33 279.34 51.66 278.68 52 278 C52.73476562 278.43699219 52.73476562 278.43699219 53.484375 278.8828125 C59.28577428 282.06357969 65.2665005 284.23227336 71.5625 286.1875 C72.33368164 286.43709473 73.10486328 286.68668945 73.89941406 286.94384766 C88.26731694 291.24841331 103.20358982 291.28527724 118.0625 291.125 C119.71939551 291.11492966 121.37629708 291.10581112 123.03320312 291.09765625 C127.02229036 291.07601061 131.01107426 291.04171509 135 291 C134.67 290.34 134.34 289.68 134 289 C131.54037639 288.3561035 129.11395323 287.81551607 126.625 287.3125 C93.50602318 280.00860163 62.18439636 262.28139198 37.48828125 239.30078125 C35.32820712 237.30347565 33.12452055 235.39456662 30.875 233.5 C26.15296765 229.3850861 22.07367284 224.7465886 18 220 C17.38769531 219.29875 16.77539062 218.5975 16.14453125 217.875 C2.88241578 202.03963824 -12.93010406 180.41912217 -18 160 C-17.505 159.01 -17.505 159.01 -17 158 C-16.47792969 158.54527344 -15.95585937 159.09054687 -15.41796875 159.65234375 C-9.62281679 165.5895835 -3.50629344 170.86116047 3 176 C3.95261719 176.78117188 4.90523437 177.56234375 5.88671875 178.3671875 C30.18927522 197.84657335 59.79374746 211.71102331 90 219 C91.1768335 219.28472168 91.1768335 219.28472168 92.37744141 219.57519531 C93.16683105 219.75920898 93.9562207 219.94322266 94.76953125 220.1328125 C95.84037964 220.38248779 95.84037964 220.38248779 96.93286133 220.63720703 C99.30684174 221.11524189 99.30684174 221.11524189 103 221 C101.5459375 220.21689453 101.5459375 220.21689453 100.0625 219.41796875 C81.8961087 209.49862954 65.43409432 197.92430884 51 183 C50.18273437 182.18402344 49.36546875 181.36804688 48.5234375 180.52734375 C28.0874886 160.05976026 14.10745431 136.38760259 5 109 C4.61328125 107.89914063 4.2265625 106.79828125 3.828125 105.6640625 C1.61756454 99.04938542 0.15319818 92.33386181 -1.1875 85.5 C-1.35467529 84.65775879 -1.52185059 83.81551758 -1.6940918 82.94775391 C-4.02026298 70.47199811 -4.20323766 57.90045299 -4.1875 45.25 C-4.18756042 44.50120575 -4.18762085 43.7524115 -4.18768311 42.98092651 C-4.17528958 32.19581819 -3.85427456 21.64954984 -2 11 C-1.71382812 9.29457031 -1.71382812 9.29457031 -1.421875 7.5546875 C-0.97872838 5.02875176 -0.51021294 2.51307012 0 0 Z " transform="translate(159,134)" style="${ssrRenderStyle({ "fill": "#024494" })}" data-v-53d7d9b2></path><path d="M0 0 C2.33543736 3.50315604 2.88022782 6.6860505 3.5625 10.75 C3.69180908 11.51151367 3.82111816 12.27302734 3.9543457 13.05761719 C5.13963861 20.35289407 5.77565696 27.61233146 6 35 C6.02723145 35.74636719 6.05446289 36.49273437 6.08251953 37.26171875 C7.21313006 72.13287615 0.65708418 105.10192441 -15.0625 136.13671875 C-16.18407961 138.355706 -17.26668412 140.57543448 -18.3125 142.83203125 C-21.61823182 149.93705902 -26.16462892 155.86153739 -31 162 C-31.61617187 162.81082031 -32.23234375 163.62164062 -32.8671875 164.45703125 C-51.11743013 188.07268856 -75.00168571 208.06417708 -102 221 C-86.8924728 218.65199986 -73.17688162 214.68750299 -59 209 C-57.6692041 208.47962158 -57.6692041 208.47962158 -56.31152344 207.94873047 C-27.72359707 196.71588738 -2.19802395 179.20745366 19 157 C20.22968404 160.68905212 19.66985229 161.34151774 18.04296875 164.76171875 C17.59493896 165.70797119 17.14690918 166.65422363 16.68530273 167.62915039 C15.94389038 169.14303345 15.94389038 169.14303345 15.1875 170.6875 C14.68484619 171.72318115 14.18219238 172.7588623 13.66430664 173.82592773 C9.32766876 182.61291341 4.50708908 190.90288895 -1 199 C-1.40041504 199.59570801 -1.80083008 200.19141602 -2.21337891 200.80517578 C-15.50610105 220.45784714 -31.77315215 238.05519452 -51 252 C-51.56203125 252.41169434 -52.1240625 252.82338867 -52.703125 253.24755859 C-69.57048016 265.45801495 -88.66208505 274.44822736 -108 282 C-109.06734375 282.41894531 -110.1346875 282.83789062 -111.234375 283.26953125 C-117.38304093 285.58830781 -123.63536002 287.37498554 -130 289 C-127.97933022 291.02066978 -123.88219274 290.21136832 -121.109375 290.23828125 C-119.89766129 290.25304001 -119.89766129 290.25304001 -118.66146851 290.26809692 C-94.53207393 290.50098998 -74.19426934 289.09071195 -52 279 C-51.01 278.67 -50.02 278.34 -49 278 C-55.98654334 295.14878819 -83.10294833 307.77822163 -99 315 C-99.8763208 315.40130127 -100.7526416 315.80260254 -101.65551758 316.21606445 C-109.40773233 319.61842179 -117.1927229 321.81431558 -125.4375 323.6875 C-126.42118561 323.91303558 -126.42118561 323.91303558 -127.42474365 324.14312744 C-148.15029816 328.86069607 -168.8048001 329.4309703 -190 330 C-187.02508237 331.44641139 -184.04433874 332.8804181 -181.0625 334.3125 C-179.81629883 334.91868164 -179.81629883 334.91868164 -178.54492188 335.53710938 C-169.41824798 339.9051284 -160.97836722 342.40880919 -150.9375 343.6875 C-149.97650391 343.81705078 -149.01550781 343.94660156 -148.02539062 344.08007812 C-145.68451226 344.39452447 -143.34289368 344.70100947 -141 345 C-144.12783753 348.4883503 -147.64696263 349.2942162 -152.0625 350.4375 C-153.24948486 350.75509277 -153.24948486 350.75509277 -154.46044922 351.07910156 C-160.15607709 352.57919388 -165.87979895 353.9535942 -171.625 355.25 C-172.3456665 355.41298584 -173.06633301 355.57597168 -173.80883789 355.74389648 C-174.85092407 355.9712146 -174.85092407 355.9712146 -175.9140625 356.203125 C-176.5117041 356.33364258 -177.1093457 356.46416016 -177.72509766 356.59863281 C-183.821909 357.67430977 -189.80157606 358.16342849 -195.98828125 358.203125 C-197.09318657 358.21371445 -197.09318657 358.21371445 -198.22041321 358.22451782 C-220.02676471 358.3860708 -240.64295246 357.8129721 -261 349 C-261.66 348.01 -262.32 347.02 -263 346 C-264.2600631 362.33415135 -260.19943021 377.62449177 -256.42138672 393.41894531 C-248.74023321 425.81972698 -255.28903645 459.85486849 -271.89453125 488.23828125 C-274.94037141 493.14215027 -278.15755049 497.69179903 -282 502 C-282 498.4929269 -281.27879457 497.62033643 -279.375 494.75 C-267.04503577 474.72473895 -263.82719353 451.87316141 -268 429 C-268.15452637 428.36102783 -268.30905273 427.72205566 -268.46826172 427.0637207 C-269.7997513 421.30631944 -270.32751156 415.61173373 -270.7109375 409.73046875 C-270.7942482 408.45811874 -270.7942482 408.45811874 -270.87924194 407.1600647 C-271.10584683 403.61437678 -271.32498693 400.06845601 -271.52636719 396.52124023 C-272.32200753 382.77870717 -274.22069953 370.69868963 -280.625 358.3125 C-280.96200928 357.65805908 -281.29901855 357.00361816 -281.64624023 356.3293457 C-282.74739975 354.2101943 -283.86944217 352.10360614 -285 350 C-285.40589355 349.24428711 -285.81178711 348.48857422 -286.22998047 347.70996094 C-290.72189014 339.39828233 -295.36648081 331.25804718 -300.52734375 323.33984375 C-306 314.64456233 -306 314.64456233 -306 311 C-305.319375 310.360625 -304.63875 309.72125 -303.9375 309.0625 C-301.42787746 306.65744506 -299.73754861 304.09419782 -297.9375 301.125 C-291.45682369 290.64530679 -283.26978105 281.11107912 -275 272 C-274.23945312 271.14792969 -273.47890625 270.29585938 -272.6953125 269.41796875 C-261.20333583 256.68131212 -249.4127932 244.43038768 -235.60107422 234.1953125 C-234.09315636 233.06954766 -232.61006562 231.9107453 -231.12890625 230.75 C-218.83204622 221.19904076 -205.60475654 213.19504739 -191.75 206.125 C-173.60115669 196.85922492 -156.34234129 186.17359151 -140 174 C-139.39397949 173.55092285 -138.78795898 173.1018457 -138.16357422 172.63916016 C-125.82966238 163.42988411 -114.44428906 153.00482982 -104.02734375 141.671875 C-102 140 -102 140 -98.94140625 139.078125 C-95.23179408 137.71842652 -94.90798309 136.36702899 -93 133 C-90.88430161 131.19137368 -88.79403301 129.52354162 -86.5625 127.875 C-79.67134473 122.61499821 -73.24862678 117.00906281 -67 111 C-66.18934082 110.22221191 -66.18934082 110.22221191 -65.36230469 109.42871094 C-38.67092668 83.66680634 -18.35345896 50.9486745 -6 16 C-5.46115755 14.56143897 -4.91980813 13.12381234 -4.375 11.6875 C-3.694375 9.8621875 -3.694375 9.8621875 -3 8 C-2.43778394 6.49989355 -1.87528685 4.9998924 -1.3125 3.5 C-0.879375 2.345 -0.44625 1.19 0 0 Z " transform="translate(864,134)" style="${ssrRenderStyle({ "fill": "#0E6AB5" })}" data-v-53d7d9b2></path><path d="M0 0 C0.06469482 0.87285645 0.12938965 1.74571289 0.19604492 2.64501953 C5.08742656 66.92575162 21.94758567 126.72868333 61 179 C61.69738281 179.95390625 62.39476562 180.9078125 63.11328125 181.890625 C68.757459 189.54986443 74.76518524 196.82158861 81 204 C81.70511719 204.81855469 82.41023438 205.63710937 83.13671875 206.48046875 C87.9135746 211.91243626 92.96170463 217.0620546 98.0625 222.1875 C99.05382935 223.18583862 99.05382935 223.18583862 100.06518555 224.2043457 C114.68419492 238.77624958 131.38330395 251.65439275 148.8125 262.6875 C155.63194863 267.01927874 161.94246238 271.6312203 168 277 C168.52045898 277.46019531 169.04091797 277.92039062 169.57714844 278.39453125 C186.682472 293.60372217 206.13155025 314.47340607 213 337 C213 338.32 213 339.64 213 341 C213.66 341 214.32 341 215 341 C215 337.7 215 334.4 215 331 C215.33 331 215.66 331 216 331 C215.98952637 331.68473389 215.97905273 332.36946777 215.96826172 333.07495117 C215.69039161 354.45512121 216.66615516 375.66735118 218 397 C214.81840484 393.85202934 211.88688162 390.70917637 209.125 387.1875 C195.01399506 369.79486601 179.01725389 354.80049439 161.03857422 341.5078125 C159.17549086 340.12980018 157.32364299 338.73793117 155.47265625 337.34375 C143.47262065 328.42091498 130.39956431 321.3291817 117.2253418 314.30908203 C100.23189298 305.23807929 83.56723217 295.5061901 68.60449219 283.30126953 C66.83696152 281.86777311 65.04847179 280.4630769 63.2578125 279.05859375 C53.61532767 271.43306252 44.68387327 263.2009206 35.82324219 254.6875 C34.14552678 253.13469217 32.42251241 251.70174987 30.6328125 250.28125 C28.08487768 248.07354386 27.35196078 246.95123146 26 244 C24.73563258 242.41645188 23.46732096 240.83564815 22.16699219 239.28149414 C-9.10403399 201.88598105 -26.21432438 151.86965784 -26.25 103.375 C-26.25067474 102.55153076 -26.25134949 101.72806152 -26.25204468 100.87963867 C-26.23488351 87.6652149 -19.25973174 0 0 0 Z " transform="translate(230,24)" style="${ssrRenderStyle({ "fill": "#0683CB" })}" data-v-53d7d9b2></path><path d="M0 0 C0 4.02752361 -2.02246656 5.94161997 -4.375 9 C-22.12880736 33.05570699 -32.42892785 62.4331535 -28.69091797 92.48486328 C-24.86320298 116.14043525 -13.16725103 137.98132638 -1.25366211 158.43579102 C-0.44747437 159.82689087 -0.44747437 159.82689087 0.375 161.24609375 C0.85710937 162.06779053 1.33921875 162.8894873 1.8359375 163.73608398 C2.92044977 165.84528748 3.54293481 167.68311797 4 170 C3.360625 169.360625 2.72125 168.72125 2.0625 168.0625 C1.60617187 167.60746094 1.14984375 167.15242187 0.6796875 166.68359375 C-0.57017734 165.43082224 -1.81402751 164.17204426 -3.0546875 162.91015625 C-3.79976562 162.15605469 -4.54484375 161.40195312 -5.3125 160.625 C-6.00988281 159.91601562 -6.70726562 159.20703125 -7.42578125 158.4765625 C-9.46389549 156.51576671 -11.52617825 154.6666105 -13.66796875 152.82421875 C-18.65657365 148.48984757 -23.32686309 143.85709666 -28 139.1875 C-28.85078125 138.34896484 -29.7015625 137.51042969 -30.578125 136.64648438 C-44.70082615 122.5562741 -52.74025226 110.18911503 -54 90 C-54.98532735 93.20647376 -55.96214519 96.41548004 -56.9375 99.625 C-57.21529297 100.52863281 -57.49308594 101.43226563 -57.77929688 102.36328125 C-58.04677734 103.24628906 -58.31425781 104.12929688 -58.58984375 105.0390625 C-58.83597412 105.84553223 -59.08210449 106.65200195 -59.33569336 107.48291016 C-61.34815144 115.1082107 -61.28207117 122.72800649 -61.3125 130.5625 C-61.31578308 131.25030548 -61.31906616 131.93811096 -61.32244873 132.64675903 C-61.34114732 144.78302812 -59.98575413 156.2270581 -57 168 C-56.71334473 169.15653076 -56.71334473 169.15653076 -56.42089844 170.33642578 C-55.95185322 172.22542889 -55.47660779 174.11289079 -55 176 C-68.91110226 167.48299862 -75.45906938 150.71354453 -79.2734375 135.47265625 C-83.24758335 116.47794838 -81.19024641 97.88330409 -70.5847168 81.40332031 C-65.41475593 73.66871756 -59.80033277 66.26980484 -54 59 C-53.4956543 58.36416992 -52.99130859 57.72833984 -52.47167969 57.07324219 C-46.11651399 49.07803373 -39.62208129 41.2931274 -32.6328125 33.84375 C-30.60253331 31.65080749 -28.65443592 29.43090505 -26.71484375 27.16015625 C-22.89702439 22.77608223 -18.71957493 18.86178378 -14.4375 14.9375 C-9.26469962 10.19462291 -4.46366629 5.42268464 0 0 Z " transform="translate(555,279)" style="${ssrRenderStyle({ "fill": "#2C9DDA" })}" data-v-53d7d9b2></path><path d="M0 0 C9.16758913 8.88502646 17.95513646 21.09078098 18.203125 34.34375 C18.35026332 43.97709258 18.20650462 52.80544457 15 62 C14.47212891 63.59714844 14.47212891 63.59714844 13.93359375 65.2265625 C9.75205988 77.0121398 3.03068773 86.52016561 -5 96 C-5.66515625 96.78890625 -6.3303125 97.5778125 -7.015625 98.390625 C-23.24141592 117.0202368 -43.11026014 130.53696894 -63.96484375 143.45703125 C-75.72694212 150.74950413 -87.1477706 158.22668536 -97.7578125 167.15234375 C-100 169 -100 169 -103 171 C-93.89574795 151.65936094 -78.38923308 135.19940282 -63.3125 120.375 C-58.11404439 115.22129436 -53.49670925 109.76997101 -49 104 C-48.26007813 103.07703125 -47.52015625 102.1540625 -46.7578125 101.203125 C-32.2458519 82.62379828 -23.47722784 62.66353044 -23.875 38.8125 C-23.88402344 37.76513672 -23.89304687 36.71777344 -23.90234375 35.63867188 C-23.92559925 33.09219486 -23.95827431 30.54622969 -24 28 C-20.75398465 31.72378384 -18.77671735 35.32481764 -16.875 39.875 C-16.37742187 41.04804687 -15.87984375 42.22109375 -15.3671875 43.4296875 C-14.02428391 46.93658431 -12.97274543 50.37768131 -12 54 C-3.93784204 47.50808792 -2.11529407 29.71660871 -1 20 C-0.45269477 13.34295631 -0.1983438 6.67529477 0 0 Z " transform="translate(559,487)" style="${ssrRenderStyle({ "fill": "#2E9EDA" })}" data-v-53d7d9b2></path><path d="M0 0 C0.78536133 0.00088623 1.57072266 0.00177246 2.37988281 0.00268555 C8.91021686 0.13498458 14.30362227 1.47975858 20.1875 4.375 C20.84621094 4.68308594 21.50492188 4.99117187 22.18359375 5.30859375 C23.53617334 5.96145549 24.86626984 6.66082154 26.1875 7.375 C26.1875 8.035 26.1875 8.695 26.1875 9.375 C19.7623719 13.20273589 13.75776122 16.27636793 6.1875 14.375 C3.41531292 12.81286246 0.99120964 11.09335188 -1.48828125 9.1015625 C-6.31575312 5.51544054 -10.9916378 4.96695209 -16.8125 4.375 C-16.8125 3.715 -16.8125 3.055 -16.8125 2.375 C-11.10034189 0.75774119 -5.93092159 -0.01213782 0 0 Z " transform="translate(551.8125,233.625)" style="${ssrRenderStyle({ "fill": "#F1F7FA" })}" data-v-53d7d9b2></path><path d="M0 0 C0.33 0.66 0.66 1.32 1 2 C0.109375 3.99609375 0.109375 3.99609375 -1.25 6.4375 C-5.42027872 14.50003886 -7.22311219 22.46393257 -7.7890625 31.4921875 C-8.31593201 37.75608054 -10.51418926 43.04693607 -12.84375 48.84375 C-14.95715926 54.61278609 -15.12868156 59.73906946 -15.0625 65.8125 C-15.05573242 66.99489258 -15.05573242 66.99489258 -15.04882812 68.20117188 C-15.03711312 70.13414761 -15.01917998 72.06708393 -15 74 C-18.38611766 68.92082351 -17.39178633 62.83405857 -17.375 56.875 C-17.37468277 55.85590546 -17.37468277 55.85590546 -17.37435913 54.81622314 C-17.31625571 36.19393863 -13.87767063 13.87767063 0 0 Z " transform="translate(482,659)" style="${ssrRenderStyle({ "fill": "#024591" })}" data-v-53d7d9b2></path><path d="M0 0 C0.33 0 0.66 0 1 0 C3.12520235 19.51964445 3.70610531 38.19737935 1.625 57.75 C1.49907471 58.94778076 1.37314941 60.14556152 1.2434082 61.37963867 C1.11409912 62.48670166 0.98479004 63.59376465 0.8515625 64.734375 C0.73635254 65.72663086 0.62114258 66.71888672 0.50244141 67.74121094 C0.33663574 68.48661133 0.17083008 69.23201172 0 70 C-0.99 70.495 -0.99 70.495 -2 71 C-1.93941406 70.31824707 -1.87882813 69.63649414 -1.81640625 68.93408203 C-0.69211903 55.97667185 0.19514146 43.07399617 0.1875 30.0625 C0.18814453 29.02947754 0.18878906 27.99645508 0.18945312 26.93212891 C0.14564476 20.77008361 -0.21702579 14.6989479 -0.83056641 8.56713867 C-1.02773966 5.57970819 -0.72584202 2.90336809 0 0 Z " transform="translate(867,147)" style="${ssrRenderStyle({ "fill": "#3398CD" })}" data-v-53d7d9b2></path><path d="M0 0 C2 1 2 1 2.76538086 2.87573242 C3 5 3 5 0.75390625 7.98828125 C-0.29592461 9.10959995 -1.36069783 10.21705601 -2.4375 11.3125 C-2.98792969 11.88919434 -3.53835938 12.46588867 -4.10546875 13.06005859 C-9.37496633 18.52192977 -14.90269494 23.48050634 -21 28 C-17.18442578 19.73292253 -10.88455118 12.6171093 -4.76171875 5.97265625 C-3.05021559 4.0562281 -1.51026157 2.07719052 0 0 Z " transform="translate(480,591)" style="${ssrRenderStyle({ "fill": "#054091" })}" data-v-53d7d9b2></path><path d="M0 0 C0.33 0.66 0.66 1.32 1 2 C0.109375 3.99609375 0.109375 3.99609375 -1.25 6.4375 C-6.25256756 16.10913062 -8 26.16370088 -8 37 C-8.66 37 -9.32 37 -10 37 C-10 32.05 -10 27.1 -10 22 C-10.66 22.33 -11.32 22.66 -12 23 C-9.85707901 15.09797883 -5.90454707 5.90454707 0 0 Z " transform="translate(482,659)" style="${ssrRenderStyle({ "fill": "#0257A7" })}" data-v-53d7d9b2></path><path d="M0 0 C0.33 0.66 0.66 1.32 1 2 C-0.03762622 4.54248765 -1.13517974 6.93225555 -2.375 9.375 C-2.91278076 10.4434314 -2.91278076 10.4434314 -3.46142578 11.53344727 C-12.01204821 28.0060241 -12.01204821 28.0060241 -18 31 C-16.9292901 27.88520757 -15.56862144 25.28166067 -13.75 22.5625 C-10.02068529 16.78484527 -7.59250052 10.34316279 -5 4 C-4.01 4 -3.02 4 -2 4 C-1.34 2.68 -0.68 1.36 0 0 Z " transform="translate(599,605)" style="${ssrRenderStyle({ "fill": "#0C5BA3" })}" data-v-53d7d9b2></path><path d="M0 0 C0.66 0.33 1.32 0.66 2 1 C-3.61 6.28 -9.22 11.56 -15 17 C-15 12.9255567 -12.90830751 10.88254967 -10.5 7.8125 C-9.85611328 6.97428711 -9.85611328 6.97428711 -9.19921875 6.11914062 C-8.13921945 4.74114153 -7.07043812 3.36990593 -6 2 C-5.34 2.66 -4.68 3.32 -4 4 C-2.68 2.68 -1.36 1.36 0 0 Z " transform="translate(475,602)" style="${ssrRenderStyle({ "fill": "#125CA7" })}" data-v-53d7d9b2></path><path d="M0 0 C4.51617599 -0.07654536 8.59085217 -0.10228696 13 1 C13 1.99 13 2.98 13 4 C13.33 4.66 13.66 5.32 14 6 C12.41531323 5.54636829 10.83230076 5.08688548 9.25 4.625 C8.36828125 4.36976563 7.4865625 4.11453125 6.578125 3.8515625 C4.23919428 3.0790066 2.16557438 2.16374324 0 1 C0 0.67 0 0.34 0 0 Z " transform="translate(302,479)" style="${ssrRenderStyle({ "fill": "#305796" })}" data-v-53d7d9b2></path><path d="M0 0 C0.99 0.99 1.98 1.98 3 3 C2.67 3.99 2.34 4.98 2 6 C1.87757438 7.37199347 1.79970317 8.74831675 1.75390625 10.125 C1.72103516 10.91390625 1.68816406 11.7028125 1.65429688 12.515625 C1.59310411 14.17173546 1.53581149 15.82799463 1.48242188 17.484375 C1.44826172 18.27328125 1.41410156 19.0621875 1.37890625 19.875 C1.3538501 20.59429687 1.32879395 21.31359375 1.30297852 22.0546875 C1 24 1 24 -1 27 C-0.67 18.09 -0.34 9.18 0 0 Z " transform="translate(794,23)" style="${ssrRenderStyle({ "fill": "#399FD4" })}" data-v-53d7d9b2></path><path d="M0 0 C6.93 2.97 6.93 2.97 14 6 C12.68 6.33 11.36 6.66 10 7 C9.01 7.66 8.02 8.32 7 9 C5.82737096 7.88121617 4.66204862 6.75476949 3.5 5.625 C2.8503125 4.99851562 2.200625 4.37203125 1.53125 3.7265625 C0 2 0 2 0 0 Z " transform="translate(210,412)" style="${ssrRenderStyle({ "fill": "#184186" })}" data-v-53d7d9b2></path><path d="M0 0 C0.33 0.66 0.66 1.32 1 2 C-0.07518118 4.44332726 -1.19808566 6.76754523 -2.4375 9.125 C-2.77587891 9.78371094 -3.11425781 10.44242188 -3.46289062 11.12109375 C-4.30149926 12.75106547 -5.14984811 14.37601909 -6 16 C-7.09898702 12.70303895 -6.87124444 11.59505097 -6.0625 8.3125 C-5.86785156 7.50425781 -5.67320312 6.69601562 -5.47265625 5.86328125 C-5.31667969 5.24839844 -5.16070313 4.63351562 -5 4 C-4.01 4 -3.02 4 -2 4 C-1.34 2.68 -0.68 1.36 0 0 Z " transform="translate(599,605)" style="${ssrRenderStyle({ "fill": "#114D92" })}" data-v-53d7d9b2></path><path d="M0 0 C1 3 1 3 -0.4375 6.1875 C-1.2109375 7.5796875 -1.2109375 7.5796875 -2 9 C-2.66 8.34 -3.32 7.68 -4 7 C-5.65 8.65 -7.3 10.3 -9 12 C-9.66 11.67 -10.32 11.34 -11 11 C-7.37 7.37 -3.74 3.74 0 0 Z " transform="translate(883,291)" style="${ssrRenderStyle({ "fill": "#489BD0" })}" data-v-53d7d9b2></path><path d="M0 0 C-0.99 0 -1.98 0 -3 0 C-3 0.99 -3 1.98 -3 3 C-1.68 3.33 -0.36 3.66 1 4 C-1.81484045 5.40742022 -3.56936113 4.66652164 -6.625 4.0625 C-7.62789062 3.86785156 -8.63078125 3.67320312 -9.6640625 3.47265625 C-10.82035156 3.23869141 -10.82035156 3.23869141 -12 3 C-12 2.34 -12 1.68 -12 1 C-3.96428571 -1.27678571 -3.96428571 -1.27678571 0 0 Z " transform="translate(547,235)" style="${ssrRenderStyle({ "fill": "#AAD5EB" })}" data-v-53d7d9b2></path><path d="M0 0 C2.56616632 3.84924948 2.55097676 6.4349304 3 11 C2.01 10.01 1.02 9.02 0 8 C-1.485 8.99 -1.485 8.99 -3 10 C-2.01 6.7 -1.02 3.4 0 0 Z " transform="translate(864,134)" style="${ssrRenderStyle({ "fill": "#47A5D6" })}" data-v-53d7d9b2></path><path d="M0 0 C0.66 0.33 1.32 0.66 2 1 C0.45730076 5.72065967 -1.07794619 10.41664092 -3 15 C-4.28497537 11.14507389 -3.4052209 9.59653164 -2.0625 5.8125 C-1.68222656 4.72582031 -1.30195312 3.63914063 -0.91015625 2.51953125 C-0.60980469 1.68808594 -0.30945313 0.85664063 0 0 Z " transform="translate(858,243)" style="${ssrRenderStyle({ "fill": "#3DA1D4" })}" data-v-53d7d9b2></path><path d="M0 0 C1.65 1.65 3.3 3.3 5 5 C4.01 5.33 3.02 5.66 2 6 C2 7.65 2 9.3 2 11 C-0.32590854 7.36576791 -0.16265833 4.22911669 0 0 Z " transform="translate(459,165)" style="${ssrRenderStyle({ "fill": "#4A9ED2" })}" data-v-53d7d9b2></path><path d="M0 0 C0.33 0 0.66 0 1 0 C0.75 3.375 0.75 3.375 0 7 C-2.0625 8.4375 -2.0625 8.4375 -4 9 C-2.94124926 5.59687262 -1.99097846 2.98646769 0 0 Z " transform="translate(229,24)" style="${ssrRenderStyle({ "fill": "#1485C7" })}" data-v-53d7d9b2></path><path d="M0 0 C0.66 1.32 1.32 2.64 2 4 C-3.2734375 7.22265625 -3.2734375 7.22265625 -5 8 C-5.66 7.67 -6.32 7.34 -7 7 C-6.21625 6.401875 -5.4325 5.80375 -4.625 5.1875 C-1.85425677 3.08914751 -1.85425677 3.08914751 0 0 Z " transform="translate(407,553)" style="${ssrRenderStyle({ "fill": "#3560A0" })}" data-v-53d7d9b2></path><path d="M0 0 C0.33 0 0.66 0 1 0 C1.33 5.61 1.66 11.22 2 17 C-1 14 -1 14 -1.07421875 10.64453125 C-0.94660156 9.37996094 -0.81898438 8.11539062 -0.6875 6.8125 C-0.56761719 5.54019531 -0.44773437 4.26789063 -0.32421875 2.95703125 C-0.21722656 1.98121094 -0.11023438 1.00539063 0 0 Z " transform="translate(446,404)" style="${ssrRenderStyle({ "fill": "#0573BD" })}" data-v-53d7d9b2></path><path d="M0 0 C0 3.60573896 -0.81707462 4.41336566 -3 7.1875 C-3.556875 7.90292969 -4.11375 8.61835938 -4.6875 9.35546875 C-5.120625 9.89816406 -5.55375 10.44085938 -6 11 C-6.66 10.34 -7.32 9.68 -8 9 C-5.36 6.03 -2.72 3.06 0 0 Z " transform="translate(555,279)" style="${ssrRenderStyle({ "fill": "#2497D5" })}" data-v-53d7d9b2></path><path d="M0 0 C0.66 0.33 1.32 0.66 2 1 C0.02 3.31 -1.96 5.62 -4 8 C-4.66 7.67 -5.32 7.34 -6 7 C-4.02 4.69 -2.04 2.38 0 0 Z " transform="translate(480,591)" style="${ssrRenderStyle({ "fill": "#23539C" })}" data-v-53d7d9b2></path><path d="M0 0 C1.98 0.99 3.96 1.98 6 3 C5.67 4.32 5.34 5.64 5 7 C3.29115995 5.37660195 1.62553283 3.70680947 0 2 C0 1.34 0 0.68 0 0 Z " transform="translate(210,412)" style="${ssrRenderStyle({ "fill": "#3A5F9B" })}" data-v-53d7d9b2></path></svg><div class="php-badge" data-v-53d7d9b2>PHP</div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/PhoenixLogo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PhoenixLogo = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-53d7d9b2"]]);
const _sfc_main = {
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    const { Layout: Layout2 } = theme;
    const { frontmatter } = useData$1();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Layout2), _attrs, {
        "home-hero-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(HeroParticles, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(HeroParticles)
            ];
          }
        }),
        "home-hero-image": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PhoenixLogo, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(PhoenixLogo)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/Layout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Layout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-920e2b0c"]]);
const RawTheme = {
  extends: theme,
  Layout
};
const ClientOnly = defineComponent({
  setup(_, { slots }) {
    const show = ref(false);
    onMounted(() => {
      show.value = true;
    });
    return () => show.value && slots.default ? slots.default() : null;
  }
});
function useCodeGroups() {
  if (inBrowser) {
    window.addEventListener("click", (e) => {
      const el = e.target;
      if (el.matches(".vp-code-group input")) {
        const group = el.parentElement?.parentElement;
        if (!group)
          return;
        const i = Array.from(group.querySelectorAll("input")).indexOf(el);
        if (i < 0)
          return;
        const blocks = group.querySelector(".blocks");
        if (!blocks)
          return;
        const current = Array.from(blocks.children).find((child) => child.classList.contains("active"));
        if (!current)
          return;
        const next = blocks.children[i];
        if (!next || current === next)
          return;
        current.classList.remove("active");
        activate(next);
        const label = group?.querySelector(`label[for="${el.id}"]`);
        label?.scrollIntoView({ block: "nearest" });
      }
    });
  }
}
function activate(el) {
  el.classList.add("active");
  window.dispatchEvent(new CustomEvent("vitepress:codeGroupTabActivate", { detail: el }));
}
const ignoredNodes = [".vp-copy-ignore", ".diff.remove"].join(", ");
function useCopyCode() {
  if (inBrowser) {
    const timeoutIdMap = /* @__PURE__ */ new WeakMap();
    window.addEventListener("click", (e) => {
      const el = e.target;
      if (el.matches('div[class*="language-"] > button.copy')) {
        const parent = el.parentElement;
        const sibling = el.nextElementSibling?.nextElementSibling;
        if (!parent || !sibling) {
          return;
        }
        const clone = sibling.cloneNode(true);
        clone.querySelectorAll(ignoredNodes).forEach((node) => node.remove());
        clone.innerHTML = clone.innerHTML.replace(/\n+/g, "\n");
        let text = clone.textContent || "";
        const lang = /language-(\w+)/.exec(parent.className)?.[1] || "";
        if (isShell(lang)) {
          text = text.replace(/^ *(\$|>) /gm, "").trim();
        }
        copyToClipboard(text).then(() => {
          el.classList.add("copied");
          clearTimeout(timeoutIdMap.get(el));
          const timeoutId = setTimeout(() => {
            el.classList.remove("copied");
            el.blur();
            timeoutIdMap.delete(el);
          }, 2e3);
          timeoutIdMap.set(el, timeoutId);
        });
      }
    });
  }
}
async function copyToClipboard(text) {
  try {
    return navigator.clipboard.writeText(text);
  } catch {
    const element = document.createElement("textarea");
    const previouslyFocusedElement = document.activeElement;
    element.value = text;
    element.setAttribute("readonly", "");
    element.style.contain = "strict";
    element.style.position = "absolute";
    element.style.left = "-9999px";
    element.style.fontSize = "12pt";
    const selection = document.getSelection();
    const originalRange = selection ? selection.rangeCount > 0 && selection.getRangeAt(0) : null;
    document.body.appendChild(element);
    element.select();
    element.selectionStart = 0;
    element.selectionEnd = text.length;
    document.execCommand("copy");
    document.body.removeChild(element);
    if (originalRange) {
      selection.removeAllRanges();
      selection.addRange(originalRange);
    }
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }
}
function useUpdateHead(route, siteDataByRouteRef) {
  let isFirstUpdate = true;
  let managedHeadElements = [];
  const updateHeadTags = (newTags) => {
    if (isFirstUpdate) {
      isFirstUpdate = false;
      newTags.forEach((tag) => {
        const headEl = createHeadElement(tag);
        for (const el of document.head.children) {
          if (el.isEqualNode(headEl)) {
            managedHeadElements.push(el);
            return;
          }
        }
      });
      return;
    }
    const newElements = newTags.map(createHeadElement);
    managedHeadElements.forEach((oldEl, oldIndex) => {
      const matchedIndex = newElements.findIndex((newEl) => newEl?.isEqualNode(oldEl ?? null));
      if (matchedIndex !== -1) {
        delete newElements[matchedIndex];
      } else {
        oldEl?.remove();
        delete managedHeadElements[oldIndex];
      }
    });
    newElements.forEach((el) => el && document.head.appendChild(el));
    managedHeadElements = [...managedHeadElements, ...newElements].filter(Boolean);
  };
  watchEffect(() => {
    const pageData = route.data;
    const siteData2 = siteDataByRouteRef.value;
    const pageDescription = pageData && pageData.description;
    const frontmatterHead = pageData && pageData.frontmatter.head || [];
    const title = createTitle(siteData2, pageData);
    if (title !== document.title) {
      document.title = title;
    }
    const description = pageDescription || siteData2.description;
    let metaDescriptionElement = document.querySelector(`meta[name=description]`);
    if (metaDescriptionElement) {
      if (metaDescriptionElement.getAttribute("content") !== description) {
        metaDescriptionElement.setAttribute("content", description);
      }
    } else {
      createHeadElement(["meta", { name: "description", content: description }]);
    }
    updateHeadTags(mergeHead(siteData2.head, filterOutHeadDescription(frontmatterHead)));
  });
}
function createHeadElement([tag, attrs, innerHTML]) {
  const el = document.createElement(tag);
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
  if (innerHTML) {
    el.innerHTML = innerHTML;
  }
  if (tag === "script" && attrs.async == null) {
    el.async = false;
  }
  return el;
}
function isMetaDescription(headConfig) {
  return headConfig[0] === "meta" && headConfig[1] && headConfig[1].name === "description";
}
function filterOutHeadDescription(head) {
  return head.filter((h2) => !isMetaDescription(h2));
}
const hasFetched = /* @__PURE__ */ new Set();
const createLink = () => document.createElement("link");
const viaDOM = (url) => {
  const link2 = createLink();
  link2.rel = `prefetch`;
  link2.href = url;
  document.head.appendChild(link2);
};
const viaXHR = (url) => {
  const req = new XMLHttpRequest();
  req.open("GET", url, req.withCredentials = true);
  req.send();
};
let link;
const doFetch = inBrowser && (link = createLink()) && link.relList && link.relList.supports && link.relList.supports("prefetch") ? viaDOM : viaXHR;
function usePrefetch() {
  if (!inBrowser) {
    return;
  }
  if (!window.IntersectionObserver) {
    return;
  }
  let conn;
  if ((conn = navigator.connection) && (conn.saveData || /2g/.test(conn.effectiveType))) {
    return;
  }
  const rIC = window.requestIdleCallback || setTimeout;
  let observer = null;
  const observeLinks = () => {
    if (observer) {
      observer.disconnect();
    }
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const link2 = entry.target;
          observer.unobserve(link2);
          const { pathname } = link2;
          if (!hasFetched.has(pathname)) {
            hasFetched.add(pathname);
            const pageChunkPath = pathToFile(pathname);
            if (pageChunkPath)
              doFetch(pageChunkPath);
          }
        }
      });
    });
    rIC(() => {
      document.querySelectorAll("#app a").forEach((link2) => {
        const { hostname, pathname } = new URL(link2.href instanceof SVGAnimatedString ? link2.href.animVal : link2.href, link2.baseURI);
        const extMatch = pathname.match(/\.\w+$/);
        if (extMatch && extMatch[0] !== ".html") {
          return;
        }
        if (
          // only prefetch same tab navigation, since a new tab will load
          // the lean js chunk instead.
          link2.target !== "_blank" && // only prefetch inbound links
          hostname === location.hostname
        ) {
          if (pathname !== location.pathname) {
            observer.observe(link2);
          } else {
            hasFetched.add(pathname);
          }
        }
      });
    });
  };
  onMounted(observeLinks);
  const route = useRoute();
  watch(() => route.path, observeLinks);
  onUnmounted(() => {
    observer && observer.disconnect();
  });
}
function resolveThemeExtends(theme2) {
  if (theme2.extends) {
    const base = resolveThemeExtends(theme2.extends);
    return {
      ...base,
      ...theme2,
      async enhanceApp(ctx) {
        if (base.enhanceApp)
          await base.enhanceApp(ctx);
        if (theme2.enhanceApp)
          await theme2.enhanceApp(ctx);
      }
    };
  }
  return theme2;
}
const Theme = resolveThemeExtends(RawTheme);
const VitePressApp = defineComponent({
  name: "VitePressApp",
  setup() {
    const { site, lang, dir } = useData$1();
    onMounted(() => {
      watchEffect(() => {
        document.documentElement.lang = lang.value;
        document.documentElement.dir = dir.value;
      });
    });
    if (site.value.router.prefetchLinks) {
      usePrefetch();
    }
    useCopyCode();
    useCodeGroups();
    if (Theme.setup)
      Theme.setup();
    return () => h(Theme.Layout);
  }
});
async function createApp() {
  globalThis.__VITEPRESS__ = true;
  const router = newRouter();
  const app = newApp();
  app.provide(RouterSymbol, router);
  const data = initData(router.route);
  app.provide(dataSymbol, data);
  app.component("Content", Content);
  app.component("ClientOnly", ClientOnly);
  Object.defineProperties(app.config.globalProperties, {
    $frontmatter: {
      get() {
        return data.frontmatter.value;
      }
    },
    $params: {
      get() {
        return data.page.value.params;
      }
    }
  });
  if (Theme.enhanceApp) {
    await Theme.enhanceApp({
      app,
      router,
      siteData: siteDataRef
    });
  }
  return { app, router, data };
}
function newApp() {
  return createSSRApp(VitePressApp);
}
function newRouter() {
  let isInitialPageLoad = inBrowser;
  return createRouter((path) => {
    let pageFilePath = pathToFile(path);
    let pageModule = null;
    if (pageFilePath) {
      if (isInitialPageLoad) {
        pageFilePath = pageFilePath.replace(/\.js$/, ".lean.js");
      }
      if (false) ;
      else {
        pageModule = import(
          /*@vite-ignore*/
          pageFilePath
        );
      }
    }
    if (inBrowser) {
      isInitialPageLoad = false;
    }
    return pageModule;
  }, Theme.NotFound);
}
if (inBrowser) {
  createApp().then(({ app, router, data }) => {
    router.go(location.href, { initialLoad: true }).then(() => {
      useUpdateHead(router.route, data.site);
      app.mount("#app");
    });
  });
}
async function render(path) {
  const { app, router } = await createApp();
  await router.go(path);
  const ctx = { content: "", vpSocialIcons: /* @__PURE__ */ new Set() };
  ctx.content = await renderToString(app, ctx);
  return ctx;
}
export {
  useRouter as a,
  dataSymbol as d,
  escapeRegExp as e,
  inBrowser as i,
  pathToFile as p,
  render,
  useData as u
};
