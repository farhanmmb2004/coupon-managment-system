# Round-Robin Coupon Distribution System

This project implements a coupon distribution system that assigns coupons to guest users in a round-robin manner while preventing abuse through IP and session tracking.

## Project Structure

```
guest-authentication/
├── backend/        # Node.js Express backend
├── frontend/       # React.js frontend
```

## Features

- Round-robin coupon distribution
- No login required (guest access)
- Abuse prevention through:
  - IP address tracking
  - Browser session tracking via cookies
- Cooldown period between coupon claims
- Responsive UI

## Technologies Used

### Backend
- Node.js with Express
- MongoDB for data storage
- Cookie-based session tracking
- IP-based rate limiting

### Frontend
- React.js
- Axios for API calls
- Bootstrap for styling

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd guest-authentication/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/coupon-system
   NODE_ENV=development
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd guest-authentication/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm run dev
   ```

4. The React app will open in your browser at `http://localhost:3000`

## Abuse Prevention Strategies

This application implements multiple layers of abuse prevention:

1. **IP Address Tracking**:
   - Each user's IP address is recorded when they claim a coupon
   - Users from the same IP address are restricted from claiming multiple coupons within the cooldown period

2. **Cookie-Based Session Tracking**:
   - A unique session ID is assigned to each browser via cookies
   - This prevents users from claiming multiple coupons by using different browsers or private browsing

3. **Cooldown Period**:
   - Users must wait for a specified time period (default: 1 hour) before claiming another coupon
   - A countdown timer informs users of the remaining wait time

## API Endpoints

- `GET /api/v1/coupons/claim` - Claim a coupon
- `POST /api/v1/coupons/add` - Add new coupons (admin only)
