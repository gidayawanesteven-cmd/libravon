const LIBRAVON_DEFAULT_BOOKS = [];
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
const LIBRAVON_ADMIN_PASSWORD = "libravon2024";
function _loadAdminBooks() {
  try { const r = localStorage.getItem('libravon-books'); return r ? JSON.parse(r) : []; }
  catch { return []; }
}
function _saveAdminBooks(books) {
  try { localStorage.setItem('libravon-books', JSON.stringify(books)); return true; }
  catch { return false; }
}
function _reloadBooksData() {
  const books = _loadAdminBooks();
  BOOKS_DATA.length = 0;
  books.forEach(b => BOOKS_DATA.push(b));
}
const BOOKS_DATA = [];
_reloadBooksData();
function getAllBooks()    { return BOOKS_DATA; }
function getBookById(id) { return BOOKS_DATA.find(b => b.id === id) || null; }
function getAllGenres() {
  const s = new Set();
  BOOKS_DATA.forEach(b => b.genre.forEach(g => s.add(g)));
  return [...s].sort();
}
function getChapter(bookId, chapterId) {
  const book = getBookById(bookId); if (!book) return null;
  const index = book.chapters.findIndex(c => c.id === chapterId); if (index === -1) return null;
  return {
    book, chapter: book.chapters[index], chapterIndex: index,
    prevChapter: index > 0 ? book.chapters[index - 1] : null,
    nextChapter: index < book.chapters.length - 1 ? book.chapters[index + 1] : null,
  };
}
function buildBookURL(id)         { return `book.html?id=${id}`; }
function buildReaderURL(bid, cid) { return `reader.html?book=${bid}&chapter=${cid}`; }
function formatViews(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000)    return (n / 1000).toFixed(1) + 'K';
  return n;
}
function formatDate(str) {
  return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
function adminVerifyPassword(input) {
  return input === LIBRAVON_ADMIN_PASSWORD;
}
function adminAddBook(bookData) {
  if (!bookData.title?.trim())    return { success: false, message: "Title is required." };
  if (!bookData.author?.trim())   return { success: false, message: "Author is required." };
  if (!bookData.genre?.length)    return { success: false, message: "At least one genre is required." };
  if (!bookData.chapters?.length) return { success: false, message: "At least one chapter is required." };

  const existingIds = _loadAdminBooks().map(b => b.id);
  let idNum = existingIds.length + 1;
  let newId = `book-${String(idNum).padStart(3, '0')}`;
  while (existingIds.includes(newId)) { idNum++; newId = `book-${String(idNum).padStart(3, '0')}`; }

  const adminBooks = _loadAdminBooks();
  const book = {
    id:          newId,
    title:       bookData.title.trim(),
    author:      bookData.author.trim(),
    genre:       bookData.genre,
    status:      bookData.status || "Ongoing",
    rating:      0,
    views:       0,
    cover:       bookData.cover || null,
    coverColor:  LIBRAVON_COVER_COLORS[adminBooks.length % LIBRAVON_COVER_COLORS.length],
    description: (bookData.description || "").trim(),
    tags:        (bookData.tags || []).map(t => t.trim()).filter(Boolean),
    dateAdded:   new Date().toISOString().split('T')[0],
    chapters:    bookData.chapters.map((ch, i) => ({
      id:         `chapter-${String(i + 1).padStart(2, '0')}`,
      title:      ch.title.trim(),
      file:       `books/${newId}/chapter-${String(i + 1).padStart(2, '0')}.html`,
      datePosted: new Date().toISOString().split('T')[0],
      wordCount:  0,
      content:    ch.content || "",
    }))
  };

  adminBooks.push(book);
  if (!_saveAdminBooks(adminBooks)) return { success: false, message: "Failed to save. Storage may be full." };
  _reloadBooksData();
  return { success: true, message: `"${book.title}" published successfully!`, book };
}

function adminAddChapter(bookId, chapterData) {
  if (!chapterData.title?.trim())   return { success: false, message: "Chapter title is required." };
  if (!chapterData.content?.trim()) return { success: false, message: "Chapter content is required." };

  const adminBooks = _loadAdminBooks();
  const bookIndex  = adminBooks.findIndex(b => b.id === bookId);
  if (bookIndex === -1) return { success: false, message: "Book not found." };

  const book      = adminBooks[bookIndex];
  const newChNum  = book.chapters.length + 1;
  const newChId   = `chapter-${String(newChNum).padStart(2, '0')}`;

  const existingChIds = book.chapters.map(c => c.id);
  let chId = newChId;
  let chNum = newChNum;
  while (existingChIds.includes(chId)) {
    chNum++;
    chId = `chapter-${String(chNum).padStart(2, '0')}`;
  }

  const newChapter = {
    id:         chId,
    title:      chapterData.title.trim(),
    file:       `books/${bookId}/${chId}.html`,
    datePosted: new Date().toISOString().split('T')[0],
    wordCount:  0,
    content:    chapterData.content.trim(),
  };

  adminBooks[bookIndex].chapters.push(newChapter);
  if (!_saveAdminBooks(adminBooks)) return { success: false, message: "Failed to save chapter." };
  _reloadBooksData();
  return { success: true, message: `Chapter "${newChapter.title}" added!`, chapter: newChapter };
}

function adminDeleteChapter(bookId, chapterId) {
  const adminBooks = _loadAdminBooks();
  const bookIndex  = adminBooks.findIndex(b => b.id === bookId);
  if (bookIndex === -1) return { success: false, message: "Book not found." };

  const book = adminBooks[bookIndex];
  if (book.chapters.length <= 1) return { success: false, message: "A book must have at least one chapter." };

  adminBooks[bookIndex].chapters = book.chapters.filter(c => c.id !== chapterId);
  if (!_saveAdminBooks(adminBooks)) return { success: false, message: "Failed to save." };
  _reloadBooksData();
  return { success: true, message: "Chapter removed." };
}
function adminDeleteBook(bookId) {
  _saveAdminBooks(_loadAdminBooks().filter(b => b.id !== bookId));
  _reloadBooksData();
  return { success: true, message: "Book removed." };
}

function adminGetAddedBooks() { return _loadAdminBooks(); }
