/* eslint-disable */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load data files (in-memory). Mutations persist while server runs.
const dbDir = path.join(__dirname, '..', 'app', '(Kambaz)', 'Database');
const usersFile = path.join(dbDir, 'users.json');
const enrollmentsFile = path.join(dbDir, 'enrollments.json');
// courses.json not used by server; keep file path available if needed later
const coursesFile = path.join(dbDir, 'courses.json');
const assignmentsFile = path.join(dbDir, 'assignments.json');

let users = [];
let enrollments = [];
let assignments = [];

function loadData() {
  try {
    users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
  } catch {
    users = [];
  }
  try {
    enrollments = JSON.parse(fs.readFileSync(enrollmentsFile, 'utf8'));
  } catch {
    enrollments = [];
  }
  try {
    assignments = JSON.parse(fs.readFileSync(assignmentsFile, 'utf8'));
  } catch {
    assignments = [];
  }
}
loadData();

function saveUsers() {
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to save users.json', e);
  }
}

function saveAssignments() {
  try {
    fs.writeFileSync(assignmentsFile, JSON.stringify(assignments, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to save assignments.json', e);
  }
}

// Helper to generate simple unique id
function genId() {
  return Date.now().toString(36) + Math.floor(Math.random() * 1000).toString(36);
}

// Helper to generate assignment id using course prefix for nicer breadcrumbing
function genAssignmentId(course) {
  const safeCourse = (course || 'A').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  return `${safeCourse}-${Date.now().toString(36)}${Math.floor(Math.random() * 1000).toString(36)}`;
}

// GET /api/users - optionally filter by course (query: ?course=RS101)
app.get('/api/users', (req, res) => {
  const { course } = req.query;
  if (!course) {
    return res.json(users);
  }
  // find enrollments for course
  const enrolledUserIds = new Set(enrollments.filter(e => e.course === course).map(e => e.user));
  const courseUsers = users.filter(u => enrolledUserIds.has(u._id));
  res.json(courseUsers);
});

// GET /api/users/:id
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u._id === req.params.id);
  if (!user) return res.status(404).json({ error: 'not found' });
  res.json(user);
});

// POST /api/users - create user (faculty only - simple role check via header `x-role`)
app.post('/api/users', (req, res) => {
  const role = req.header('x-role') || 'Student';
  if (role !== 'Faculty' && role !== 'Dean') {
    return res.status(403).json({ error: 'forbidden: only faculty/dean can create users' });
  }
  const payload = req.body;
  const newUser = { ...payload, _id: payload._id || genId() };
  users.push(newUser);
  saveUsers();
  res.status(201).json(newUser);
});

// PUT /api/users/:id - update (faculty only)
app.put('/api/users/:id', (req, res) => {
  const role = req.header('x-role') || 'Student';
  if (role !== 'Faculty' && role !== 'Dean') {
    return res.status(403).json({ error: 'forbidden: only faculty/dean can update users' });
  }
  const idx = users.findIndex(u => u._id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  users[idx] = { ...users[idx], ...req.body };
  saveUsers();
  res.json(users[idx]);
});

// DELETE /api/users/:id - delete (faculty only)
app.delete('/api/users/:id', (req, res) => {
  const role = req.header('x-role') || 'Student';
  if (role !== 'Faculty' && role !== 'Dean') {
    return res.status(403).json({ error: 'forbidden: only faculty/dean can delete users' });
  }
  const id = req.params.id;
  const idx = users.findIndex(u => u._id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  const removed = users.splice(idx, 1)[0];
  // remove enrollments for this user
  enrollments = enrollments.filter(e => e.user !== id);
  // persist users; enrollments persist in file? we will not overwrite enrollments.json to avoid side effects
  saveUsers();
  res.json(removed);
});

// Simple route to return enrollments for a course
app.get('/api/enrollments', (req, res) => {
  const { course } = req.query;
  if (course) {
    return res.json(enrollments.filter(e => e.course === course));
  }
  res.json(enrollments);
});

// ASSIGNMENTS API
// GET /api/assignments - optional ?course=COURSE_ID
app.get('/api/assignments', (req, res) => {
  const { course } = req.query;
  if (course) {
    return res.json(assignments.filter(a => a.course === course));
  }
  res.json(assignments);
});

// GET by id
app.get('/api/assignments/:id', (req, res) => {
  const a = assignments.find(x => x._id === req.params.id);
  if (!a) return res.status(404).json({ error: 'not found' });
  res.json(a);
});

// POST create (faculty/dean only)
app.post('/api/assignments', (req, res) => {
  const role = req.header('x-role') || 'Student';
  const payload = req.body || {};
  console.log('POST /api/assignments attempt role=', role, 'title=', payload.title);
  if (role !== 'Faculty' && role !== 'Dean') {
    console.warn('Forbidden create assignment attempt role=', role);
    return res.status(403).json({ error: 'forbidden: only faculty/dean can create assignments' });
  }
  const newAssignment = { ...payload, _id: payload._id || genAssignmentId(payload.course) };
  assignments.push(newAssignment);
  saveAssignments();
  try {
    console.log('Created assignment', newAssignment._id, 'for course', newAssignment.course);
  } catch (err) {
    // ignore
  }
  res.status(201).json(newAssignment);
});

// PUT update (faculty/dean only)
app.put('/api/assignments/:id', (req, res) => {
  const role = req.header('x-role') || 'Student';
  if (role !== 'Faculty' && role !== 'Dean') {
    return res.status(403).json({ error: 'forbidden: only faculty/dean can update assignments' });
  }
  const idx = assignments.findIndex(x => x._id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  assignments[idx] = { ...assignments[idx], ...req.body };
  saveAssignments();
  res.json(assignments[idx]);
});

// DELETE (faculty/dean only)
app.delete('/api/assignments/:id', (req, res) => {
  const role = req.header('x-role') || 'Student';
  if (role !== 'Faculty' && role !== 'Dean') {
    return res.status(403).json({ error: 'forbidden: only faculty/dean can delete assignments' });
  }
  const id = req.params.id;
  const idx = assignments.findIndex(x => x._id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  const removed = assignments.splice(idx, 1)[0];
  saveAssignments();
  res.json(removed);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`People server running on http://localhost:${port}`));
