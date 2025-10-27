const fs = require("fs");
const Handlebars = require("handlebars");

// Register helper for rating stars
Handlebars.registerHelper("times", function (n, block) {
  var accum = "";
  for (var i = 0; i < n; ++i) accum += block.fn(i);
  return accum;
});

// Register helper for conditional content
Handlebars.registerHelper("if_eq", function(a, b, opts) {
  if (a == b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

// Read the template
const templateSource = fs.readFileSync("template.hbs", "utf8");
const template = Handlebars.compile(templateSource);

// Read the JSON data
const data = JSON.parse(fs.readFileSync("template.json", "utf8"));

// Compile the template with the data
const compiledHtml = template(data);

// Write the compiled HTML to a file
fs.writeFileSync("index.html", compiledHtml);

console.log("HTML file generated successfully!");
console.log("Template compiled with data from template.json");