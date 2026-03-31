// =======================
// ABSTRACT USER CLASS
// =======================
class User {
  constructor(id, name) {
    if (this.constructor === User) {
      throw new Error("Abstract class cannot be instantiated");
    }
    this.id = id;
    this.name = name;
    this.borrowedBooks = [];
  }

  notify(message) {
    console.log(`📢 Notification for ${this.name}: ${message}`);
  }
}

// =======================
// STUDENT CLASS
// =======================
class Student extends User {
  constructor(id, name) {
    super(id, name);
    this.maxBooks = 3;
  }
}

// =======================
// TEACHER CLASS
// =======================
class Teacher extends User {
  constructor(id, name) {
    super(id, name);
    this.maxBooks = 5;
  }
}

// =======================
// FACTORY PATTERN
// =======================
class UserFactory {
  static createUser(type, id, name) {
    switch (type) {
      case "student":
        return new Student(id, name);
      case "teacher":
        return new Teacher(id, name);
      default:
        throw new Error("Invalid user type");
    }
  }
}

// =======================
// BOOK CLASS
// =======================
class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isAvailable = true;
  }
}

// =======================
// BORROW TRANSACTION
// =======================
class BorrowTransaction {
  constructor(user, book) {
    this.user = user;
    this.book = book;
    this.borrowDate = new Date();
    this.returnDate = null;
    this.isOverdue = false;
  }

  returnBook() {
    this.returnDate = new Date();
    this.book.isAvailable = true;
  }
}

// =======================
// OBSERVER PATTERN (Notification Service)
// =======================
class NotificationService {
  constructor() {
    this.subscribers = [];
  }

  subscribe(user) {
    this.subscribers.push(user);
  }

  notifyAll(message) {
    this.subscribers.forEach((user) => user.notify(message));
  }
}

// =======================
// SINGLETON PATTERN
// =======================
class LibrarySystem {
  constructor() {
    if (LibrarySystem.instance) {
      return LibrarySystem.instance;
    }

    this.users = [];
    this.books = [];
    this.transactions = [];
    this.notificationService = new NotificationService();

    LibrarySystem.instance = this;
  }

  // ===================
  // USER MANAGEMENT
  // ===================
  addUser(user) {
    this.users.push(user);
    this.notificationService.subscribe(user);
  }

  // ===================
  // BOOK MANAGEMENT
  // ===================
  addBook(book) {
    this.books.push(book);
  }

  // ===================
  // BORROW BOOK
  // ===================
  borrowBook(userId, bookId) {
    const user = this.users.find((u) => u.id === userId);
    const book = this.books.find((b) => b.id === bookId);

    if (!user || !book) {
      console.log("User or Book not found");
      return;
    }

    if (!book.isAvailable) {
      console.log("Book not available");
      return;
    }

    if (user.borrowedBooks.length >= user.maxBooks) {
      console.log("User reached max borrow limit");
      return;
    }

    const transaction = new BorrowTransaction(user, book);

    book.isAvailable = false;
    user.borrowedBooks.push(book);
    this.transactions.push(transaction);

    console.log(`${user.name} borrowed "${book.title}"`);
  }

  // ===================
  // RETURN BOOK
  // ===================
  returnBook(userId, bookId) {
    const transaction = this.transactions.find(
      (t) => t.user.id === userId && t.book.id === bookId && !t.returnDate
    );

    if (!transaction) {
      console.log("Transaction not found");
      return;
    }

    transaction.returnBook();

    const user = transaction.user;
    user.borrowedBooks = user.borrowedBooks.filter((b) => b.id !== bookId);

    console.log(`${user.name} returned "${transaction.book.title}"`);
  }

  // ===================
  // VIEW BORROWED BOOKS
  // ===================
  viewBorrowedBooks(userId) {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return;

    console.log(`📚 ${user.name}'s books:`);
    user.borrowedBooks.forEach((book) => {
      console.log(`- ${book.title}`);
    });
  }

  // ===================
  // CHECK OVERDUE
  // ===================
  checkOverdue() {
    const now = new Date();

    this.transactions.forEach((transaction) => {
      if (!transaction.returnDate) {
        const days = (now - transaction.borrowDate) / (1000 * 60 * 60 * 24);

        if (days > 7 && !transaction.isOverdue) {
          transaction.isOverdue = true;

          this.notificationService.notifyAll(
            `Book "${transaction.book.title}" is overdue!`
          );
        }
      }
    });
  }
}




/*********************** Example Usage ***********************/

const library = new LibrarySystem();

// Create users via Factory
const user1 = UserFactory.createUser("student", 1, "Karim");
const user2 = UserFactory.createUser("teacher", 2, "Ali");

// Add users
library.addUser(user1);
library.addUser(user2);

// Add books
library.addBook(new Book(1, "Clean Code", "Robert C. Martin"));
library.addBook(new Book(2, "JavaScript Guide", "MDN"));

// Borrow books
library.borrowBook(1, 1);
library.borrowBook(2, 2);

// View borrowed books
library.viewBorrowedBooks(1);

// Return book
library.returnBook(1, 1);

// Simulate overdue
library.checkOverdue();