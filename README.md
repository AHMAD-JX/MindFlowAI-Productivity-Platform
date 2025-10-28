# MindFlow AI - Productivity Platform

A comprehensive AI-powered productivity platform built with Next.js and Node.js, featuring real-time chat with Gemini AI, image generation, code assistance, and more.




![Home](https://github.com/AHMAD-JX/MindFlowAI-Productivity-Platform/blob/8cab4849f2b986ae1894a588f0a9b152a42f9190/frontend/gif.gif)
![Home](https://github.com/AHMAD-JX/MindFlowAI-Productivity-Platform/blob/8cab4849f2b986ae1894a588f0a9b152a42f9190/frontend/1.png)
![Home](https://github.com/AHMAD-JX/MindFlowAI-Productivity-Platform/blob/8cab4849f2b986ae1894a588f0a9b152a42f9190/frontend/2.png)
![Home](https://github.com/AHMAD-JX/MindFlowAI-Productivity-Platform/blob/8cab4849f2b986ae1894a588f0a9b152a42f9190/frontend/3.png)
![Home](https://github.com/AHMAD-JX/MindFlowAI-Productivity-Platform/blob/8cab4849f2b986ae1894a588f0a9b152a42f9190/frontend/4.png)



## 🚀 Features

### 🤖 AI Chat Assistant
- Real-time chat with Google Gemini AI
- Conversation history management
- Multiple chat modes (Creative, Balanced, Precise)
- Message regeneration and copying

### 🎨 Image Generation
- AI-powered image creation
- Multiple art styles (Realistic, Artistic, Anime, Cartoon, Abstract)
- Various image sizes and quality options
- Gallery management and sharing

### 💻 Code Assistant
- AI code generation for multiple languages
- Code debugging and optimization
- Support for JavaScript, Python, TypeScript, React, and more
- Code history and download functionality

### 👤 User Management
- Secure authentication system
- User profile management
- Activity statistics
- Settings and preferences

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Google Generative AI** - AI integration

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **JWT** - Authentication
- **MongoDB** - Database (planned)

## 📁 Project Structure

```
MindFlow AI - Productivity Platform/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   │   ├── api/         # API routes
│   │   │   ├── dashboard/   # Dashboard page
│   │   │   ├── signin/      # Sign in page
│   │   │   └── signup/      # Sign up page
│   │   ├── components/      # Reusable components
│   │   └── lib/            # Utility functions
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # Node.js backend application
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   └── utils/          # Utility functions
│   └── package.json        # Backend dependencies
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AHMAD-JX/MindFlowAI-Productivity-Platform.git
   cd MindFlowAI-Productivity-Platform
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Set up environment variables**
   
   Create `.env.local` in the frontend directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

5. **Start the development servers**
   
   Frontend (Terminal 1):
   ```bash
   cd frontend
   npm run dev
   ```
   
   Backend (Terminal 2):
   ```bash
   cd backend
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Google Gemini API Setup
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Create a new API key
3. Add the key to your `.env.local` file

### Environment Variables
- `GEMINI_API_KEY` - Your Google Gemini API key
- `NEXT_PUBLIC_APP_URL` - Application URL

## 📱 Usage

### AI Chat
1. Navigate to the Dashboard
2. Select "AI Chat" from the sidebar
3. Start a conversation with the AI assistant
4. Use different modes for various response styles

### Image Generation
1. Go to "Image Generation" section
2. Describe your desired image
3. Choose style, size, and quality
4. Generate and download your images

### Code Assistant
1. Access the "Code Assistant" section
2. Describe the code you need
3. Select programming language and complexity
4. Generate, copy, or download the code

## 🎨 UI/UX Features

- **Modern Design** - Clean, professional interface
- **Dark/Light Mode** - Adaptive theming
- **Responsive Layout** - Works on all devices
- **Smooth Animations** - Enhanced user experience
- **Cursor AI Style** - Familiar chat interface

## 🔒 Security

- JWT-based authentication
- Secure API key handling
- Input validation and sanitization
- Error handling and logging

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Backend (Railway/Heroku)
1. Connect your repository
2. Set environment variables
3. Deploy with automatic builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**AHMAD JX**
- GitHub: [@AHMAD-JX](https://github.com/AHMAD-JX)
- Project: [MindFlow AI](https://github.com/AHMAD-JX/MindFlowAI-Productivity-Platform)

## 🙏 Acknowledgments

- Google Gemini AI for powerful language models
- Next.js team for the amazing framework
- Tailwind CSS for beautiful styling
- All open-source contributors

---

**Built with ❤️ by AHMAD JX**
