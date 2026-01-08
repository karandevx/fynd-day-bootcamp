'use client'

import PageLayout from '@/components/PageLayout'
import CodeBlock from '@/components/CodeBlock'
import { 
  FolderTree, 
  Settings, 
  Layout, 
  Layers,
  Eye,
  Code2
} from 'lucide-react'

export default function StorefrontPage() {
  const themeStructure = `my-theme/
├── config/
│   ├── settings_data.json      # Global theme settings
│   └── settings_schema.json    # Settings definition
├── sections/
│   ├── header.js             # Header section 
│   ├── footer.js             # Footer section 
│   ├── hero-banner.js        # Custom hero banner
│   └── product-grid.js       # Product listing
├── templates/
│   ├── index.jsx               # Homepage template
│   ├── product.jsx             # Product detail page
│   ├── collection.jsx          # Collection listing
│   └── cart.jsx                # Shopping cart
├── assets/
│   ├── styles/
│   │   └── main.css           # Global styles
│   ├── images/
│   └── scripts/
├── public/
│   └── static assets
└── theme.jsx                  # Theme metadata`

  const sectionJsonExample = `{
  "name": "hero-banner",
  "label": "Hero Banner",
  "props": [
    {
      "type": "image_picker",
      "id": "background_image",
      "label": "Background Image",
      "default": ""
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Welcome to Our Store"
    },
    {
      "type": "textarea",
      "id": "description",
      "label": "Description",
      "default": "Discover amazing products"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background Color",
      "default": "#ffffff"
    },
    {
      "type": "url",
      "id": "cta_link",
      "label": "Button Link",
      "default": "/collections/all"
    },
    {
      "type": "text",
      "id": "cta_text",
      "label": "Button Text",
      "default": "Shop Now"
    }
  ],
  "blocks": []
}`

  const sectionJsxExample = `import React from 'react';
import './hero-banner.css';

export default function HeroBanner({ props, globalConfig }) {
  const {
    background_image,
    heading,
    description,
    background_color,
    cta_link,
    cta_text
  } = props;

  return (
    <section 
      className="hero-banner"
      style={{ backgroundColor: background_color }}
    >
      {background_image && (
        <div 
          className="hero-banner__background"
          style={{ backgroundImage: \`url(\${background_image})\` }}
        />
      )}
      
      <div className="hero-banner__content">
        <h1 className="hero-banner__heading">
          {heading}
        </h1>
        
        <p className="hero-banner__description">
          {description}
        </p>
        
        {cta_link && cta_text && (
          <a 
            href={cta_link} 
            className="hero-banner__cta"
          >
            {cta_text}
          </a>
        )}
      </div>
    </section>
  );
}`

  const blocksExample = `{
  "name": "testimonials",
  "label": "Testimonials Section",
  "props": [
    {
      "type": "text",
      "id": "section_heading",
      "label": "Section Heading",
      "default": "What Our Customers Say"
    }
  ],
  "blocks": [
    {
      "type": "testimonial",
      "name": "Testimonial",
      "props": [
        {
          "type": "text",
          "id": "customer_name",
          "label": "Customer Name"
        },
        {
          "type": "textarea",
          "id": "testimonial_text",
          "label": "Testimonial"
        },
        {
          "type": "range",
          "id": "rating",
          "label": "Rating",
          "min": 1,
          "max": 5,
          "default": 5
        }
      ]
    }
  ]
}`

  const themeEditorFlow = `1. Developer creates section with settings (JSON schema)
2. Section is deployed to Fynd platform
3. Merchant logs into Fynd admin panel
4. Opens Theme Editor (visual interface)
5. Selects section from sidebar
6. Configures settings using UI controls:
   - Text inputs for headings
   - Color pickers for colors
   - Image uploaders for images
   - Toggles for show/hide options
7. Changes reflect in real-time preview
8. Merchant saves and publishes changes
9. Changes go live on storefront immediately`

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Storefront Development with FDK
          </h1>
          <p className="text-xl text-gray-600">
            Learn how to build custom themes and sections for Fynd storefronts
          </p>
        </div>

        {/* What is FDK */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What is FDK?
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            The <strong>Fynd Development Kit (FDK)</strong> is a comprehensive framework for building 
            modern e-commerce storefronts. Unlike traditional template-based systems, FDK uses a 
            <strong> component-driven architecture</strong> that gives you complete control over 
            your storefront's design and functionality.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            FDK is built on <strong>React</strong> (or Vue.js) and follows modern web development 
            best practices. It provides:
          </p>
          <ul className="space-y-2 text-gray-700 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span><strong>Theme system:</strong> Organize your storefront into reusable themes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span><strong>Section architecture:</strong> Build modular, configurable components</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span><strong>Visual editor integration:</strong> Let merchants customize without code</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span><strong>API integration:</strong> Seamless connection to Fynd Platform APIs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span><strong>SSR support:</strong> Server-side rendering for better SEO and performance</span>
            </li>
          </ul>

          <div className="bg-purple-50 border-l-4 border-purple-600 p-4">
            <h4 className="font-semibold text-purple-900 mb-2">Key Principle</h4>
            <p className="text-purple-800 text-sm">
              FDK separates <strong>structure</strong> (code) from <strong>content</strong> (settings). 
              Developers build flexible components, merchants configure them via a visual interface. 
              This empowers both technical and non-technical users.
            </p>
          </div>
        </section>

        {/* Theme Structure */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FolderTree className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Theme Structure
            </h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            A Fynd theme follows a specific folder structure. Here's what a typical theme looks like:
          </p>

          <CodeBlock 
            code={themeStructure}
            language="bash"
            filename="Theme Folder Structure"
          />

          <div className="mt-6 space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-1">📁 config/</h4>
              <p className="text-sm text-gray-700">
                Contains theme-wide settings and their schemas. <code>settings_data.json</code> holds 
                actual values, <code>settings_schema.json</code> defines what settings are available.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-1">📁 sections/</h4>
              <p className="text-sm text-gray-700">
                Your reusable components. Each section has a JSON file defining its settings and 
                a corresponding JSX file with the React component code.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-1">📁 templates/</h4>
              <p className="text-sm text-gray-700">
                Page templates that combine multiple sections. Each page type (homepage, product page, 
                collection page) has its own template.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-1">📁 assets/</h4>
              <p className="text-sm text-gray-700">
                Static files like CSS, JavaScript, and images used across your theme.
              </p>
            </div>
          </div>
        </section>

        {/* Sections Explained */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Layout className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Understanding Sections
            </h2>
          </div>

          <p className="text-gray-700 mb-6">
            <strong>Sections</strong> are the building blocks of your storefront. Think of them as 
            configurable components that can be:
          </p>

          <ul className="space-y-2 text-gray-700 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Added, removed, or reordered on any page</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Customized through the theme editor (no code required)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Reused across multiple pages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Responsive and accessible out of the box</span>
            </li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Anatomy of a Section
          </h3>
          <p className="text-gray-700 mb-4">
            Every section consists of <strong>two files</strong>:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">1. Configuration (JSON)</h4>
              <p className="text-sm text-blue-800">
                Defines the section's name, label, and configurable properties (settings). 
                This is what powers the theme editor interface.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">2. Component (JSX/Vue)</h4>
              <p className="text-sm text-green-800">
                The actual React/Vue component that renders the section using the settings 
                configured in the theme editor.
              </p>
            </div>
          </div>

          <h4 className="font-semibold text-gray-900 mb-3">Example: Hero Banner Section</h4>
          <p className="text-gray-700 mb-3">
            Let's create a hero banner section with customizable heading, description, and CTA button.
          </p>

          <h5 className="font-semibold text-gray-900 mb-2">Step 1: Define Settings (JSX)</h5>
          <CodeBlock 
            code={sectionJsonExample}
            language="json"
            filename="sections/hero-banner.jsx"
          />

          <div className="my-6 bg-gray-50 p-4 rounded-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Property Types Available:</h5>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
              <div><code className="text-purple-600">text</code> - Single line text input</div>
              <div><code className="text-purple-600">textarea</code> - Multi-line text</div>
              <div><code className="text-purple-600">image_picker</code> - Image upload</div>
              <div><code className="text-purple-600">color</code> - Color picker</div>
              <div><code className="text-purple-600">url</code> - URL input</div>
              <div><code className="text-purple-600">range</code> - Slider (min/max)</div>
              <div><code className="text-purple-600">checkbox</code> - Boolean toggle</div>
              <div><code className="text-purple-600">select</code> - Dropdown options</div>
            </div>
          </div>

          <h5 className="font-semibold text-gray-900 mb-2">Step 2: Build Component (JSX)</h5>
          <CodeBlock 
            code={sectionJsxExample}
            language="jsx"
            filename="sections/hero-banner.jsx"
          />

          <div className="mt-4 bg-green-50 border-l-4 border-green-600 p-4">
            <p className="text-sm text-green-900">
              <strong>How it works:</strong> The <code>props</code> parameter contains all the 
              values configured in the theme editor. When a merchant changes the heading text, 
              it automatically updates the <code>props.heading</code> value and re-renders the component.
            </p>
          </div>
        </section>

        {/* Blocks */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Blocks: Repeating Content
            </h2>
          </div>

          <p className="text-gray-700 mb-6">
            <strong>Blocks</strong> allow merchants to add repeating instances of content within a section. 
            For example, a testimonials section might have multiple testimonial blocks, each with its 
            own customer name, text, and rating.
          </p>

          <h4 className="font-semibold text-gray-900 mb-3">Example: Testimonials with Blocks</h4>
          <CodeBlock 
            code={blocksExample}
            language="json"
            filename="sections/testimonials.jsx"
          />

          <div className="mt-4 bg-purple-50 p-4 rounded-lg">
            <h5 className="font-semibold text-purple-900 mb-2">How merchants use blocks:</h5>
            <ol className="space-y-2 text-sm text-purple-800">
              <li>1. Add the testimonials section to a page</li>
              <li>2. Click "Add testimonial" button in theme editor</li>
              <li>3. Fill in customer name, testimonial text, and rating</li>
              <li>4. Repeat to add more testimonials</li>
              <li>5. Reorder or delete testimonials as needed</li>
            </ol>
          </div>
        </section>

        {/* Theme Editor */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Theme Editor Integration
            </h2>
          </div>

          <p className="text-gray-700 mb-6">
            The Fynd Theme Editor is a visual interface that allows merchants to customize their 
            storefront without writing code. As a developer, you define the settings schema, and 
            Fynd automatically generates the UI controls.
          </p>

          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-6 mb-6">
            <h4 className="font-bold text-lg mb-3">Merchant Workflow:</h4>
            <pre className="text-sm whitespace-pre-wrap font-mono bg-black/20 p-4 rounded">
{themeEditorFlow}
            </pre>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">🎨 Visual Customization</h4>
              <p className="text-sm text-blue-800 mb-2">
                Merchants see a live preview of their storefront and can:
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Upload images</li>
                <li>• Change colors</li>
                <li>• Edit text content</li>
                <li>• Adjust spacing/sizing</li>
                <li>• Toggle features on/off</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">⚡ Real-Time Updates</h4>
              <p className="text-sm text-green-800 mb-2">
                Changes appear instantly in the preview pane:
              </p>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• No page refresh needed</li>
                <li>• See results immediately</li>
                <li>• Undo/redo support</li>
                <li>• Save drafts before publishing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-gray-900" />
            </div>
            <h2 className="text-3xl font-bold">
              Best Practices
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Keep Sections Focused</h4>
              <p className="text-sm text-gray-300">
                Each section should do one thing well. Don't create monolithic sections 
                that try to do everything.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Use Semantic Settings</h4>
              <p className="text-sm text-gray-300">
                Give settings clear, descriptive labels. Use appropriate input types 
                (color picker for colors, not text input).
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Provide Sensible Defaults</h4>
              <p className="text-sm text-gray-300">
                Every setting should have a default value so sections look good 
                even without customization.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Make It Responsive</h4>
              <p className="text-sm text-gray-300">
                Test on mobile, tablet, and desktop. Use CSS Grid/Flexbox for 
                flexible layouts.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Optimize Performance</h4>
              <p className="text-sm text-gray-300">
                Lazy load images, minimize JavaScript, use CSS for animations 
                when possible.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Document Your Sections</h4>
              <p className="text-sm text-gray-300">
                Add comments explaining what each setting does and any special 
                considerations.
              </p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Build Your First Section?</h3>
          <p className="text-purple-100 mb-6">
            Let's put this knowledge into practice with a hands-on tutorial!
          </p>
          <a 
            href="/storefront/banner-tutorial"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition"
          >
            Start Banner Section Tutorial →
          </a>
        </div>
      </div>
    </PageLayout>
  )
}

