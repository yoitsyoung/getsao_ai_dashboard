# TechBehemoths AI Dashboard

A modern web application for managing and analyzing prompts for TechBehemoths products. Built with React, TypeScript, and Vite, featuring a clean and intuitive user interface with Tailwind CSS.

## Features

- Prompt management system
- Batch upload functionality
- Paginated prompt listing
- Responsive design
- Modern UI components
- React Router integration

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/getsao_ai_dashboard.git
cd getsao_ai_dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (Vite's default port).

## Project Structure

```
src/
├── components/         # React components
│   ├── ui/            # UI components
│   └── PromptsTable.tsx  # Main prompts management component
├── context/           # React context providers
├── data/             # Data and mock files
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React Icons
- React Router DOM
- ESLint

## Development

This project uses:
- Vite for fast development and building
- ESLint for code linting
- TypeScript for type safety
- Tailwind CSS for styling
- PostCSS for CSS processing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.