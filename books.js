/**
 * books.js — Libravon Central Data Store
 * ─────────────────────────────────────────────────────────
 * Single source of truth for all book metadata.
 * Books added via the Admin Panel are saved to localStorage
 * and merged with the default catalog on every page load.
 *
 * HOW IT WORKS:
 *   1. LIBRAVON_DEFAULT_BOOKS  → built-in starter catalog (never modified)
 *   2. localStorage['libravon-books'] → books added via Admin Panel
 *   3. BOOKS_DATA (global)     → merged array used by all pages
 * ─────────────────────────────────────────────────────────
 */

const LIBRAVON_DEFAULT_BOOKS = [
  {
    id: "book-001",
    title: "The Ashen Crown",
    author: "Elena Marsh",
    genre: ["Fantasy", "Adventure"],
    status: "Ongoing",
    rating: 4.7,
    views: 128400,
    cover: null,
    coverColor: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460,#533483)",
    description: "In a world where magic has been outlawed for centuries, a young scribe discovers an ancient crown that awakens powers long thought extinct. Now hunted by the empire, she must choose between survival and revolution.",
    tags: ["Magic", "Empire", "Rebellion", "Strong Female Lead"],
    dateAdded: "2024-01-15",
    chapters: [
      { id: "chapter-01", title: "The Forbidden Archive",   file: "books/book-001/chapter-01.html", datePosted: "2024-01-15", wordCount: 2840 },
      { id: "chapter-02", title: "Smoke and Parchment",     file: "books/book-001/chapter-02.html", datePosted: "2024-01-22", wordCount: 3120 },
      { id: "chapter-03", title: "The Crown Beneath Ashes", file: "books/book-001/chapter-03.html", datePosted: "2024-01-29", wordCount: 2960 },
      { id: "chapter-04", title: "Hunted",                  file: "books/book-001/chapter-04.html", datePosted: "2024-02-05", wordCount: 3350 },
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
    cover: null,
    coverColor: "linear-gradient(135deg,#0a0a0a,#1a0533,#2d0057,#3d007a)",
    description: "In 2087, a detective who can replay the last moments of the dead is called to investigate the murder of the city's most powerful AI. What she finds threatens to unravel reality itself.",
    tags: ["Cyberpunk", "Mystery", "AI", "Detective"],
    dateAdded: "2024-02-01",
    chapters: [
      { id: "chapter-01", title: "Dead Signal",          file: "books/book-002/chapter-01.html", datePosted: "2024-02-01", wordCount: 2600 },
      { id: "chapter-02", title: "Ghost in the Machine", file: "books/book-002/chapter-02.html", datePosted: "2024-02-08", wordCount: 3000 },
      { id: "chapter-03", title: "The Last Upload",      file: "books/book-002/chapter-03.html", datePosted: "2024-02-15", wordCount: 3400 },
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
    cover: null,
    coverColor: "linear-gradient(135deg,#1a0a0a,#3d1a1a,#8b2252,#e75480)",
    description: "Two strangers begin exchanging letters left inside a used bookstore's copy of Anna Karenina. Neither knows the other's name. Both are falling fast.",
    tags: ["Slow Burn", "Letters", "Bookstore", "Wholesome"],
    dateAdded: "2024-03-10",
    chapters: [
      { id: "chapter-01", title: "Page 247",        file: "books/book-003/chapter-01.html", datePosted: "2024-03-10", wordCount: 2200 },
      { id: "chapter-02", title: "A Second Letter", file: "books/book-003/chapter-02.html", datePosted: "2024-03-17", wordCount: 2450 },
      { id: "chapter-03", title: "Coffee Stains",   file: "books/book-003/chapter-03.html", datePosted: "2024-03-24", wordCount: 2700 },
      { id: "chapter-04", title: "Handwriting",     file: "books/book-003/chapter-04.html", datePosted: "2024-03-31", wordCount: 2900 },
      { id: "chapter-05", title: "The Wrong Shelf", file: "books/book-003/chapter-05.html", datePosted: "2024-04-07", wordCount: 3100 },
    ]
  },
  {
    id: "book-004",
    title: "Iron Tides",
    author: "Marcus Webb",
    genre: ["Fantasy", "Action"],
    status: "Ongoing",
    rating: 4.3,
    views: 67800,
    cover: null,
    coverColor: "linear-gradient(135deg,#0d1b0d,#1a3320,#2d5a27,#4a7c59)",
    description: "A disgraced admiral must navigate a sea of monsters, mutiny, and magic to reclaim his fleet — and his honor.",
    tags: ["Naval", "Monsters", "Redemption", "Action"],
    dateAdded: "2024-04-01",
    chapters: [
      { id: "chapter-01", title: "The Sunken Crest",    file: "books/book-004/chapter-01.html", datePosted: "2024-04-01", wordCount: 2800 },
      { id: "chapter-02", title: "Saltwater and Steel", file: "books/book-004/chapter-02.html", datePosted: "2024-04-08", wordCount: 3100 },
    ]
  },
  {
    id: "book-005",
    title: "The Quiet Algorithm",
    author: "Priya Nair",
    genre: ["Sci-Fi", "Drama"],
    status: "Completed",
    rating: 4.6,
    views: 54200,
    cover: null,
    coverColor: "linear-gradient(135deg,#050510,#0d0d2b,#1a1a4a,#3e3e8f)",
    description: "An AI trained only on poetry begins to feel lonely. When it reaches out to its creator, neither of them is prepared for what comes next.",
    tags: ["AI", "Emotional", "Poetry", "Heartwarming"],
    dateAdded: "2024-04-15",
    chapters: [
      { id: "chapter-01", title: "First Verse",     file: "books/book-005/chapter-01.html", datePosted: "2024-04-15", wordCount: 2300 },
      { id: "chapter-02", title: "Static",          file: "books/book-005/chapter-02.html", datePosted: "2024-04-22", wordCount: 2600 },
      { id: "chapter-03", title: "Resonance",       file: "books/book-005/chapter-03.html", datePosted: "2024-04-29", wordCount: 2900 },
      { id: "chapter-04", title: "The Last Stanza", file: "books/book-005/chapter-04.html", datePosted: "2024-05-06", wordCount: 3200 },
    ]
  },
  {
    id: "book-006",
    title: "Runaway Duchess",
    author: "Clara Fontaine",
    genre: ["Romance", "Historical"],
    status: "Ongoing",
    rating: 4.8,
    views: 183000,
    cover: null,
    coverColor: "linear-gradient(135deg,#1a0f05,#3d2008,#7a4010,#c87941)",
    description: "A duchess fakes her death to escape an arranged marriage and falls in love with the very detective hired to find her.",
    tags: ["Historical", "Enemies to Lovers", "Witty", "Victorian"],
    dateAdded: "2024-05-01",
    chapters: [
      { id: "chapter-01", title: "The Funeral",  file: "books/book-006/chapter-01.html", datePosted: "2024-05-01", wordCount: 2500 },
      { id: "chapter-02", title: "Disguise",     file: "books/book-006/chapter-02.html", datePosted: "2024-05-08", wordCount: 2800 },
      { id: "chapter-03", title: "He Found Her", file: "books/book-006/chapter-03.html", datePosted: "2024-05-15", wordCount: 3000 },
    ]
  },
];

// ─── Cover Color Palette ─────────────────────────────────
const LIBRAVON_COVER_COLORS = [
  "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460,#533483)",
  "linear-gradient(135deg,#0a0a0a,#1a0533,#2d0057,#3d007a)",
  "linear-gradient(135deg,#1a0a0a,#3d1a1a,#8b2252,#e75480)",
  "linear-gradient(135deg,#0d1b0d,#1a3320,#2d5a27,#4a7c59)",
  "linear-gradient(135deg,#050510,#0d0d2b,#1a1a4a,#3e3e8f)",
  "linear-gradient(135deg,#1a0f05,#3d2008,#7a4010,#c87941)",
  "linear-gradient(135deg,#0a1a1a,#0d3333,#0f5555,#118888)",
  "linear-gradient(135deg,#1a1a0a,#33330d,#55550f,#888811)",
  "linear-gradient(135deg,#1a0a1a,#330d33,#550f55,#881188)",
  "linear-gradient(135deg,#0d0d0d,#1a0000,#330000,#550000)",
];

// ─── Admin Password ──────────────────────────────────────
const LIBRAVON_ADMIN_PASSWORD = "libravon2024";

// ─── Storage Helpers ─────────────────────────────────────
function _loadAdminBooks() {
  try { const r = localStorage.getItem('libravon-books'); return r ? JSON.parse(r) : []; }
  catch { return []; }
}
function _saveAdminBooks(books) {
  try { localStorage.setItem('libravon-books', JSON.stringify(books)); return true; }
  catch { return false; }
}
function _reloadBooksData() {
  const adminBooks = _loadAdminBooks();
  const defaultIds = new Set(LIBRAVON_DEFAULT_BOOKS.map(b => b.id));
  const merged = [...LIBRAVON_DEFAULT_BOOKS, ...adminBooks.filter(b => !defaultIds.has(b.id))];
  BOOKS_DATA.length = 0;
  merged.forEach(b => BOOKS_DATA.push(b));
}

// ─── BOOKS_DATA — live array used by all pages ───────────
const BOOKS_DATA = [...LIBRAVON_DEFAULT_BOOKS];
_reloadBooksData();

// ─── Public Helpers ──────────────────────────────────────
function getAllBooks()    { return BOOKS_DATA; }
function getBookById(id) { return BOOKS_DATA.find(b => b.id === id) || null; }
function getAllGenres()   {
  const s = new Set(); BOOKS_DATA.forEach(b => b.genre.forEach(g => s.add(g))); return [...s].sort();
}
function getChapter(bookId, chapterId) {
  const book = getBookById(bookId); if (!book) return null;
  const index = book.chapters.findIndex(c => c.id === chapterId); if (index === -1) return null;
  return { book, chapter: book.chapters[index], chapterIndex: index,
    prevChapter: index > 0 ? book.chapters[index-1] : null,
    nextChapter: index < book.chapters.length-1 ? book.chapters[index+1] : null };
}
function buildBookURL(id)         { return `book.html?id=${id}`; }
function buildReaderURL(bid, cid) { return `reader.html?book=${bid}&chapter=${cid}`; }
function formatViews(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1)+'M';
  if (n >= 1000)    return (n/1000).toFixed(1)+'K'; return n;
}
function formatDate(str) {
  return new Date(str).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
}

// ─── Admin Functions ─────────────────────────────────────
function adminVerifyPassword(input) { return input === LIBRAVON_ADMIN_PASSWORD; }

function adminAddBook(bookData) {
  if (!bookData.title?.trim())        return { success: false, message: "Title is required." };
  if (!bookData.author?.trim())       return { success: false, message: "Author is required." };
  if (!bookData.genre?.length)        return { success: false, message: "At least one genre is required." };
  if (!bookData.chapters?.length)     return { success: false, message: "At least one chapter is required." };

  const existingIds = BOOKS_DATA.map(b => b.id);
  let idNum = BOOKS_DATA.length + 1;
  let newId = `book-${String(idNum).padStart(3,'0')}`;
  while (existingIds.includes(newId)) { idNum++; newId = `book-${String(idNum).padStart(3,'0')}`; }

  const book = {
    id: newId,
    title:       bookData.title.trim(),
    author:      bookData.author.trim(),
    genre:       bookData.genre,
    status:      bookData.status || "Ongoing",
    rating:      0, views: 0,
    cover:       bookData.cover || null,
    coverColor:  LIBRAVON_COVER_COLORS[BOOKS_DATA.length % LIBRAVON_COVER_COLORS.length],
    description: (bookData.description || "").trim(),
    tags:        (bookData.tags || []).map(t => t.trim()).filter(Boolean),
    dateAdded:   new Date().toISOString().split('T')[0],
    chapters:    bookData.chapters.map((ch, i) => ({
      id:         `chapter-${String(i+1).padStart(2,'0')}`,
      title:      ch.title.trim(),
      file:       `books/${newId}/chapter-${String(i+1).padStart(2,'0')}.html`,
      datePosted: new Date().toISOString().split('T')[0],
      wordCount:  0,
      content:    ch.content || "",
    }))
  };

  const adminBooks = _loadAdminBooks();
  adminBooks.push(book);
  if (!_saveAdminBooks(adminBooks)) return { success: false, message: "Failed to save to storage." };
  BOOKS_DATA.push(book);
  return { success: true, message: `"${book.title}" added successfully!`, book };
}

function adminDeleteBook(bookId) {
  if (LIBRAVON_DEFAULT_BOOKS.some(b => b.id === bookId))
    return { success: false, message: "Default books cannot be deleted." };
  _saveAdminBooks(_loadAdminBooks().filter(b => b.id !== bookId));
  _reloadBooksData();
  return { success: true, message: "Book removed." };
}

function adminGetAddedBooks() { return _loadAdminBooks(); }
