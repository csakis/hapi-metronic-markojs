// Compiled using marko@4.7.4 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/hapi-metronic-markojs$1.0.0/templates/layout.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    include_tag = marko_loadTag(require("marko/src/taglibs/core/include-tag")),
    browser_refresh_tag = marko_loadTag(require("browser-refresh-taglib/refresh-tag")),
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!doctype html><html class=\"no-js\" lang=\"\"><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title></title><link rel=\"shortcut icon\" type=\"image/png\" href=\"/favicon.png\"><link rel=\"stylesheet\" href=\"css/normalize.css\"><link rel=\"stylesheet\" href=\"css/bootstrap.min.css\"><script defer src=\"js/vendor/fontawesome-all.min.js\"></script> </head><body>");

  component_globals_tag({}, out);

  include_tag({
      _target: input.body
    }, out, __component, "11");

  out.w("<script src=\"js/vendor/jquery-3.2.1.min.js\"></script><script src=\"js/vendor/popper.min.js\"></script> <script src=\"js/vendor/bootstrap.min.js\"></script>");

  browser_refresh_tag({
      enabled: "true"
    }, out, __component, "15");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "16");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/hapi-metronic-markojs$1.0.0/templates/layout.marko",
    tags: [
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/taglibs/core/include-tag",
      "browser-refresh-taglib/refresh-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
