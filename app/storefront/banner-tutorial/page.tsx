'use client'

import PageLayout from '@/components/PageLayout'
import CodeBlock from '@/components/CodeBlock'
import { CheckCircle2, Zap, Palette, Image, MousePointer } from 'lucide-react'

export default function BannerTutorialPage() {
  const sectionJsonCode = `{
  "name": "custom-image-banner",
  "label": "Custom Image Banner",
  "props": [
    {
      "type": "text",
      "id": "section_header",
      "label": "Section Header",
      "default": "Featured Collection",
      "info": "Heading displayed above the banner"
    },
    {
      "type": "image_picker",
      "id": "banner_image",
      "label": "Banner Image",
      "default": "",
      "info": "Recommended size: 1920x600px"
    },
    {
      "type": "text",
      "id": "image_alt",
      "label": "Image Alt Text",
      "default": "Banner image",
      "info": "Accessibility description for the image"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background Color",
      "default": "#f5f5f5",
      "info": "Background color behind the image"
    },
    {
      "type": "text",
      "id": "cta_text",
      "label": "Button Text",
      "default": "Shop Now",
      "info": "Text displayed on the CTA button"
    },
    {
      "type": "url",
      "id": "cta_link",
      "label": "Button Link",
      "default": "/collections/all",
      "info": "Where the button should redirect"
    },
    {
      "type": "color",
      "id": "cta_bg_color",
      "label": "Button Background Color",
      "default": "#000000"
    },
    {
      "type": "color",
      "id": "cta_text_color",
      "label": "Button Text Color",
      "default": "#ffffff"
    },
    {
      "type": "checkbox",
      "id": "show_overlay",
      "label": "Show Dark Overlay",
      "default": false,
      "info": "Add a dark overlay to improve text readability"
    },
    {
      "type": "select",
      "id": "height",
      "label": "Banner Height",
      "options": [
        { "value": "small", "text": "Small (400px)" },
        { "value": "medium", "text": "Medium (600px)" },
        { "value": "large", "text": "Large (800px)" }
      ],
      "default": "medium"
    }
  ],
  "blocks": []
}`

  const sectionJsxCode = `import React from 'react';
import './custom-image-banner.css';

export default function CustomImageBanner({ props, globalConfig }) {
  const {
    section_header,
    banner_image,
    image_alt,
    background_color,
    cta_text,
    cta_link,
    cta_bg_color,
    cta_text_color,
    show_overlay,
    height
  } = props;

  // Map height option to actual pixel values
  const heightMap = {
    small: '400px',
    medium: '600px',
    large: '800px'
  };

  return (
    <section 
      className="custom-image-banner"
      style={{ 
        backgroundColor: background_color,
        minHeight: heightMap[height] || heightMap.medium 
      }}
    >
      {/* Section Header */}
      {section_header && (
        <div className="custom-image-banner__header">
          <h2>{section_header}</h2>
        </div>
      )}

      {/* Banner Container */}
      <div 
        className="custom-image-banner__container"
        style={{ height: heightMap[height] || heightMap.medium }}
      >
        {/* Background Image */}
        {banner_image && (
          <img
            src={banner_image}
            alt={image_alt || 'Banner image'}
            className="custom-image-banner__image"
            loading="lazy"
          />
        )}

        {/* Dark Overlay (optional) */}
        {show_overlay && (
          <div className="custom-image-banner__overlay" />
        )}

        {/* CTA Button */}
        {cta_text && cta_link && (
          <div className="custom-image-banner__cta-wrapper">
            <a
              href={cta_link}
              className="custom-image-banner__cta"
              style={{
                backgroundColor: cta_bg_color,
                color: cta_text_color
              }}
            >
              {cta_text}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
`

  const sectionCssCode = `.custom-image-banner {
  width: 100%;
  position: relative;
  padding: 0;
}

.custom-image-banner__header {
  text-align: center;
  padding: 2rem 1rem 1rem;
}

.custom-image-banner__header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.custom-image-banner__container {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-image-banner__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.custom-image-banner__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.custom-image-banner__cta-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.custom-image-banner__cta {
  display: inline-block;
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.custom-image-banner__cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.custom-image-banner__cta:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .custom-image-banner__header h2 {
    font-size: 1.75rem;
  }

  .custom-image-banner__container {
    min-height: 300px !important;
  }

  .custom-image-banner__cta {
    padding: 0.75rem 2rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .custom-image-banner__header h2 {
    font-size: 1.5rem;
  }

  .custom-image-banner__container {
    min-height: 250px !important;
  }

  .custom-image-banner__cta {
    padding: 0.625rem 1.5rem;
    font-size: 0.875rem;
  }
}

/* Accessibility */
.custom-image-banner__cta:focus {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* Loading state */
.custom-image-banner__image[loading="lazy"] {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}`

  const editorConfigCode = `{
  "name": "custom-image-banner",
  "label": "Custom Image Banner",
  "category": "content",
  "preview": {
    "thumbnail": "https://example.com/banner-preview.jpg",
    "description": "A customizable image banner with heading and CTA button"
  },
  "enabled": true,
  "max_instances": 5
}`

  const usageExample = `// In your page template (e.g., templates/index.jsx)
import CustomImageBanner from '../sections/custom-image-banner';

export default function HomePage({ sections }) {
  return (
    <div className="homepage">
      {/* Header */}
      <Header />
      
      {/* Custom Image Banner Section */}
      <CustomImageBanner 
        props={{
          section_header: "Summer Collection 2024",
          banner_image: "https://cdn.example.com/summer-banner.jpg",
          image_alt: "Summer fashion collection banner",
          background_color: "#f8f9fa",
          cta_text: "Explore Collection",
          cta_link: "/collections/summer-2024",
          cta_bg_color: "#ff6b6b",
          cta_text_color: "#ffffff",
          show_overlay: true,
          height: "large"
        }}
        globalConfig={globalConfig}
      />
      
      {/* Other sections */}
      <ProductGrid />
      <Footer />
    </div>
  );
}`

  const performanceTips = `// 1. Image Optimization
// Use appropriate image formats (WebP with fallback)
// Implement responsive images with srcset
<img
  src={banner_image}
  srcSet={\`
    \${banner_image}?w=640 640w,
    \${banner_image}?w=1280 1280w,
    \${banner_image}?w=1920 1920w
  \`}
  sizes="100vw"
  alt={image_alt}
  loading="lazy"
  decoding="async"
/>

// 2. CSS Optimization
// Use CSS containment for better rendering performance
.custom-image-banner {
  contain: layout style paint;
}

// 3. Lazy Loading
// Let browser handle lazy loading for below-fold images
// Use eager loading for above-fold hero banners
<img loading={isAboveFold ? "eager" : "lazy"} />

// 4. Prefetch Critical Resources
// In your page head, prefetch the banner image
<link rel="prefetch" href={banner_image} as="image" />

// 5. Use CSS transforms for animations (GPU accelerated)
// Avoid animating width, height, or top/left
.custom-image-banner__cta:hover {
  transform: translateY(-2px); // ✅ Good
  /* top: -2px; ❌ Avoid */
}`

  return (
    <>
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Hands-On Tutorial
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Build a Custom Image Banner Section
          </h1>
          <p className="text-xl text-gray-600">
            Step-by-step guide to creating a production-ready, customizable banner section
          </p>
        </div>

        {/* What We're Building */}
        <section className="mb-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            What We're Building
          </h2>
          <p className="text-blue-100 mb-6">
            A fully customizable image banner section with the following features:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Section Header</h4>
                <p className="text-sm text-blue-100">Customizable text heading above the banner</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Banner Image</h4>
                <p className="text-sm text-blue-100">Upload and display a responsive image</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Background Color</h4>
                <p className="text-sm text-blue-100">Customizable background behind the image</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">CTA Button</h4>
                <p className="text-sm text-blue-100">Customizable button with text, link, and colors</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Height Options</h4>
                <p className="text-sm text-blue-100">Choose between small, medium, or large</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Dark Overlay</h4>
                <p className="text-sm text-blue-100">Optional overlay for better text contrast</p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 1: Section Configuration */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Create Section Configuration
            </h2>
          </div>

          <p className="text-gray-700 mb-4">
            First, we define the section's settings schema. This JSON file tells Fynd what 
            customization options should appear in the theme editor.
          </p>

          <CodeBlock 
            code={sectionJsonCode}
            language="json"
            filename="sections/custom-image-banner.jsx"
          />

          <div className="mt-6 space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Key Points</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Each property has a unique <code>id</code> that you'll use in your component</li>
                <li>• The <code>label</code> is what merchants see in the theme editor</li>
                <li>• Always provide <code>default</code> values so sections look good out of the box</li>
                <li>• Use <code>info</code> to add helpful tooltips for merchants</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-4">
              <h4 className="font-semibold text-green-900 mb-2">✅ Best Practices</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Use semantic names (section_header, not text1)</li>
                <li>• Group related settings together</li>
                <li>• Choose appropriate input types (color picker for colors, not text)</li>
                <li>• Provide sensible defaults based on common use cases</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step 2: Build Component */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Build the React Component
            </h2>
          </div>

          <p className="text-gray-700 mb-4">
            Now we create the actual component that renders the banner using the settings 
            from the theme editor.
          </p>

          <CodeBlock 
            code={sectionJsxCode}
            language="jsx"
            filename="sections/custom-image-banner.jsx"
          />

          <div className="mt-6 space-y-4">
            <div className="bg-purple-50 border-l-4 border-purple-600 p-4">
              <h4 className="font-semibold text-purple-900 mb-2">🎯 How It Works</h4>
              <ol className="text-sm text-purple-800 space-y-2">
                <li><strong>1. Props destructuring:</strong> Extract all settings from props object</li>
                <li><strong>2. Height mapping:</strong> Convert height option to actual CSS value</li>
                <li><strong>3. Conditional rendering:</strong> Only show elements if they have values</li>
                <li><strong>4. Inline styles:</strong> Apply customizable colors dynamically</li>
                <li><strong>5. Accessibility:</strong> Include alt text, proper semantic HTML</li>
              </ol>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-4">
              <h4 className="font-semibold text-orange-900 mb-2">⚠️ Important Notes</h4>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Always check if values exist before rendering (prevent empty divs)</li>
                <li>• Use <code>loading="lazy"</code> for images below the fold</li>
                <li>• Provide fallback values (e.g., <code>height || 'medium'</code>)</li>
                <li>• Keep component logic simple—complex logic belongs in utils</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step 3: Add Styles */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Add Responsive Styles
            </h2>
          </div>

          <p className="text-gray-700 mb-4">
            Create a CSS file with responsive styles, smooth transitions, and accessibility support.
          </p>

          <CodeBlock 
            code={sectionCssCode}
            language="css"
            filename="sections/custom-image-banner.css"
          />

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Responsive
              </h4>
              <p className="text-sm text-blue-800">
                Media queries adjust layout for mobile, tablet, and desktop screens.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Smooth Transitions
              </h4>
              <p className="text-sm text-green-800">
                Hover effects and animations use GPU-accelerated transforms.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                <MousePointer className="w-4 h-4" />
                Accessible
              </h4>
              <p className="text-sm text-purple-800">
                Focus states, semantic HTML, and proper contrast ratios.
              </p>
            </div>
          </div>
        </section>

        {/* Step 4: Theme Editor Config */}
        {/* <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              4
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Configure Theme Editor Display
            </h2>
          </div>

          <p className="text-gray-700 mb-4">
            Optionally, create a configuration file to control how your section appears in the 
            theme editor sidebar.
          </p>

          <CodeBlock 
            code={editorConfigCode}
            language="json"
            filename="config/sections/custom-image-banner.json"
          />
        </section> */}

        {/* Step 5: Usage */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              4
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Use in Page Templates
            </h2>
          </div>

          <p className="text-gray-700 mb-4">
            Import and use your section in page templates. The props can come from the theme 
            editor or be hardcoded for testing.
          </p>

          <CodeBlock 
            code={usageExample}
            language="jsx"
            filename="templates/index.jsx"
          />
        </section>

        {/* Performance Optimization */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-yellow-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Performance Best Practices
            </h2>
          </div>

          <p className="text-gray-700 mb-4">
            Optimize your section for fast loading and smooth rendering:
          </p>

          <CodeBlock 
            code={performanceTips}
            language="javascript"
            filename="Performance Optimization Tips"
          />

          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">⚡ Performance Checklist</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>✅ Use lazy loading for below-fold images</li>
              <li>✅ Implement responsive images with srcset</li>
              <li>✅ Use CSS transforms for animations (not top/left)</li>
              <li>✅ Minimize JavaScript—prefer CSS for visual effects</li>
              <li>✅ Use modern image formats (WebP with fallback)</li>
              <li>✅ Add loading states for better perceived performance</li>
            </ul>
          </div>
        </section>

        {/* Testing Checklist */}
        <section className="mb-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Testing Checklist
          </h2>
          <p className="text-green-100 mb-6">
            Before deploying, verify your section works in all scenarios:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Functionality</h4>
              <ul className="text-sm space-y-1">
                <li>• Image displays correctly</li>
                <li>• CTA button links work</li>
                <li>• Height options change size</li>
                <li>• Overlay toggles on/off</li>
                <li>• Colors apply properly</li>
              </ul>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Responsive Design</h4>
              <ul className="text-sm space-y-1">
                <li>• Mobile (480px)</li>
                <li>• Tablet (480px - 768px)</li>
                <li>• Desktop ( 768px)</li>
                <li>• Large screens ( 1920px)</li>
              </ul>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Accessibility</h4>
              <ul className="text-sm space-y-1">
                <li>• Image alt text present</li>
                <li>• Keyboard navigation works</li>
                <li>• Focus states visible</li>
                <li>• Color contrast meets WCAG</li>
                <li>• Screen reader friendly</li>
              </ul>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Edge Cases</h4>
              <ul className="text-sm space-y-1">
                <li>• No image provided</li>
                <li>• Very long text</li>
                <li>• Missing CTA link</li>
                <li>• All defaults used</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">🎉 Congratulations!</h3>
          <p className="text-purple-100 mb-6">
            You've built a production-ready custom section. Now you're ready to tackle more 
            complex components and complete the assignments!
          </p>
          <div className="flex gap-4">
            <a 
              href="/platform-api"
              className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition"
            >
              Learn Platform APIs →
            </a>
            <a 
              href="/assignments/storefront"
              className="inline-block bg-purple-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-900 transition"
            >
              Try Assignment →
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
    </>
  )
}

