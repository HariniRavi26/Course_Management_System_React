# Student Course Management System — React + Mock API

React/Vite frontend of the Course Management System. **Course data now comes from a
local JSON Server Mock API** (`mock-api/db.json`) through Axios and a React
`CourseContext`, instead of a hardcoded array / localStorage.

The frontend itself (pages, styling, navigation, student and admin features) is unchanged.

## Run

```bash
npm install
npm start
```

`npm start` runs the Mock API and the React app together in one terminal. If you'd
rather run them separately (two terminals):

**Terminal 1**
```bash
npm run mock-api
```
**Terminal 2**
```bash
npm run dev
```

| What             | URL                            |
|------------------|---------------------------------|
| React app        | http://localhost:5173           |
| Mock API         | http://localhost:5000           |
| Courses endpoint | http://localhost:5000/courses   |

Start the Mock API **before** (or together with) the React app. If it is not running,
course pages show *"Could not reach the Mock API…"* with a **Retry** button — this is
expected, not a bug; click Retry once the API is up, no page reload needed.

## Demo logins

| Role    | Email           | Password   |
|---------|-----------------|------------|
| Admin   | admin@lms.com   | admin123   |
| Student | student@lms.com | student123 |

Login, registration, enrollments, progress and notifications are unchanged and still
live in the browser's localStorage. **Only courses** were moved to the Mock API.

## How course data flows

```
React page / legacy page script
        |
   CourseContext         src/context/CourseContext.jsx
        |
     Axios               src/services/api.js  (baseURL http://localhost:5000)
        |
 http://localhost:5000/courses     (JSON Server)
        |
 mock-api/db.json
```

`CourseContext` (`useCourses()`) provides:
`courses`, `loading`, `error`, `fetchCourses()`, `addCourse()`, `updateCourse()`, `deleteCourse()`

| Action                         | HTTP request          |
|---------------------------------|-----------------------|
| Load courses                   | `GET /courses`        |
| Admin → Add Course             | `POST /courses`       |
| Admin → Edit Course → Save     | `PUT /courses/:id`    |
| Admin → Delete (Manage / Edit) | `DELETE /courses/:id` |

`CourseProvider` is added in `src/main.jsx`, next to the existing `AuthProvider`.

### How the original page scripts still work
Many original scripts in `public/legacy/pages/` call `getCourses()` / `getCourseById()`
synchronously. To keep them untouched, `CourseContext` mirrors the loaded courses into
`window.CourseBridge` (created in `public/legacy/js/data.js`), and `LegacyPageScript`
starts a page script only after the courses have loaded. The old `addCourse` /
`updateCourse` / `deleteCourse` functions in `data.js` now forward to `CourseContext`
(and return Promises), so the existing Add/Edit forms keep working as they were.

## Changing course data
Edit `mock-api/db.json` directly (JSON Server watches it), or use the app as admin.
Changes made in the app are **written back to `mock-api/db.json`**.

Each course looks like:
```json
{
  "id": "c1", "title": "...", "category": "...", "instructor": "...",
  "price": 49, "description": "...",
  "modules": [ { "id": "m1", "title": "...", "notes": "...", "materials": ["..."],
                 "pdfUrl": "...", "videoTitle": "...", "videoUrl": "..." } ]
}
```
Keep the seeded course `id`s as they are — enrollments and progress refer to them (`c1`, `c2`, `c3`).

## Troubleshooting

If `npm start` (or `npm run mock-api`) fails, check these in order:

1. **Did `npm install` finish without errors?** Run it again and read the last ~10 lines
   of output. If it fails, that's usually a Node.js version problem — this project needs
   **Node 18 or newer** (`node -v` to check).
2. **Are you in the project's root folder** (the one with `package.json` in it) when you
   run the command? `npm run mock-api` fails with "missing script" from the wrong folder.
3. **Is port 5000 already used by something else?** The error looks like
   `EADDRINUSE: address already in use :::5000`.
   - Windows: `netstat -ano | findstr :5000` to find the process ID, then
     `taskkill /PID <that id> /F` to stop it — or edit the port (see below).
   - macOS: *System Settings → General → AirDrop & Handoff → AirPlay Receiver* uses
     port 5000; turn it off, or edit the port (see below).
4. **To use a different port**, change it in three places so they stay in sync:
   `package.json` (the `mock-api` script's `--port`), `src/services/api.js`
   (the `baseURL`), and wherever you check the API in a browser.
5. Still stuck? Copy the **exact text** of the error from the terminal — that pinpoints
   the real cause much faster than a description of the symptom.

- `json-server` is pinned to `0.17.4` because newer 1.x betas removed the `--watch` flag
  used by the `mock-api` script.

## Structure
- `mock-api/db.json` — the Mock API database (courses)
- `src/context/CourseContext.jsx` — course state + GET/POST/PUT/DELETE
- `src/services/api.js` — shared Axios instance
- `src/pages/` — 22 React route components
- `src/components/` — Navbar, Footer, PageShell, CourseCard, LegacyPageScript
- `src/auth/` — AuthContext/useAuth
- `public/css/` — original stylesheet retained
- `public/legacy/js/` — original data, navigation, validation and UI logic retained
- `public/legacy/pages/` — extracted page-specific scripts, wrapped for SPA navigation

The original HTML project remains separate and should be kept as the backup/source version.

## Mock API data model

The project keeps the existing frontend layout and stores application data in `mock-api/db.json` through JSON Server. The API collections are:

- `students` - registered student accounts
- `admins` - registered admin/instructor accounts
- `courses` - the existing course catalog, including module notes, PDFs and YouTube references
- `enrollments` - student/course registrations
- `progress` - completed modules and completion state
- `ratings` - course ratings/reviews
- `savedCourses` - courses saved by students
- `notifications` - account and learning notifications
- `achievements` - completion achievements

Run the project in two terminals:

```bash
npm run mock-api
npm run dev
```

The Mock API runs on port `5000` and the React app runs on port `5173`.
