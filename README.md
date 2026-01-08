# Fynd Developer Onboarding Portal

A comprehensive, production-ready web application for training interns on the Fynd Commerce Platform. This interactive portal covers everything from storefront development with FDK to Platform APIs and Boltic workflow automation.

## 🎯 Purpose

This portal is designed for **live hands-on training sessions** and **self-paced learning**, providing:

- **Interactive tutorials** with step-by-step guidance
- **Comprehensive explanations** of Fynd architecture and components
- **Production-ready code examples** for all major features
- **Detailed assignments** with scoring rubrics
- **Complete reference solutions** for learning

## 🚀 Features

### 1. Landing Page
- Overview of Fynd ecosystem
- Learning path visualization
- Quick access to all sections

### 2. Platform Overview
- Fynd architecture explanation
- Component breakdown (Storefront, APIs, Boltic)
- Real-world data flow examples
- Visual diagrams

### 3. Storefront Development (FDK)
- Theme structure and architecture
- Sections, blocks, and settings
- Theme editor integration
- **Hands-on Tutorial**: Build a custom image banner section
- Best practices for performance and accessibility

### 4. Platform REST APIs
- Authentication with OAuth 2.0
- SDK vs Direct REST API usage
- Complete API examples for:
  - Catalog (Products, Collections)
  - Users (Profiles, Addresses)
  - Inventory Management
  - Orders
- Error handling patterns

### 5. Boltic Workflows
- Workflow automation concepts
- Event listeners and webhooks
- **Hands-on Tutorial**: User creation workflow
- Data validation and transformation
- Error handling and retry logic
- Third-party integrations (Slack)

### 6. Assignments (with Scoring Rubrics)

#### Assignment 1: Storefront (35 points)
Build a custom collection products section with:
- Section header/title (5 pts)
- Background color customization (5 pts)
- CTA button with full customization (10 pts)
- Layout options: Grid and Carousel (15 pts)

#### Assignment 2: Boltic Workflow (40 + 10 bonus points)
Create an inventory sync workflow with:
- Event listener setup (10 pts)
- Payload validation (5 pts)
- Error handling (5 pts)
- Inventory update via Platform API (10 pts)
- Database logging & status tracking (10 pts)
- **Bonus**: Slack integration (+10 pts)

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **React Syntax Highlighter** - Code block highlighting

### Features
- Server-side rendering (SSR)
- Responsive design (mobile-first)
- Copy-to-clipboard code blocks
- Syntax highlighting for multiple languages
- Collapsible example solutions
- Clean, modern UI

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd "fynd day"
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
fynd-day/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Global styles
│   ├── overview/                # Fynd overview section
│   ├── storefront/              # Storefront tutorials
│   │   └── banner-tutorial/     # Banner section hands-on
│   ├── platform-api/            # Platform API guide
│   ├── boltic/                  # Boltic workflow guide
│   └── assignments/             # Assignment pages
│       ├── page.tsx             # All assignments overview
│       ├── storefront/          # Storefront assignment
│       └── boltic/              # Boltic assignment
├── components/                   # Reusable components
│   ├── Navbar.tsx               # Navigation bar
│   ├── Sidebar.tsx              # Side navigation
│   ├── PageLayout.tsx           # Page wrapper
│   └── CodeBlock.tsx            # Syntax-highlighted code
├── public/                      # Static assets
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## 🎓 Learning Path

We recommend following this sequence:

1. **Start**: Read the Platform Overview
2. **Learn**: Go through Storefront/FDK concepts
3. **Practice**: Complete the Banner Section Tutorial
4. **Learn**: Study Platform REST APIs
5. **Practice**: Complete the Boltic Workflow Tutorial
6. **Apply**: Attempt Assignment 1 (Storefront)
7. **Apply**: Attempt Assignment 2 (Boltic)

## 📚 Content Overview

### Tutorials Include:
- **What and Why**: Conceptual explanations
- **How**: Step-by-step implementation guides
- **Code Examples**: Production-ready, commented code
- **Best Practices**: Performance, accessibility, error handling
- **Testing**: How to test your implementations

### Assignments Include:
- **Detailed Requirements**: Clear, numbered requirements
- **Scoring Rubrics**: Transparent evaluation criteria
- **Technical Specifications**: API usage, data validation
- **Example Solutions**: Reference implementations (collapsible)
- **Testing Guidelines**: Comprehensive test scenarios

## 🎨 UI Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Code Highlighting**: Syntax highlighting for 10+ languages
- **Copy to Clipboard**: One-click code copying
- **Clean Navigation**: Sidebar + top navbar for easy access
- **Color-Coded Sections**: Visual distinction between topics
- **Collapsible Solutions**: Reveal answers when ready

## 🔧 Customization

### Changing Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      fynd: {
        primary: '#your-color',
        secondary: '#your-color',
      }
    }
  }
}
```

### Adding New Sections
1. Create a new folder in `app/`
2. Add `page.tsx` with your content
3. Update navigation in `components/Sidebar.tsx`
4. Add links in `components/Navbar.tsx`

## 📝 Code Examples Language Support

The portal includes syntax highlighting for:
- JavaScript / TypeScript
- JSX / TSX (React)
- JSON
- CSS / SCSS
- HTML
- Bash / Shell
- SQL
- Python
- And more...

## 🚢 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms
The app is a standard Next.js application and can be deployed to:
- Vercel
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Any Node.js hosting

## 🤝 Contributing

This is an internal training portal. If you're an instructor or developer who wants to improve it:

1. Add new tutorials in the appropriate section
2. Update assignments with more realistic scenarios
3. Add more code examples
4. Improve explanations based on intern feedback

## 📄 License

Internal training material for Fynd Commerce Platform.

## 🆘 Support

For questions or issues:
- Check the tutorial content thoroughly
- Review example solutions
- Refer to official Fynd documentation
- Ask your training instructor

## ✅ Checklist for Interns

- [ ] Complete Platform Overview reading
- [ ] Finish Storefront/FDK tutorial
- [ ] Build the Banner Section (hands-on)
- [ ] Complete Platform API tutorial
- [ ] Build the User Creation Workflow (hands-on)
- [ ] Submit Assignment 1: Storefront
- [ ] Submit Assignment 2: Boltic
- [ ] Review all best practices
- [ ] Test your code thoroughly

## 🎉 What's Next?

After completing this onboarding:
- You'll understand Fynd's architecture
- You'll be able to build custom storefronts
- You'll know how to use Platform APIs
- You'll be able to create automation workflows
- You'll be ready to contribute to real projects!

---

**Built with ❤️ for Fynd Developer Training**

Last Updated: January 2026

