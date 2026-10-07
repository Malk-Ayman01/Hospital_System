# Hospital Management System - Backend (Node.js / Express)

## Run
    npm install
    cp .env.example .env     # Windows: copy .env.example .env  (then set JWT_SECRET)
    npm run dev

Check: http://localhost:5000/api/health

## Structure
- `src/routes/`        endpoints + role checks (stubs return 501 until the schema is ready)
- `src/services/`      business logic (auth is complete)
- `src/repositories/`  ALL database queries - the only place to edit when the schema is final
- `src/middleware/`    JWT authentication, role authorization, error handling
- `src/config/db.js`   DB connection (empty until the schema is chosen)

## Response format
Success: `{ "success": true, "data": {...}, "message": "..." }`
Error:   `{ "success": false, "message": "..." }`

## When the schema is ready
1. Install the DB driver and fill in `src/config/db.js`.
2. Implement the functions in `src/repositories/userRepository.js` (login/me/change-password then work).
3. For each module: add a repository + service, and replace the `todo` handlers in its route file.

No public registration exists: admins create staff via `POST /api/staff` (to be built).
