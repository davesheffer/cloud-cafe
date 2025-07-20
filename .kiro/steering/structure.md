# Project Structure

## Root Directory Layout
```
/
├── assets/           # Static assets (images, icons, media)
├── css/             # Stylesheets
├── js/              # JavaScript files
├── *.html           # HTML pages
├── .prettierrc      # Code formatting configuration
└── .vscode/         # VS Code settings
```

## HTML Pages
- `index.html` - Homepage with hero section, features, testimonials
- `about.html` - Company story and venue booking information
- `menu.html` - Interactive menu with filtering functionality
- `blog.html` - Blog listing page
- `post.html` - Individual blog post template
- `contact.html` - Contact form and location information

## Asset Organization
```
assets/
├── logos/           # Brand partner logos (1.png - 6.png)
├── menu/           # Menu item images (coffee and pastries)
├── *.png           # General images (hero, blends, customer photos)
├── *.jpg           # Photography assets
└── *.svg           # Vector graphics (logo, icons)
```

## CSS Architecture
- Single stylesheet: `css/style.css`
- CSS custom properties for color theming
- Mobile-first responsive design
- Component-based class naming
- Media queries for breakpoints (768px, 1200px)

## JavaScript Structure
- Main functionality: `js/main.js`
- Page-specific logic based on `window.location.pathname`
- Event-driven architecture
- GSAP animations with ScrollTrigger
- Modular function organization

## Naming Conventions
- **Files**: lowercase with hyphens (kebab-case)
- **CSS Classes**: BEM-inspired with descriptive names
- **IDs**: camelCase for JavaScript targeting
- **Images**: descriptive names without spaces

## Color System
CSS custom properties defined in `:root`:
- `--primary-color`: #e8b76b (golden yellow)
- `--secondary-color`: #7b5b4a (brown)
- `--accent-color`: #d9cbae (cream)
- `--text-dark`: #4b3d3a (dark brown)
- `--text-light`: #f2e1d4 (light cream)
