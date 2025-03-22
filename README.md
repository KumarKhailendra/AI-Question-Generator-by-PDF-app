# 📚 PDF MCQ Generator Frontend

A modern React application for generating MCQs from PDF documents with beautiful animations and interactive UI.

## ✨ Features

- 🎯 Dynamic PDF file upload with drag & drop
- 💫 Smooth animations using Framer Motion
- 📝 Interactive MCQ answering interface
- 📊 Real-time score tracking
- 🎨 Beautiful UI with Tailwind CSS
- 📱 Fully responsive design
- 📄 PDF score card generation

## 🛠️ Tech Stack

- **React**: UI framework
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Axios**: API requests
- **jsPDF & html2canvas**: PDF generation
- **Hero Icons**: UI icons

## 🚀 Quick Start

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm start
   ```

The app will run on `http://localhost:3000`

## 📦 Project Structure

```
src/
├── components/
│   ├── FileUpload.js    # PDF upload component
│   ├── QuestionForm.js  # Question input form
│   ├── MCQDisplay.js    # MCQ display and interaction
│   └── ScoreCard.js     # Results and PDF generation
├── App.js               # Main application component
└── index.js            # Application entry point
```

## 🎨 UI Components

### File Upload
- Drag & drop interface
- File type validation
- Upload progress indication

### Question Form
- Custom question input
- Question count specification
- Loading state handling

### MCQ Display
- Interactive question cards
- Real-time answer selection
- Progress tracking
- Animated transitions

### Score Card
- Final score display
- PDF report generation
- Share functionality

## 🔧 Configuration

### Tailwind Setup
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 📡 API Integration

The frontend communicates with the backend using:
- `/upload-pdf` for file uploads
- `/generate-mcqs` for question generation

## 🎯 Features in Detail

1. **PDF Upload:**
   - Drag & drop functionality
   - File type validation
   - Progress indication
   - Error handling

2. **Question Generation:**
   - Custom question input
   - Loading states
   - Error feedback
   - Success notifications

3. **MCQ Interface:**
   - Interactive options
   - Real-time validation
   - Progress tracking
   - Animated transitions

4. **Score Card:**
   - Score calculation
   - PDF generation
   - Share options
   - Result analysis

## 🔐 Error Handling

- File upload validation
- API error handling
- User input validation
- Network error handling

## 🎨 Styling

The application uses Tailwind CSS with:
- Custom color schemes
- Responsive design
- Smooth animations
- Modern UI components

## 🚀 Performance

- Optimized bundle size
- Lazy loading components
- Efficient state management
- Smooth animations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

---
Made with ❤️ using React & Tailwind CSS
