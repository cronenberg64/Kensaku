# Kensaku Platform

A modern web platform built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [Radix UI](https://www.radix-ui.com/). 

## Features
- Next.js 13+ with App Router
- Tailwind CSS for rapid UI development
- Radix UI for accessible, composable components
- TypeScript support
- Ready for static export (`next export`)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
```bash
npm install
# or
yarn install
```

### Development
Start the development server:
```bash
npm run dev
# or
yarn dev
```

### Building for Production
Build the project for static export:
```bash
npm run build
npm run export
# or
yarn build
yarn export
```
The static site will be output to the `out` directory.

### Deployment
You can deploy the contents of the `out` directory to any static hosting provider. For Netlify:
- **Build command:** `npm run build && npm run export`
- **Publish directory:** `out`

### License
This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details. 