# Doctor Listing Application

A modern, responsive web application for listing and finding doctors, built with Next.js, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Advanced Search**: Real-time search with autocomplete suggestions
- **Smart Filtering**: Filter doctors by consultation type and specialties
- **Sorting Options**: Sort by fees (ascending) and experience (descending)
- **Responsive Design**: Works seamlessly on all devices
- **Accessibility**: ARIA-compliant and keyboard navigation support
- **Performance Optimized**: Debounced search and efficient rendering
- **Error Handling**: Graceful error boundaries and loading states
- **URL State Management**: Filter state preserved in URL parameters

## 🚀 Technical Highlights

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for modern UI
- **State Management**: React Hooks
- **Performance**: 
  - Debounced search
  - Optimized filtering
  - Lazy loading
- **Testing Support**: Comprehensive test IDs implemented
- **Accessibility**: ARIA labels and keyboard navigation
- **Error Handling**: Error boundaries and fallbacks

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing Support

The application includes comprehensive test coverage support with data-testid attributes:

- `autocomplete-input`: Search input field
- `suggestion-item`: Search suggestion items
- `doctor-card`: Doctor card wrapper
- `doctor-name`: Doctor's name
- `doctor-specialty`: Doctor's specialties
- `doctor-experience`: Doctor's experience
- `doctor-fee`: Doctor's consultation fee
- `filter-header-speciality`: Specialty filter header
- `filter-header-moc`: Consultation mode filter header
- `filter-header-sort`: Sort options header
- `filter-video-consult`: Video consultation filter
- `filter-in-clinic`: In-clinic consultation filter
- `filter-specialty-*`: Individual specialty filters

## 🎯 Key Implementation Details

1. **Data Handling**:
   - Proper API integration with error handling
   - Data transformation and validation
   - Type-safe data management

2. **User Interface**:
   - Responsive design with Tailwind CSS
   - Loading skeletons with shimmer effect
   - Error boundaries for graceful error handling

3. **Search & Filter**:
   - Debounced search implementation
   - Real-time filtering
   - URL-based state management

4. **Performance**:
   - Optimized rendering
   - Efficient data filtering
   - Proper React hooks usage

## 📱 Responsive Design

The application is fully responsive and works across:
- Desktop computers
- Tablets
- Mobile devices

## 🔒 Type Safety

Comprehensive TypeScript types for:
- API responses
- Component props
- State management
- Filter operations

## 🌐 Deployment

The application is deployed at: [Your Deployment URL]

## 📝 Author

[Your Name]

## 📄 License

MIT License 