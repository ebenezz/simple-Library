# 📚 Simple Library App

A full-stack library system built with:
- 🧩 **Angular** (Standalone components + Angular Material)
- 🛠️ **ASP.NET Core Web API**
- 🗃️ **MS SQL Server**

Supports managing **books** and **authors** with full CRUD operations.

---

## 🔧 Features

- List/Add/Edit/Delete Books
- List/Add/Edit/Delete Authors
- One-to-many relation: each book belongs to one author
- Angular Material design
- Fully reactive forms

---

## 📁 Project Structure

library-frontend/
├── app/
│ ├── components/
│ │ ├── book-list/
│ │ ├── book-form/
│ │ ├── author-list/
│ │ └── author-form/
│ ├── models/
│ └── services/
├── app.routes.ts
├── app.config.ts
├── material.module.ts
└── main.ts




---

## 🚀 Setup Instructions

### 1. 🖥️ Backend (ASP.NET Core API)

```bash
cd LibraryApi
dotnet restore
dotnet build
dotnet run

Make sure your launch profile is set to a valid HTTP port like http://localhost:5124.
```
### 2. 🌐 Frontend (Angular)
```bash
cd library-frontend
npm install
ng serve

Frontend will be available at: http://localhost:4200

```
### 🧑‍💻 Author
Made by Abenezer Tewodros — CS Student & Developer
