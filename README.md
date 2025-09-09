# Deals.uz - Uzbekistan Marketplace

A modern, multilingual marketplace platform for buying and selling goods in Uzbekistan. Built with Next.js 15, TypeScript, and featuring comprehensive internationalization support.

## 🚀 Features

### Core Functionality
- **Multilingual Support** - English, Uzbek (Cyrillic & Latin), and Russian
- **Product Marketplace** - Browse, search, and list items
- **User Authentication** - Secure login and registration system
- **Advanced Search** - Filter by category, price, location, and more
- **Responsive Design** - Works seamlessly on desktop and mobile

### Pages & Components
- **Homepage/Marketplace** - Featured listings and category navigation
- **Browse** - Advanced product search and filtering
- **Post Listing** - Create and manage product listings
- **User Profiles** - Personal account management
- **Legal Pages** - Privacy Policy, Terms of Service, Cookie Policy
- **Support** - Help Center, Contact Us, Safety Tips

### Technical Features
- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety
- **Internationalization (i18n)** with dynamic locale routing
- **SEO Optimized** with proper meta tags and structure
- **Component-Based Architecture** with reusable UI components

## 🛠️ Technology Stack

- **Frontend Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** CSS-in-JS (Inline Styles)
- **Internationalization:** Custom i18n implementation
- **Development Tools:** Turbopack, ESLint

## 🏗️ Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/deals-uz.git
cd deals-uz
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Project Structure

```
deals-uz/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Internationalized routes
│   │   │   ├── marketplace/   # Main marketplace page
│   │   │   ├── browse/        # Product browsing
│   │   │   ├── post/          # Create listings
│   │   │   ├── privacy/       # Privacy policy
│   │   │   ├── terms/         # Terms of service
│   │   │   ├── help/          # Help center
│   │   │   ├── contact/       # Contact information
│   │   │   ├── safety/        # Safety guidelines
│   │   │   └── cookies/       # Cookie policy
│   │   ├── api/               # API routes
│   │   ├── components/        # Shared components
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── Header.tsx         # Site header
│   │   └── Footer.tsx         # Site footer
│   └── i18n.ts               # Internationalization config
├── public/                    # Static assets
└── package.json
```

## 🌍 Internationalization

The platform supports three languages:
- **English (en)** - Primary language
- **Uzbek (uz)** - Local language with Cyrillic script support
- **Russian (ru)** - Regional language

Routes are automatically localized: `/en/marketplace`, `/uz/marketplace`, `/ru/marketplace`

## 📄 Legal & Compliance

Complete legal framework included:
- **Privacy Policy** - GDPR-compliant data protection information
- **Terms of Service** - Comprehensive user agreement
- **Cookie Policy** - Detailed cookie usage and consent management
- **Safety Guidelines** - Security best practices for users

## 🚀 Deployment

### Vercel (Recommended)
The easiest way to deploy is using [Vercel](https://vercel.com/new):

```bash
npm run build
```

### Other Platforms
The application can be deployed to any platform supporting Node.js:
- Netlify
- Railway
- Digital Ocean
- AWS
- Azure

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Website:** [deals.uz](https://deals.uz)
- **Email:** info@deals.uz
- **Support:** help@deals.uz

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Inspired by modern marketplace platforms
- Designed for the Uzbekistan market
