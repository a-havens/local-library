function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
 // Helper function
 function isBorrowed(book) {
  return !book.borrows[0].returned;
}

//array of checked out
const booksOut = books.filter(isBorrowed);

//array of checked in
const booksIn = books.filter((book) => !isBorrowed(book));

// Combine arrays
return [booksOut, booksIn];
}

function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  const borrowers = [];

  let count = 0;

  for (const borrow of borrows) {
    if (count >= 10) {
      break;
    }
    
    const account = accounts.find((account) => account.id === borrow.id);
    if (account) {
      const borrower = {
        ...account,
        returned: borrow.returned,
      };
      borrowers.push(borrower);
      count++;
    }
  }

  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
