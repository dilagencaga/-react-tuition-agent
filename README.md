# 🎓 AI Tuition Agent - React Chat Application

> An intelligent chat application for managing student tuition queries and payments using AI-powered natural language processing.

**SE 4458 - Assignment 3** | Built with React, Firebase & OpenAI
GİTHUB repo: https://github.com/dilagencaga/-react-tuition-agent.git
YOUTUBE:https://youtu.be/btlmMYAWEog
TO Open the project: start server.js and \tuition-agent\client with npm start in different terminals with starting the midterm api solution project.

## 📋 Project Overview

This project implements an AI Agent chat application that integrates with tuition management APIs created in the midterm assignment. It uses OpenAI for natural language understanding and Firebase Firestore for real-time message synchronization.

### Features

- 🤖 Natural language processing for tuition-related queries
- 💬 Real-time messaging with Firebase Firestore
- 💳 Tuition payment processing
- 📊 Query tuition information by student number
- 📝 View unpaid tuitions (admin)
- 🌐 API Gateway pattern implementation
- 📱 Responsive web interface

## 🏗️ Architecture

The application follows the architecture specified in the assignment:

```
[React Frontend]
    ↓
[Save Message to Firestore]
    ↓
[Firestore Cloud Function / Backend API]
    ↓
[Call OpenAI/LLM to parse intent & parameters]
    ↓
[Call Midterm APIs via Gateway]
    ↓
[Write response to Firestore]
    ↓
[UI Updates in Real-Time]
```

### Components

1. **Frontend**
   - **React Version** (client/): Modern React application with component-based architecture
   - **Vanilla JS Version** (public/): Original chat interface with real-time updates
   - Firebase Firestore integration for message synchronization
   - Supports both regular HTTP and real-time Firestore modes

2. **Backend (Node.js + Express)**
   - API Gateway for midterm tuition APIs
   - OpenAI integration for intent parsing
   - Firebase Admin SDK for Firestore operations
   - RESTful endpoints for chat and payment operations

3. **Firebase Firestore**
   - Real-time message storage and synchronization
   - Chat history persistence
   - Multi-client support

4. **Midterm APIs**
   - Query Tuition API
   - Pay Tuition API
   - Unpaid Tuition API (Admin)

## 📁 Project Structure

```
tuition-agent/
├── client/                     # React Frontend
│   ├── public/
│   │   └── index.html          # React HTML template
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── ChatBubble.js
│   │   │   ├── TuitionCard.js
│   │   │   ├── PaymentCard.js
│   │   │   ├── UnpaidList.js
│   │   │   └── ChatInput.js
│   │   ├── services/
│   │   │   └── firestore.js    # Firebase service layer
│   │   ├── App.js              # Main React component
│   │   ├── App.css             # React styles
│   │   └── index.js            # React entry point
│   ├── .env                    # React environment config
│   └── package.json            # React dependencies
├── public/                     # Vanilla JS Frontend (legacy)
│   ├── index.html              # Main HTML file
│   ├── styles.css              # Styling
│   ├── app.js                  # Original chat app (HTTP-based)
│   ├── app-firestore.js        # Real-time Firestore version
│   └── firebase-config.js      # Firebase frontend config
├── UniversityTuitionApi/       # Midterm .NET APIs
├── server.js                   # Express backend with Firebase
├── package.json                # Backend dependencies
├── .env                        # Backend environment variables
├── firebase.json               # Firebase service account
├── README.md                   # This file
└── FIREBASE_SETUP.md           # Firebase setup instructions

```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Firebase project with Firestore enabled
- OpenAI API key (optional, has keyword fallback)
- .NET 8.0 SDK (for midterm APIs)

### Installation

1. **Clone the repository**
   ```bash
   cd tuition-agent
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install React frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your-openai-api-key
   TUITION_API_BASE_URL=https://localhost:7125
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=123456
   FIREBASE_DB_URL=https://your-project.firebaseio.com
   ```

4. **Configure React environment**

   Create a `client/.env` file:
   ```env
   PORT=3001
   REACT_APP_BACKEND_URL=http://localhost:3000
   ```

5. **Setup Firebase**

   - Place your Firebase service account JSON file as `firebase.json` in the root
   - Follow [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed instructions
   - Update Firebase config in `client/src/services/firestore.js`

6. **Start the midterm API**
   ```bash
   cd UniversityTuitionApi/se4458-university-tuition-api
   dotnet run --project UniversityTuitionApi
   ```

7. **Start the Node.js backend**
   ```bash
   npm start
   # or
   node server.js
   ```
   Backend runs on: http://localhost:3000

8. **Start the React frontend**
   ```bash
   cd client
   npm start
   ```
   Frontend runs on: http://localhost:3001

**Alternative: Use Vanilla JS version**
   - Navigate to `public/index.html`
   - Serve with any HTTP server (e.g., `npx serve public`)
   - Access at http://localhost:3000 (or your server port)

## 🔧 Configuration

### Using Firestore Real-time Mode

To enable real-time messaging with Firestore:

1. Edit `public/index.html` and change:
   ```html
   <script src="app.js"></script>
   ```
   to:
   ```html
   <script src="app-firestore.js"></script>
   ```

2. Or rename files:
   ```bash
   mv public/app.js public/app-original.js
   mv public/app-firestore.js public/app.js
   ```

### Firebase Configuration

See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed Firebase setup instructions.

## 📡 API Endpoints

### Chat Endpoints

#### POST `/chat`
Original chat endpoint (HTTP-based, no Firestore)

**Request:**
```json
{
  "message": "123456 harç bilgimi göster"
}
```

**Response:**
```json
{
  "stage": "api",
  "intent": "QUERY_TUITION",
  "success": true,
  "api": { ... },
  "ui": { "type": "tuition_card" }
}
```

#### POST `/chat/firestore`
Firestore-enabled chat endpoint with real-time sync

**Request:**
```json
{
  "sessionId": "sess_abc123",
  "message": "123456 harç bilgimi göster"
}
```

**Response:**
```json
{
  "success": true,
  "userMessageId": "msg_user_123",
  "botMessageId": "msg_bot_456",
  "response": { ... }
}
```

#### GET `/chat/history/:sessionId`
Get chat history for a session

**Response:**
```json
{
  "sessionId": "sess_abc123",
  "messages": [ ... ],
  "count": 10
}
```

### Payment Endpoint

#### POST `/pay`
Process tuition payment

**Request:**
```json
{
  "studentNo": "123456",
  "term": "Fall 2024",
  "amount": 15000
}
```

### Tuition Endpoints (Proxied to Midterm API)

- `GET /tuition/:studentNo` - Get tuition info
- Backend proxies to midterm API's `/api/v1/tuition/:studentNo`

## 🎯 Supported Intents

The AI agent recognizes the following intents:

1. **QUERY_TUITION**: Check tuition information
   - Examples: "harç bilgimi göster", "123456 tuition", "check my tuition"

2. **PAY_TUITION**: Pay tuition fees
   - Examples: "harç öde", "pay tuition", "ödeme yap 123456"

3. **UNPAID_TUITION**: View unpaid tuitions (admin only)
   - Examples: "ödenmemiş harçlar", "unpaid tuitions", "unpaid list"

## 🧪 Testing

### Manual Testing

1. **Query Tuition:**
   ```
   User: 88 harç bilgimi göster
   Bot: [Shows tuition card with amount, term, etc.]
   ```

2. **Pay Tuition:**
   ```
   User: harç öde 88
   Bot: [Shows payment confirmation card]
   User: [Clicks "Pay Now"]
   Bot: Payment successful.
   ```

3. **Unpaid Tuitions:**
   ```
   User: ödenmemiş harçlar
   Bot: [Shows list of unpaid tuitions with Pay buttons]
   ```

### Real-time Testing

1. Open two browser tabs
2. Use the same session (same browser)
3. Send messages - they should sync in real-time
4. Chat history should persist across page refreshes

## 🛠️ Technology Stack

### Backend
- Node.js
- Express.js
- Firebase Admin SDK
- OpenAI API
- dotenv

### Frontend
- React 18+
- Firebase SDK (Firestore)
- Vanilla JavaScript (legacy version)
- HTML5/CSS3

### APIs
- .NET 8.0 Web API
- Entity Framework Core
- Ocelot API Gateway (in UniversityGateway project)

## 📝 Design Decisions

### 1. React Migration
- Migrated from Vanilla JavaScript to React for better component architecture
- Preserved Vanilla JS version in `public/` folder for backward compatibility
- React version provides:
  - Better state management with hooks
  - Component reusability
  - Easier maintenance and testing
  - Modern development experience

### 2. Dual Mode Support
- Kept both HTTP-based (`app.js`) and Firestore-based (`app-firestore.js`) versions
- Allows testing backend logic without Firebase dependency
- Easy to switch between modes

### 3. Intent Parsing
- Primary: OpenAI GPT-4.1-mini for natural language understanding
- Fallback: Keyword-based parsing when OpenAI is unavailable
- Supports both Turkish and English

### 4. State Management
- Server-side: In-memory state for pending intents and last student number
- Client-side: Session ID in localStorage
- Firestore: Persistent chat history and messages
- React: useState and useEffect hooks for local state

### 5. API Gateway Pattern
- Express server acts as gateway to midterm APIs
- Handles authentication (admin token caching)
- SSL certificate validation disabled for localhost (development only)

## ⚠️ Known Issues & Assumptions

### Issues

1. **In-memory state**: `pendingIntent` and `lastStudentNo` are stored in memory on the server
   - Solution: Could be moved to Firestore for multi-instance support

2. **SSL Certificate**: `NODE_TLS_REJECT_UNAUTHORIZED = "0"` for development
   - Should be removed in production

3. **Session Management**: Basic session ID generation
   - Could be enhanced with proper user authentication

### Assumptions

1. **Constant Credentials**: The app uses constant admin username/password for API authentication
2. **Single Instance**: Server state assumes single instance (not horizontally scaled)
3. **Development Mode**: Firestore security rules are permissive (test mode)
4. **Local API**: Midterm API runs on localhost (could be deployed separately)

## 🎥 Video Demonstration

https://youtu.be/btlmMYAWEog

*Video showcase coming soon - Will include:*
- Live chat demonstration
- Query tuition feature walkthrough
- Payment processing flow
- Unpaid tuitions listing
- Real-time Firebase sync demo

## 👥 Contributors

- Dila Gençağa

## 📄 License

This project is created for educational purposes as part of SE4458 course.

## 🔗 Links

- **GitHub Repository**: [https://github.com/dilagencaga/-react-tuition-agent](https://github.com/dilagencaga/-react-tuition-agent.git)
- **Deployment**: Not deployed (local development with OpenAI API)



**Note**: This project fulfills the requirements of SE4458 Assignment 3, implementing an AI Agent with real-time messaging using Firestore, API Gateway pattern, and integration with midterm Tuition APIs.
