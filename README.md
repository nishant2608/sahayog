# SAHAYOG - Campus Errand Hub

A Progressive Web App (PWA) that connects campus students who need errands done with volunteers who are willing to help. Students can post delivery requests and volunteers can accept tasks to earn reward points.

## 🎯 Features

### For Students (Errand Posters)
- ✅ **Post Errands**: Request items from nearby shops (Amul, Haneena, Blinkit, Zomato, Amazon)
- ✅ **Track Orders**: Real-time status updates on posted errands
- ✅ **Set Urgency**: Mark orders as Low, Normal, High, or Urgent
- ✅ **Add Notes**: Include special delivery instructions
- ✅ **Room Delivery**: Specify exact room number for delivery

### For Volunteers
- ✅ **Browse Errands**: See all available errands in real-time
- ✅ **Accept Tasks**: First-come-first-served task acceptance
- ✅ **Earn Points**: Get 50 reward points per completed task
- ✅ **Task Tracking**: Monitor accepted and completed tasks
- ✅ **Notifications**: Get real-time notifications for new errands

### General Features
- ✅ **User Authentication**: Secure login and signup
- ✅ **Profile Management**: Edit profile and view account stats
- ✅ **Reward System**: Earn and track reward points
- ✅ **Mobile-First Design**: Fully responsive mobile UI
- ✅ **PWA Support**: Install as native app, offline support
- ✅ **Service Worker**: Offline caching and push notifications

## 📁 Project Structure

```
sahayog/
├── src/
│   ├── pages/                    # Page components
│   │   ├── Login.jsx             # User login page
│   │   ├── Signup.jsx            # User registration
│   │   ├── Home.jsx              # Dashboard
│   │   ├── CreateErrand.jsx      # Post errand form
│   │   ├── AvailableErrands.jsx  # Browse available errands
│   │   ├── MyErrands.jsx         # Track posted errands
│   │   ├── AcceptedTasks.jsx     # Volunteer task tracking
│   │   └── Profile.jsx           # User profile
│   ├── context/
│   │   └── AppContext.jsx        # Global state management
│   ├── styles/                   # CSS files (6 total)
│   ├── App.jsx                   # Main app with routing
│   ├── main.jsx                  # App entry point
│   └── index.css                 # Base styles
├── public/
│   ├── manifest.json             # PWA manifest
│   ├── service-worker.js         # Service worker
│   └── favicon.svg               # App icon
└── package.json                  # Dependencies
```

## 🚀 Getting Started

### Installation

```bash
# 1. Navigate to project
cd sahayog

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open http://localhost:5173/ in browser
```

### Build for Production

```bash
npm run build
npm run preview
```

## 📱 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Login | `/` | User authentication |
| Signup | `/signup` | New user registration |
| Home | `/home` | Dashboard with stats |
| Post Errand | `/create-errand` | Create delivery request |
| Available Errands | `/available-errands` | Browse all pending requests |
| My Errands | `/my-errands` | Track posted errands |
| Accepted Tasks | `/accepted-tasks` | Volunteer task management |
| Profile | `/profile` | User account settings |

## 🎮 How to Use

### As a Student:
1. **Login** with your email and password
2. **Post an Errand** → Select shop → Add items → Specify room → Submit
3. **Track Status** → View your errands and their status
4. **View Volunteers** → See who accepted your task

### As a Volunteer:
1. **Login** with your credentials
2. **Browse Available Errands** → See all pending requests
3. **Accept Tasks** → Click accept to earn 50 points
4. **Complete Tasks** → Mark as delivered when done
5. **Check Rewards** → View earned reward points in profile

## 🎨 Design Highlights

- **Mobile-First**: Perfectly optimized for mobile screens (320-480px)
- **Gradient UI**: Beautiful purple-blue gradients
- **Touch-Friendly**: Large buttons and inputs for mobile
- **Intuitive Navigation**: Simple one-level hierarchy
- **Emoji Icons**: Visual indicators for quick scanning
- **Responsive Forms**: Adaptive form layouts
- **Smooth Transitions**: Polished animations and interactions

## 💾 PWA Features

✅ **Installable** - Add to home screen like a native app
✅ **Offline Support** - Service worker caches key assets
✅ **App Icons** - Custom manifest and icons
✅ **Shortcuts** - Quick actions from home screen
✅ **Responsive** - Works on any device

## 📊 Technology Stack

```
Frontend:
├── React 18.2.0
├── React Router v6
├── Context API (State)
└── CSS3 (Styling)

Build:
├── Vite 5.4.0
└── npm

PWA:
├── Service Workers
├── Web Manifest
└── Offline Caching
```

## 🔐 Authentication

- **Login**: Email + Password validation
- **Signup**: New user registration
- **Storage**: LocalStorage (client-side only)
- **Protected Routes**: Auth checks on all pages

## 💬 User Data Flow

```
User Login
    ↓
Save to LocalStorage
    ↓
Access Protected Pages
    ↓
Create/Accept Errands
    ↓
Update State & Storage
    ↓
Real-time UI Updates
```

## 🎯 Reward System

- **Earn**: 50 points per completed errand
- **View**: See total in profile
- **Track**: History of completed tasks
- **Future**: Redeem for campus perks (ready for integration)

## 🌟 Key Components

### Context Management (AppContext.jsx)
- Global user state
- Errand management
- Notification handling
- LocalStorage persistence

### Routing (App.jsx)
- Public routes (Login, Signup)
- Protected routes (all others)
- Automatic redirects
- Route guards

### Styling
- Global variables and utilities
- Mobile-first responsive design
- Utility classes for common patterns
- CSS Grid and Flexbox layouts

## 🚀 Future Enhancements

- Backend API integration
- Real-time notifications (WebSocket)
- Payment processing
- Ratings and reviews
- Maps/geolocation
- Advanced filters
- Admin dashboard
- Analytics

## 📝 Test Credentials

```
Email: student@campus.edu
Password: password123
```

Or create your own account!

## 🤝 Contributing

Feel free to:
- Add new features
- Improve UI/UX
- Fix bugs
- Optimize performance

## 📄 License

MIT License - Open source

## 📞 Support

-- **Email**: support@sahayog.local
- **Issues**: Check app's help section
- **Docs**: See README and code comments

---

**Made with ❤️ for campus students**

🎉 Start helping today and earn reward points!
