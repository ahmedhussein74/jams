# **Job Application Management System**

A Node.js and Express-based application designed to manage job applications, candidate data, and hiring workflows. The app uses several middlewares to ensure security, performance, and manageability.

## **Middlewares**

1. **dotenv**: Loads environment variables from `.env` files for secure configuration management.
2. **cors**: Enables Cross-Origin Resource Sharing to handle requests from different origins.
3. **path**: Handles file and directory paths in a cross-platform manner.
4. **helmet**: Secures the app by setting various HTTP headers.
5. **morgan**: Logs HTTP requests for debugging and monitoring.
6. **express**: A web application framework for building APIs and handling routes.
7. **connectDB**: Custom middleware for connecting to the database.
8. **express-session**: Manages session data on the server side.
9. **compression**: Compresses response bodies to improve speed.
10. **cookie-parser**: Parses cookies from the client requests.
11. **express-rate-limit**: Limits repeated requests to protect against brute-force and DoS attacks.

## **Installation and Usage**

- Install dependencies: `npm install`
- Set up environment variables in a `.env` file.
- Start the app: `npm start`
