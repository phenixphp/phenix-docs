import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"PhenixPHP","text":"Async and concurrent APIs in Native PHP","tagline":"High-performance framework for build APIs, powered by Amphp.","actions":[{"theme":"brand","text":"Get Started","link":"/guide/"},{"theme":"alt","text":"View on GitHub","link":"https://github.com/phenixphp/phenix"}]},"features":[{"title":"Concurrent by default","details":"Modern applications demand tolerance to high traffic. Non-blocking I/O operations and asynchronism allow maximum performance to be achieved.","icon":"⚡"},{"title":"Native PHP","details":"No need to install external extensions. Phenix leverages the power of fibers implemented in the Amphp ecosystem. Enjoy seamless integration.","icon":"🐘"},{"title":"Elegant and simple syntax","details":"Facades, fluent query builder, elegant route collector, tasks, events, queues, integrated CLI, testing tools, powerful ORM, collections, and much more.","icon":"✨"}],"footer":"Made by Omar Barbosa with ❤️"},"headers":[],"relativePath":"index.md","filePath":"index.md"}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
