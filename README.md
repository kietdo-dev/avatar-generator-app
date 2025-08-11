# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Avatar Generator App

A React web application with a customizable avatar generator featuring different facial features. Users can choose various styles for eyes, nose, mouth, and other facial elements, with each option changing CSS classes to update the avatar's appearance in real-time.

## Features

- 🎨 **Customizable Avatar Creation**: Mix and match different facial features
- 👁️ **Multiple Eye Styles**: Choose from normal, small, large, or squinted eyes
- 👃 **Various Nose Options**: Select between small, large, button, or pointed nose styles
- 👄 **Different Mouth Types**: Pick from smile, frown, open, or small mouth variations
- 🎨 **Hair Varieties**: Multiple hairstyles including short, long, curly, and bald options
- 🌈 **Face Shape Options**: Round, square, oval, or heart-shaped faces
- ⚡ **Real-time Preview**: Instant visual feedback as you customize features
- 🎯 **Responsive Design**: Works seamlessly across different screen sizes

## Tech Stack

- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **CSS3** with custom properties for dynamic styling
- **ESLint** for code quality

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kietdo-dev/avatar-generator-app.git
cd avatar-generator-app
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Select Features**: Use the control panel on the left to choose different styles for each facial feature
2. **Preview Avatar**: The avatar updates in real-time as you make selections
3. **Mix and Match**: Experiment with different combinations to create unique avatars

## Project Structure

```
src/
├── components/
│   ├── AvatarGenerator.tsx    # Main avatar generator component
│   └── AvatarGenerator.css    # Comprehensive styling for all avatar features
├── App.tsx                    # Application entry point
├── App.css                    # Global application styles
└── main.tsx                   # React app initialization
```

## Customization

### Adding New Features

1. **Add CSS Classes**: Define new styles in `AvatarGenerator.css`
2. **Update State**: Add new feature options to the component state
3. **Create Controls**: Add new selection buttons to the control panel

### Styling

The avatar uses CSS classes with a modular approach:
- `.avatar-face-{shape}` for face shapes
- `.avatar-eyes-{style}` for eye variations
- `.avatar-nose-{style}` for nose types
- `.avatar-mouth-{style}` for mouth styles
- `.avatar-hair-{style}` for hairstyles

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) and update the config

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
