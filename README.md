# Client Lead Management System (Mini CRM)

A simple Customer Relationship Management (CRM) application built using HTML, CSS, JavaScript, Node.js, Express.js, and MySQL.

## Project Overview

This application helps businesses manage client leads generated through website contact forms. Users can add, update, search, filter, and delete leads while tracking their status and follow-up notes.

## Features

- Add New Leads
- View All Leads
- Update Lead Status
  - New
  - Contacted
  - Converted
- Add Notes and Follow-Ups
- Delete Leads
- Search Leads by Name or Email
- Filter Leads by Status
- Dashboard Statistics
  - Total Leads
  - New Leads
  - Contacted Leads
  - Converted Leads
- Responsive Modern UI

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MySQL

## Project Structure

```
client-lead-management-crm/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
└── README.md
```

## Database Setup

Create a database:

```sql
CREATE DATABASE crm_db;
```

Use the database:

```sql
USE crm_db;
```

Create the leads table:

```sql
CREATE TABLE leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    source VARCHAR(100),
    status VARCHAR(50) DEFAULT 'New',
    notes TEXT
);
```

## Installation

### Backend Setup

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

### Frontend Setup

Open:

```text
frontend/index.html
```

in your browser.

## API Endpoints

### Create Lead

```http
POST /leads
```

### Get All Leads

```http
GET /leads
```

### Update Status

```http
PUT /leads/:id
```

### Update Notes

```http
PUT /leads/:id/notes
```

### Delete Lead

```http
DELETE /leads/:id
```

## Skills Gained

- CRUD Operations
- Backend API Development
- Database Management
- MySQL Integration
- Frontend Development
- Business Workflow Management
- Full Stack Development

## Author

**Gaddam Ashwitha**

Computer Science Engineering Student

## Internship Task

Project developed as part of a Full Stack Web Development Internship.
