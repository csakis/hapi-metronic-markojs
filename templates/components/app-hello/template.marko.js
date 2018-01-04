// Compiled using marko@4.7.4 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/hapi-metronic-markojs$1.0.0/templates/components/app-hello/template.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"app-hello\">Hello " +
    marko_escapeXml(data.name) +
    "! You have " +
    marko_escapeXml(data.messageCount) +
    " message(s).</div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/hapi-metronic-markojs$1.0.0/templates/components/app-hello/template.marko"
  };
