# Volunteer Match - README

## Overview

**Volunteer Match** is a web application built with **Next.js** and **React** that helps connect volunteers with organizations and causes. It allows users to log in, create a volunteer profile, follow other users, join organizations, and explore the causes associated with organizations. Each user has the ability to perform CRUD (Create, Read, Update, Delete) operations on organizations, with no admin role—**every user has the same permissions**.

### Key Features

- **User Login**: Users can log in using **Firebase Authentication**.
- **Volunteer Profile Creation**: When a user logs in, their volunteer profile is created automatically if they don't already exist.
- **Follow Other Volunteers**: Users can follow other volunteers, but there’s no feed of updates from followed users.
- **Join Organizations**: Users can join organizations they are interested in and explore the causes they support.
- **CRUD Operations on Organizations**: Every user can create, read, update, and delete organizations.
- **View Causes**: Users can explore the causes associated with organizations.

---

## Getting Started

### Prerequisites

1. **Node.js** (to run the Next.js frontend).
2. **Firebase Authentication** for user login and volunteer management.
3. **Database**: PostgreSQL (or another database) for storing volunteers, organizations, and followers.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/christophuff/volunteer-match-FE.git
