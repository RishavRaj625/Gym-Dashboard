# 🏋️ FitGym - Modern Gym Website

A modern, responsive gym website built with HTML, CSS, and JavaScript featuring glassmorphism design, dark mode, and interactive components.

## 🌟 Features

### Design & UI
- **Modern Glassmorphism Design** - Beautiful glass-like effects with backdrop blur
- **Dark/Light Mode Toggle** - Seamless theme switching with smooth transitions
- **Responsive Layout** - Mobile-first design that works on all devices
- **Smooth Animations** - CSS animations and transitions for enhanced UX
- **Interactive Elements** - Hover effects, button animations, and micro-interactions.

### Sections & Components
- **Hero Section** - Eye-catching landing area with gradient background
- **About Section** - Information about the gym with feature highlights
- **Membership Plans** - Pricing cards with popular plan highlighting
- **Trainers Section** - Meet the team with social media links
- **Class Schedule** - Interactive weekly schedule table
- **Gallery** - Image showcase with hover effects
- **BMI Calculator** - Interactive calculator with real-time results
- **Testimonials** - Client feedback carousel
- **FAQ Section** - Expandable question/answer accordion
- **Contact Form** - Get in touch with validation
- **Newsletter Signup** - Email subscription form
- **Footer** - Complete site information and links

### Technical Features
- **CSS Grid & Flexbox** - Modern layout techniques
- **CSS Custom Properties** - Dynamic theming system
- **Backdrop Filter** - Glassmorphism effects
- **Smooth Scrolling** - Enhanced navigation experience
- **Form Validation** - Client-side form validation
- **Local Storage** - Theme preference persistence
- **Accessibility** - ARIA labels and keyboard navigation
- **SEO Optimized** - Meta tags and semantic HTML

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fitgym-website.git
   cd fitgym-website
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   ```

3. **Or serve with a local server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## 📁 Project Structure

```
fitgym-website/
├── index.html              # Main HTML file
├── css/
│   ├── style.css           # Main stylesheet
│   └── responsive.css      # Responsive styles
│   └── Animation.css      # Animation.css
|   
├── js/
│   ├── main.js            # Main JavaScript file
│   ├── bmi-calculator.js   # BMI calculator functionality
│   ├── theme-toggle.js     # Dark/light mode toggle
│   └── animations.js       # Scroll animations
├── images/
│   ├── hero-bg.jpg        # Hero background
│   ├── trainers/          # Trainer photos
│   ├── gallery/           # Gallery images
│   └── icons/             # Icon assets
├── fonts/                 # Custom fonts
├── README.md              # This file

```

## Adding
Scroll Progress: 0%
Time on Page: 
Reading Speed: 
Scroll Distance:


## 🎨 Color Scheme

### Light Mode
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#8b5cf6` (Purple)
- **Accent**: `#10b981` (Emerald)
- **Background**: `#f8fafc` (Slate 50)
- **Text**: `#1f2937` (Gray 800)

### Dark Mode
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#8b5cf6` (Purple)
- **Accent**: `#10b981` (Emerald)
- **Background**: `#111827` (Gray 900)
- **Text**: `#f9fafb` (Gray 50)

## 🛠️ Customization

### Changing Colors
Update the CSS custom properties in `:root` and `[data-theme="dark"]`:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --accent-color: #your-color;
    /* ... */
}
```

### Adding New Sections
1. Add HTML structure in `index.html`
2. Style the section in `css/style.css`
3. Add JavaScript functionality in `js/main.js`
4. Update navigation links

### Modifying Animations
Edit keyframes and transitions in the animations section:

```css
@keyframes your-animation {
    from { /* initial state */ }
    to { /* final state */ }
}
```

## 📱 Browser Support

- **Chrome** 60+
- **Firefox** 55+
- **Safari** 12+
- **Edge** 79+
- **Opera** 47+

*Note: Glassmorphism effects require modern browser support for `backdrop-filter`*

## 🔧 Dependencies

This project uses only vanilla HTML, CSS, and JavaScript with the following external resources:

- **Font Awesome** 6.0+ (for icons)
- **Google Fonts** (Poppins font family)
- **No JavaScript frameworks** - Pure vanilla JS

## 📈 Performance Features

- **Optimized Images** - Compressed and properly sized images
- **Efficient CSS** - Minimal and organized stylesheets
- **Lazy Loading** - Images load as needed
- **Minified Assets** - Compressed CSS and JS files
- **Semantic HTML** - Clean, accessible markup

## 🔒 Security Features

- **Form Validation** - Client-side input validation
- **Sanitized Inputs** - XSS protection
- **Secure Headers** - Content Security Policy ready
- **No Inline Scripts** - External JavaScript files only

## 🧪 Testing

### Manual Testing Checklist
- [ ] Responsive design on all screen sizes
- [ ] Dark/light mode toggle functionality
- [ ] Form validation and submission
- [ ] BMI calculator accuracy
- [ ] Navigation and smooth scrolling
- [ ] Cross-browser compatibility
- [ ] Accessibility features

### Automated Testing
```bash
# Run accessibility tests
npm install -g axe-cli
axe http://localhost:8000

# Validate HTML
npm install -g html-validate
html-validate index.html

# Check CSS
npm install -g stylelint
stylelint "css/*.css"
```

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings → Pages
3. Select source branch (main)
4. Site will be available at `https://yourusername.github.io/fitgym-website`

### Netlify
1. Connect GitHub repository
2. Build settings: None (static site)
3. Auto-deploy on push to main

### Vercel
1. Import GitHub repository
2. Framework preset: None
3. Auto-deploy on push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style
- Test on multiple browsers
- Update README if needed
- Add comments for complex code
- Ensure accessibility standards

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration** - Modern fitness website trends
- **Icons** - Font Awesome icon library
- **Fonts** - Google Fonts (Poppins)
- **Images** - Unsplash and Pexels (replace with your own)

## 📞 Support

For support, email support@fitgym.com or create an issue in the GitHub repository.

## 🔄 Changelog

### v1.0.0 (2024-01-01)
- Initial release
- Responsive design implementation
- Dark/light mode toggle
- BMI calculator
- Contact form
- Gallery section

### v1.1.0 (2024-01-15)
- Added testimonials carousel
- Improved mobile navigation
- Enhanced accessibility
- Performance optimizations

## 🛣️ Roadmap

- [ ] Add membership payment integration
- [ ] Implement class booking system
- [ ] Add trainer booking functionality
- [ ] Create member dashboard
- [ ] Add workout tracking features
- [ ] Implement push notifications
- [ ] Add multi-language support

---


**Built with ❤️ for the fitness community...**



