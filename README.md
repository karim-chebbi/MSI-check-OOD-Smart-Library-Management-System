# 📚 Library Management System (JavaScript - OOP)

## 📖 Description

This project is a **simplified Library Management System** built using **Object-Oriented Design (OOD)** principles in JavaScript.

The system manages:
- Users (Students & Teachers)
- Books
- Borrowing transactions

It demonstrates clean architecture, modular design, and the use of design patterns to make the system **scalable, maintainable, and extendable**.

---

## 🎯 Objectives

- Apply **Object-Oriented Programming (OOP)** concepts:
  - Classes
  - Inheritance
  - Encapsulation
  - Abstraction

- Implement **Design Patterns**:
  - Factory Pattern
  - Singleton Pattern
  - Observer Pattern (optional)

---

## 🧱 System Architecture

### 🔹 Subsystems

- **User Management**
- **Book Management**
- **Borrowing System**

---

## 🧩 Classes Overview

### 👤 User (Abstract)
- Base class for all users
- مشتركة الخصائص: `id`, `name`, `borrowedBooks`

### 👨‍🎓 Student
- Inherits from `User`
- Max books: 3

### 👨‍🏫 Teacher
- Inherits from `User`
- Max books: 5

### 📘 Book
- Represents a book in the library
- Properties:
  - `id`, `title`, `author`, `isAvailable`

### 🔄 BorrowTransaction
- Handles borrowing logic
- Tracks:
  - Borrow date
  - Return date
  - Overdue status

### 🏛 LibrarySystem (Singleton)
- Central system managing:
  - Users
  - Books
  - Transactions

### 🔔 NotificationService (Observer)
- Notifies users when books are overdue

---

## 🧠 Design Patterns Used

### ✅ Factory Pattern
Used to create users dynamically:
```js
UserFactory.createUser("student", 1, "Karim");
