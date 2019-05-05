(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['entries'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.entry,depth0,{"name":"entry","hash":{"entry":depth0},"data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"activity-cat\" class=\"entry\">\n    <div class=\"first\">Category</div>\n    <div>Item</div>\n    <div>Units</div>\n    <div>Amount ($)</div>\n    <div>Date (mm/dd/yy)</div>\n</div>\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.entries : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['entry'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"entry\">\n    <div class=\"first\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.entry : depth0)) != null ? stack1.category : stack1), depth0))
    + "</div>\n    <div>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.entry : depth0)) != null ? stack1.item : stack1), depth0))
    + "</div>\n    <div>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.entry : depth0)) != null ? stack1.units : stack1), depth0))
    + "</div>\n    <div>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.entry : depth0)) != null ? stack1.amount : stack1), depth0))
    + " ($)</div>\n    <div>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.entry : depth0)) != null ? stack1.date : stack1), depth0))
    + " (mm/dd/yy)</div>\n</div>\n";
},"useData":true});
})();