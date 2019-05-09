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
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.entry : depth0)) != null ? stack1.item_name : stack1), depth0))
    + "</div>\n    <div>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.entry : depth0)) != null ? stack1.units : stack1), depth0))
    + "</div>\n    <div>$"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.entry : depth0)) != null ? stack1.amt : stack1), depth0))
    + "</div>\n    <div>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.entry : depth0)) != null ? stack1.date : stack1)) != null ? stack1.month : stack1), depth0))
    + "/"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.entry : depth0)) != null ? stack1.date : stack1)) != null ? stack1.day : stack1), depth0))
    + "/"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.entry : depth0)) != null ? stack1.date : stack1)) != null ? stack1.year : stack1), depth0))
    + " </div>\n</div>\n";
},"useData":true});
templates['item'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<option value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.item : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.item : depth0)) != null ? stack1.name : stack1), depth0))
    + "</option>";
},"useData":true});
templates['items'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.item,depth0,{"name":"item","hash":{"item":depth0},"data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['totals'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"total\">\n    <div class=\"total-title\">Sales</div>\n    <div>$"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.totals : depth0)) != null ? stack1.sales : stack1), depth0))
    + "</div>\n</div>\n<div class=\"total\">\n    <div class=\"total-title\">Purchases</div>\n    <div>$"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.totals : depth0)) != null ? stack1.purchs : stack1), depth0))
    + "</div>\n</div>\n<div class=\"total\">\n    <div class=\"total-title\">Net Profits</div>\n    <div>$"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.totals : depth0)) != null ? stack1.profits : stack1), depth0))
    + "</div>\n</div>\n";
},"useData":true});
})();