/**
 * books.js — Central Metadata Store
 * This file acts as the "database" for the reading platform.
 * All book info, chapter lists, and metadata live here.
 * No backend or database needed — just update this file when adding new books.
 */

const BOOKS_DATA = [
  {
    id: "book-001",
    title: "The Ashen Crown",
    author: "Elena Marsh",
    genre: ["Fantasy", "Adventure"],
    status: "Ongoing",        // "Ongoing" | "Completed"
    rating: 4.7,
    views: 128400,
    cover: "books/book-001/cover.jpg",
    description: `In a world where magic has been outlawed for centuries, 
      a young scribe discovers an ancient crown that awakens powers 
      long thought extinct. Now hunted by the empire, she must 
      choose between survival and revolution.`,
    tags: ["Magic", "Empire", "Rebellion", "Strong Female Lead"],
    dateAdded: "2024-01-15",
    chapters: [
      { id: "chapter-01", title: "The Forbidden Archive",    file: "books/book-001/chapter-01.html", datePosted: "2024-01-15" },
      { id: "chapter-02", title: "Smoke and Parchment",      file: "books/book-001/chapter-02.html", datePosted: "2024-01-22" },
      { id: "chapter-03", title: "The Crown Beneath Ashes",  file: "books/book-001/chapter-03.html", datePosted: "2024-01-29" },
      { id: "chapter-04", title: "Hunted",                   file: "books/book-001/chapter-04.html", datePosted: "2024-02-05" },
    ]
  },
  {
    id: "book-002",
    title: "Neon Requiem",
    author: "James T. Holt",
    genre: ["Sci-Fi", "Thriller"],
    status: "Completed",
    rating: 4.5,
    views: 95300,
    cover: "books/book-002/cover.jpg",
    description: `In 2087, a detective who can replay the last moments 
      of the dead is called to investigate the murder of the city's 
      most powerful AI. What she finds threatens to unravel reality itself.`,
    tags: ["Cyberpunk", "Mystery", "AI", "Detective"],
    dateAdded: "2024-02-01",
    chapters: [
      { id: "chapter-01", title: "Dead Signal",          file: "books/book-002/chapter-01.html", datePosted: "2024-02-01" },
      { id: "chapter-02", title: "Ghost in the Machine", file: "books/book-002/chapter-02.html", datePosted: "2024-02-08" },
      { id: "chapter-03", title: "The Last Upload",      file: "books/book-002/chapter-03.html", datePosted: "2024-02-15" },
    ]
  },
  {
    id: "book-003",
    title: "Letters to Nowhere",
    author: "Sofia Reyes",
    genre: ["Romance", "Slice of Life"],
    status: "Ongoing",
    rating: 4.9,
    views: 210000,
    cover: "books/book-003/cover.jpg",
    description: `Two strangers begin exchanging letters left inside 
      a used bookstore's copy of Anna Karenina. Neither knows the other's 
      name. Both are falling fast.`,
    tags: ["Slow Burn", "Letters", "Bookstore", "Wholesome"],
    dateAdded: "2024-03-10",
    chapters: [
      { id: "chapter-01", title: "Page 247",           file: "books/book-003/chapter-01.html", datePosted: "2024-03-10" },
      { id: "chapter-02", title: "A Second Letter",    file: "books/book-003/chapter-02.html", datePosted: "2024-03-17" },
      { id: "chapter-03", title: "Coffee Stains",      file: "books/book-003/chapter-03.html", datePosted: "2024-03-24" },
      { id: "chapter-04", title: "Handwriting",        file: "books/book-003/chapter-04.html", datePosted: "2024-03-31" },
      { id: "chapter-05", title: "The Wrong Shelf",    file: "books/book-003/chapter-05.html", datePosted: "2024-04-07" },
    ]
  }
];


// ─────────────────────────────────────────────
// HELPER FUNCTIONS
// These are used by all pages to query the data.
// ─────────────────────────────────────────────

/**
 * Get all books (for the homepage browser).
 * @returns {Array} Full list of book objects.
 */
function getAllBooks() {
  return BOOKS_DATA;
}

/**
 * Get a single book by its ID.
 * @param {string} bookId - e.g. "book-001"
 * @returns {Object|null} The book object, or null if not found.
 */
function getBookById(bookId) {
  return BOOKS_DATA.find(book => book.id === bookId) || null;
}

/**
 * Get a specific chapter object from a book.
 * @param {string} bookId    - e.g. "book-001"
 * @param {string} chapterId - e.g. "chapter-02"
 * @returns {Object|null} { chapter, chapterIndex, book, prevChapter, nextChapter }
 */
function getChapter(bookId, chapterId) {
  const book = getBookById(bookId);
  if (!book) return null;

  const index = book.chapters.findIndex(ch => ch.id === chapterId);
  if (index === -1) return null;

  return {
    book,
    chapter:     book.chapters[index],
    chapterIndex: index,                              // 0-based
    prevChapter: index > 0 ? book.chapters[index - 1] : null,
    nextChapter: index < book.chapters.length - 1 ? book.chapters[index + 1] : null,
  };
}

/**
 * Search books by title, author, or tag.
 * @param {string} query - The search string.
 * @returns {Array} Matching book objects.
 */
function searchBooks(query) {
  const q = query.toLowerCase().trim();
  return BOOKS_DATA.filter(book =>
    book.title.toLowerCase().includes(q) ||
    book.author.toLowerCase().includes(q) ||
    book.tags.some(tag => tag.toLowerCase().includes(q)) ||
    book.genre.some(g => g.toLowerCase().includes(q))
  );
}

/**
 * Filter books by genre.
 * @param {string} genre - e.g. "Fantasy"
 * @returns {Array} Books that include that genre.
 */
function filterByGenre(genre) {
  return BOOKS_DATA.filter(book =>
    book.genre.map(g => g.toLowerCase()).includes(genre.toLowerCase())
  );
}

/**
 * Get all unique genres across all books.
 * @returns {string[]} Sorted list of genre strings.
 */
function getAllGenres() {
  const genreSet = new Set();
  BOOKS_DATA.forEach(book => book.genre.forEach(g => genreSet.add(g)));
  return [...genreSet].sort();
}

/**
 * Build a reader page URL from book ID and chapter ID.
 * @param {string} bookId
 * @param {string} chapterId
 * @returns {string} URL string.
 */
function buildReaderURL(bookId, chapterId) {
  return `reader.html?book=${bookId}&chapter=${chapterId}`;
}

/**
 * Build a book detail page URL from book ID.
 * @param {string} bookId
 * @returns {string} URL string.
 */
function buildBookURL(bookId) {
  return `book.html?id=${bookId}`;
}


// ─────────────────────────────────────────────
// HOW TO ADD A NEW BOOK
// ─────────────────────────────────────────────
//
// 1. Create a new folder:   /books/book-004/
// 2. Add your cover image:  /books/book-004/cover.jpg
// 3. Add chapter HTML files: /books/book-004/chapter-01.html, etc.
// 4. Copy the object template below and paste it into BOOKS_DATA:
//
// {
//   id: "book-004",
//   title: "Your Book Title",
//   author: "Author Name",
//   genre: ["Genre1", "Genre2"],
//   status: "Ongoing",
//   rating: 0,
//   views: 0,
//   cover: "books/book-004/cover.jpg",
//   description: `Your book description here.`,
//   tags: ["Tag1", "Tag2"],
//   dateAdded: "2024-05-01",
//   chapters: [
//     { id: "chapter-01", title: "Chapter Title", file: "books/book-004/chapter-01.html", datePosted: "2024-05-01" },
//   ]
// },
