# KidOS - Kid-Safe Browser Operating System

A containerized, browser-based operating system designed specifically for children, featuring safe browsing, curated content, and an intuitive desktop environment.

## 🌟 Features

### Desktop Environment
- **Full Window Management**: Draggable, resizable windows with minimize/maximize/close controls
- **Desktop Icons**: Launch applications with double-click
- **Taskbar**: Start menu, running applications, and system tray
- **Multiple Windows**: Run multiple applications simultaneously

### Built-in Applications

#### 📁 File Explorer
- Browse virtual files and folders
- Navigate through directory structure
- View different file types

#### 📝 Text Editor
- Create and edit text documents
- Save files to virtual file system
- Real-time character and line count

#### 🔢 Calculator
- Standard calculator functionality
- Basic arithmetic operations
- Clean, intuitive interface

#### 🌐 Kid-Safe Browser
- **Safe Search**: Google Safe Search integration
- **Domain Whitelist**: Only approved kid-friendly websites
- **Content Filtering**: Automatic blocking of unsafe content
- Pre-approved sites include:
  - PBS Kids
  - National Geographic Kids
  - NASA
  - Wikipedia
  - Science Kids
  - Educational game sites

#### 🎬 Video Player
- YouTube integration with kid-safe content
- Curated video library
- Search kid-friendly videos
- Protected viewing experience

#### 🖼️ Image Viewer
- View images with zoom and rotation
- Thumbnail navigation
- Pan and zoom controls

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see KidOS.

## 🏗️ Architecture

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Window Management**: react-rnd
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Project Structure
```
├── app/                    # Next.js app directory
├── components/
│   ├── apps/              # Application components
│   ├── desktop/           # Desktop environment
│   ├── taskbar/           # Taskbar component
│   ├── window/            # Window management
│   └── OS.tsx             # Main OS component
├── lib/
│   ├── store/             # Zustand state management
│   └── utils/             # Utility functions
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## 🔒 Safety Features

- **Content Filtering**: Only whitelisted domains accessible
- **Safe Search**: All searches use safe mode
- **No External Navigation**: Restricted browsing environment
- **Curated Content**: Pre-approved videos and websites
- **No Ads**: Clean, ad-free experience

## 🎨 Customization

### Adding Safe Websites
Edit `components/apps/Browser.tsx` to add domains to the whitelist:

```typescript
const SAFE_DOMAINS = [
  'pbskids.org',
  'your-safe-site.com',
  // Add more domains
];
```

### Adding Applications
1. Create a new component in `components/apps/`
2. Add to app registry in `lib/utils/apps.ts`
3. The app will automatically appear in the start menu

## 🛠️ Development

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

Inspired by browser-based operating systems like daedalOS by Dustin Brett.

---

Built with ❤️ for kids everywhere
