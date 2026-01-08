'use client'

import PageLayout from '@/components/PageLayout'
import CodeBlock from '@/components/CodeBlock'
import { CheckCircle2, AlertTriangle, Code2, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function StorefrontAssignmentPage() {
  const [showSolution, setShowSolution] = useState(false)

  const sectionJsonSolution = `{
  "name": "collection-products",
  "label": "Collection Products Section",
  "props": [
    {
      "type": "text",
      "id": "section_title",
      "label": "Section Title",
      "default": "Featured Products",
      "info": "Heading displayed above the product grid"
    },
    {
      "type": "collection_list",
      "id": "collection",
      "label": "Select Collection",
      "default": "",
      "info": "Choose which collection to display products from"
    },
    {
      "type": "range",
      "id": "products_limit",
      "label": "Number of Products",
      "min": 4,
      "max": 20,
      "step": 2,
      "default": 8,
      "info": "How many products to display"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background Color",
      "default": "#ffffff"
    },
    {
      "type": "text",
      "id": "cta_text",
      "label": "CTA Button Text",
      "default": "View All Products"
    },
    {
      "type": "url",
      "id": "cta_link",
      "label": "CTA Button Link",
      "default": "/collections/all"
    },
    {
      "type": "color",
      "id": "cta_bg_color",
      "label": "CTA Background Color",
      "default": "#000000"
    },
    {
      "type": "color",
      "id": "cta_text_color",
      "label": "CTA Text Color",
      "default": "#ffffff"
    },
    {
      "type": "select",
      "id": "layout",
      "label": "Layout Type",
      "options": [
        { "value": "grid", "text": "Grid (Stack)" },
        { "value": "carousel", "text": "Horizontal Scroll (Carousel)" }
      ],
      "default": "grid"
    },
    {
      "type": "range",
      "id": "grid_columns",
      "label": "Grid Columns (Desktop)",
      "min": 2,
      "max": 4,
      "default": 4,
      "info": "Only applies to grid layout"
    }
  ],
  "blocks": []
}`

  const sectionJsxSolution = `import React, { useState, useEffect } from 'react';
import './collection-products.css';

export default function CollectionProducts({ props, globalConfig }) {
  const {
    section_title,
    collection,
    products_limit,
    background_color,
    cta_text,
    cta_link,
    cta_bg_color,
    cta_text_color,
    layout,
    grid_columns
  } = props;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (collection) {
      fetchCollectionProducts();
    }
  }, [collection]);

  async function fetchCollectionProducts() {
    try {
      setLoading(true);
      
      // Fetch products from Fynd Platform API
      // Assuming you have the Platform Client available
      const response = await fetch(
        \`/api/catalog/products?collection=\${collection}&limit=\${products_limit}\`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data.items || []);
      setError(null);
      
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section 
        className="collection-products"
        style={{ backgroundColor: background_color }}
      >
        <div className="collection-products__container">
          <div className="collection-products__loading">
            Loading products...
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section 
        className="collection-products"
        style={{ backgroundColor: background_color }}
      >
        <div className="collection-products__container">
          <div className="collection-products__error">
            Error: {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="collection-products"
      style={{ backgroundColor: background_color }}
    >
      <div className="collection-products__container">
        {/* Section Title */}
        {section_title && (
          <div className="collection-products__header">
            <h2>{section_title}</h2>
          </div>
        )}

        {/* Products Grid/Carousel */}
        <div 
          className={\`collection-products__\${layout}\`}
          style={{
            gridTemplateColumns: layout === 'grid' 
              ? \`repeat(\${grid_columns}, 1fr)\`
              : undefined
          }}
        >
          {products.map((product) => (
            <div 
              key={product.uid} 
              className="collection-products__item"
            >
              <a href={product.slug}>
                <div className="collection-products__image">
                  <img 
                    src={product.medias?.[0]?.url} 
                    alt={product.name}
                    loading="lazy"
                  />
                </div>
                <div className="collection-products__info">
                  <h3 className="collection-products__name">
                    {product.name}
                  </h3>
                  <div className="collection-products__price">
                    {product.price?.effective?.currency_symbol}
                    {product.price?.effective?.max}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {cta_text && cta_link && (
          <div className="collection-products__cta-wrapper">
            <a
              href={cta_link}
              className="collection-products__cta"
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
}`

  const sectionCssSolution = `.collection-products {
  width: 100%;
  padding: 3rem 0;
}

.collection-products__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.collection-products__header {
  text-align: center;
  margin-bottom: 2rem;
}

.collection-products__header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

/* Grid Layout */
.collection-products__grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* Carousel Layout */
.collection-products__carousel {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}

.collection-products__carousel::-webkit-scrollbar {
  height: 8px;
}

.collection-products__carousel::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.collection-products__carousel::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.collection-products__carousel .collection-products__item {
  flex: 0 0 280px;
  scroll-snap-align: start;
}

/* Product Item */
.collection-products__item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.collection-products__item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.collection-products__item a {
  text-decoration: none;
  color: inherit;
  display: block;
}

.collection-products__image {
  position: relative;
  width: 100%;
  padding-top: 125%; /* 4:5 aspect ratio */
  overflow: hidden;
  background: #f5f5f5;
}

.collection-products__image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.collection-products__item:hover .collection-products__image img {
  transform: scale(1.05);
}

.collection-products__info {
  padding: 1rem;
}

.collection-products__name {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.collection-products__price {
  font-size: 1.125rem;
  font-weight: 700;
  color: #2563eb;
}

/* CTA */
.collection-products__cta-wrapper {
  text-align: center;
  margin-top: 2rem;
}

.collection-products__cta {
  display: inline-block;
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.collection-products__cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Loading & Error States */
.collection-products__loading,
.collection-products__error {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
}

.collection-products__error {
  color: #dc2626;
}

/* Responsive Design */
@media (max-width: 768px) {
  .collection-products__grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 1rem;
  }

  .collection-products__header h2 {
    font-size: 1.75rem;
  }

  .collection-products__carousel .collection-products__item {
    flex: 0 0 220px;
  }
}

@media (max-width: 480px) {
  .collection-products {
    padding: 2rem 0;
  }

  .collection-products__header h2 {
    font-size: 1.5rem;
  }

  .collection-products__carousel .collection-products__item {
    flex: 0 0 180px;
  }
}

/* Accessibility */
.collection-products__item:focus-within {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}`

  const apiIntegrationCode = `// API Integration Architecture

// Option 1: Next.js API Route (Recommended)
// File: pages/api/catalog/products.js

import { PlatformClient, PlatformConfig } from "@gofynd/fdk-client-javascript";

const config = new PlatformConfig({
  companyId: process.env.COMPANY_ID,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

const platformClient = new PlatformClient(config);

export default async function handler(req, res) {
  const { collection, limit = 8 } = req.query;
  
  if (!collection) {
    return res.status(400).json({ error: 'Collection is required' });
  }
  
  try {
    const catalog = platformClient.application(process.env.APPLICATION_ID).catalog;
    
    const products = await catalog.getProductsByCollection({
      slug: collection,
      pageSize: parseInt(limit),
      pageNo: 1
    });
    
    return res.status(200).json({
      success: true,
      items: products.items,
      page: products.page
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch products',
      message: error.message 
    });
  }
}

// Option 2: Direct Client-Side Call (If using Application Client)
// In your component:

import { ApplicationClient } from "@gofynd/fdk-client-javascript";

const applicationClient = new ApplicationClient({
  applicationId: "your-app-id",
  applicationToken: "your-app-token"
});

async function fetchProducts() {
  const catalog = applicationClient.catalog;
  
  const products = await catalog.getProductsByCollection({
    slug: collection,
    pageSize: products_limit
  });
  
  return products;
}`

  return (
    <>
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <div className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Assignment 1 of 2
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Storefront Assignment: Collection Products Section
          </h1>
          <p className="text-xl text-gray-600">
            Build a custom theme section that displays products from a collection with 
            multiple layout options
          </p>
        </div>

        {/* Objective */}
        <section className="mb-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Assignment Objective
          </h2>
          <p className="text-purple-100 mb-4">
            Create a production-ready, customizable section that:
          </p>
          <ul className="space-y-2 text-purple-100">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Accepts a collection as input from the theme editor</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Fetches products from that collection using Fynd Platform API</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Renders products with customizable styling and layout</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Supports both grid and carousel layouts</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Is fully responsive and performant</span>
            </li>
          </ul>
        </section>

        {/* Requirements */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Detailed Requirements
          </h2>

          <div className="space-y-6">
            {/* Requirement 1 */}
            <div className="border-l-4 border-purple-500 pl-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Section Header/Title   {/* (5 points) */}
                </h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Configurable text heading displayed above the products</li>
                <li>• Should have a default value like "Featured Products"</li>
                <li>• Centered alignment with proper spacing</li>
                <li>• Responsive font size (larger on desktop, smaller on mobile)</li>
              </ul>
            </div>

            {/* Requirement 2 */}
            <div className="border-l-4 border-blue-500 pl-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Background Color   {/* (5 points) */}
                </h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Color picker in theme editor to customize section background</li>
                <li>• Default to white (#ffffff)</li>
                <li>• Should apply to the entire section container</li>
                <li>• Ensure text remains readable with any background color chosen</li>
              </ul>
            </div>

            {/* Requirement 3 */}
            <div className="border-l-4 border-green-500 pl-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  CTA Button   {/* (10 points) */}
                </h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• <strong>Button Text:</strong> Configurable text (default: "View All Products")</li>
                <li>• <strong>Button Link:</strong> URL input for where button redirects</li>
                <li>• <strong>Button Background Color:</strong> Color picker for button background</li>
                <li>• <strong>Button Text Color:</strong> Color picker for button text</li>
                <li>• Centered below the product grid</li>
                <li>• Hover effect (e.g., slight elevation or color change)</li>
                <li>• Accessible focus states for keyboard navigation</li>
              </ul>
            </div>

            {/* Requirement 4 */}
            <div className="border-l-4 border-orange-500 pl-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Layout Options   {/* (15 points) */}
                </h3>
              </div>
              
              <div className="space-y-4 mt-3">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">
                    Layout Type 1: Grid (Stack)   {/* - 7 points */}
                  </h4>
                  <ul className="space-y-1 text-sm text-orange-800">
                    <li>• Display products in a responsive grid</li>
                    <li>• Configurable number of columns (2-4 on desktop)</li>
                    <li>• Automatically adjust to 2 columns on tablet, 1-2 on mobile</li>
                    <li>• Equal height cards with consistent spacing</li>
                    <li>• Products wrap to next row when space is filled</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">
                    Layout Type 2: Horizontal Scroll (Carousel)   {/* - 8 points */}
                  </h4>
                  <ul className="space-y-1 text-sm text-orange-800">
                    <li>• Products displayed in a horizontal scrollable row</li>
                    <li>• Smooth scrolling behavior</li>
                    <li>• Visible scrollbar or scroll indicators</li>
                    <li>• Fixed width cards (e.g., 280px each)</li>
                    <li>• Touch-friendly on mobile devices</li>
                    <li>• No wrapping - all products in one scrollable line</li>
                  </ul>
                </div>

                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Both layouts should be selectable via a dropdown in 
                  the theme editor. The component should render differently based on the selection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Requirements */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Technical Requirements
          </h2>

          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                API Integration
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use Fynd Platform APIs to fetch products</li>
                <li>• Handle loading states while fetching data</li>
                <li>• Handle error states if API call fails</li>
                <li>• Implement proper error messages for users</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-4">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Performance Optimization
              </h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Use lazy loading for product images</li>
                <li>• Implement image placeholders/skeletons while loading</li>
                <li>• Minimize unnecessary re-renders</li>
                <li>• Use efficient CSS (avoid expensive properties)</li>
                <li>• Consider caching API responses if applicable</li>
              </ul>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-600 p-4">
              <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Responsive Design
              </h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Test on mobile ( 480px), tablet (480-768px), and desktop ( 768px)</li>
                <li>• Use media queries for different screen sizes</li>
                <li>• Ensure touch-friendly interactions on mobile</li>
                <li>• Maintain readability at all sizes</li>
              </ul>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-4">
              <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Code Quality
              </h4>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Write clean, readable code with meaningful variable names</li>
                <li>• Add comments explaining complex logic</li>
                <li>• Follow React best practices (hooks, component structure)</li>
                <li>• Handle edge cases (no products, invalid collection, etc.)</li>
                <li>• Include proper PropTypes or TypeScript types</li>
              </ul>
            </div>
          </div>
        </section>

        {/* API Integration Guide */}
        {/* <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            API Integration Architecture
          </h2>
          <p className="text-gray-700 mb-6">
            Here's how to structure your API calls to fetch collection products:
          </p>

          <CodeBlock 
            code={apiIntegrationCode}
            language="javascript"
            filename="API Integration Options"
          />

          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-600 p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">💡 Important Notes</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• <strong>Never</strong> expose API keys/secrets in client-side code</li>
              <li>• Use environment variables for sensitive data</li>
              <li>• Implement server-side API routes for Platform API calls</li>
              <li>• Cache responses when appropriate to reduce API calls</li>
            </ul>
          </div>
        </section> */}

        {/* Scoring Rubric */}
        {/* <section className="mb-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Scoring Rubric (Total: 35 points)
          </h2>
          <div className="space-y-3">
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Section Header/Title</h4>
                <span className="text-2xl font-bold">5</span>
              </div>
              <p className="text-sm text-green-100">
                Configurable, properly styled, responsive
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Background Color</h4>
                <span className="text-2xl font-bold">5</span>
              </div>
              <p className="text-sm text-green-100">
                Color picker working, applies correctly
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">CTA Button</h4>
                <span className="text-2xl font-bold">10</span>
              </div>
              <p className="text-sm text-green-100">
                All properties configurable (text, link, colors), proper styling, hover effects
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Layout Options</h4>
                <span className="text-2xl font-bold">15</span>
              </div>
              <p className="text-sm text-green-100">
                Both grid and carousel implemented correctly, responsive, smooth interactions
              </p>
            </div>

            <div className="border-t-2 border-white/30 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Total Score</h3>
                <span className="text-4xl font-bold">35</span>
              </div>
            </div>
          </div>
        </section> */}

        {/* Example Solution */}
        {/* <section className="mb-12 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Example Solution
            </h2>
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
          </div>

          {showSolution && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Important:</strong> Try to complete the assignment on your own first. 
                  Use this solution only as a reference if you're stuck or to compare approaches 
                  after you've attempted it.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  1. Section Configuration (JSON)
                </h3>
                <CodeBlock 
                  code={sectionJsonSolution}
                  language="json"
                  filename="sections/collection-products.json"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  2. React Component (JSX)
                </h3>
                <CodeBlock 
                  code={sectionJsxSolution}
                  language="jsx"
                  filename="sections/collection-products.jsx"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  3. Styles (CSS)
                </h3>
                <CodeBlock 
                  code={sectionCssSolution}
                  language="css"
                  filename="sections/collection-products.css"
                />
              </div>
            </div>
          )}
        </section> */}

        {/* Submission */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Submit?</h3>
          <p className="text-gray-300 mb-6">
            Make sure your code is well-documented, tested, and follows all requirements. 
            Push it to a GitHub repository and share the link with your instructor.
          </p>
          <div className="flex gap-4">
            <a 
              href="/assignments/boltic"
              className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Next: Boltic Assignment →
            </a>
            <a 
              href="/assignments"
              className="inline-block bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
            >
              Back to Assignments
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
    </>
  )
}

