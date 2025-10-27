# Blank Website Template

A clean, responsive website template built with Handlebars.js that you can use as a starting point for any frontend project.

## Features

- **Handlebars.js templating** - Separate content from presentation
- **Responsive design** - Works on all devices
- **Modular structure** - Easy to customize and extend
- **Clean code** - Well-organized and commented
- **Modern CSS** - Flexbox, Grid, and modern styling
- **SEO ready** - Proper meta tags and structure

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Customize your content:**
   - Edit `template.json` to add your content
   - Modify `template.hbs` to change the layout
   - Update `assets/css/main.css` for styling

3. **Build the website:**
   ```bash
   npm run build
   ```

4. **Preview locally:**
   ```bash
   npm run dev
   ```

## File Structure

```
blank-website-template/
├── template.hbs          # Handlebars template
├── template.json         # Content data
├── template.js           # Build script
├── package.json          # Dependencies
├── index.html            # Generated output
├── README.md             # This file
└── assets/
    ├── css/
    │   └── main.css      # Main stylesheet
    ├── js/               # JavaScript files
    └── images/           # Images and assets
        ├── logo/         # Logo files
        ├── bg/           # Background images
        ├── portfolio/    # Portfolio images
        └── ...
```

## Customization Guide

### 1. Content (template.json)

Edit `template.json` to add your content:

```json
{
  "site": {
    "title": "Your Website Title",
    "description": "Your website description"
  },
  "header": {
    "navigation": [
      {"text": "Home", "link": "#"},
      {"text": "About", "link": "#about"}
    ]
  }
}
```

### 2. Layout (template.hbs)

Modify `template.hbs` to change the HTML structure:

```html
<section id="about" class="custom-section">
  <div class="container">
    <h2>{{about.title}}</h2>
    <p>{{about.description}}</p>
  </div>
</section>
```

### 3. Styling (assets/css/main.css)

Update `main.css` to change the appearance:

```css
.custom-section {
  padding: 100px 0;
  background: #f8f9fa;
}
```

## Sections Included

- **Header** - Navigation and logo
- **Banner** - Hero section with CTA
- **About** - About section
- **Services** - Services grid
- **Portfolio** - Portfolio showcase
- **Contact** - Contact information
- **Footer** - Footer with links and social media

## Adding New Sections

1. Add content to `template.json`:
```json
"newSection": {
  "title": "New Section",
  "items": [...]
}
```

2. Add HTML to `template.hbs`:
```html
<section id="new-section" class="custom-section">
  <div class="container">
    <h2>{{newSection.title}}</h2>
    {{#each newSection.items}}
      <div class="item">{{this}}</div>
    {{/each}}
  </div>
</section>
```

3. Add styles to `main.css`:
```css
#new-section {
  background: #fff;
  padding: 80px 0;
}
```

## Handlebars Helpers

The template includes useful Handlebars helpers:

- `{{#times n}}` - Repeat content n times
- `{{#if_eq a b}}` - Conditional content based on equality

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11+ (with polyfills)

## License

MIT License - feel free to use this template for any project!

## Support

For questions or issues, please check the documentation or create an issue in the repository.
