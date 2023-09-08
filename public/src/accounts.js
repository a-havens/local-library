function findAccountById(accounts, id) {
  //create return that finds matching acct id
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  //create return that sorts last name alphabetically
  accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last ? 1: -1));
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  //set counter to 0
 let totalCount = 0;
  //loop through books to get the borrowed amounts
  for (const book of books) {
    const borrows = book.borrows;
    //loop through to see if id matches
    for (const borrow of borrows) {
      if (borrow.id === account.id) {
        //add to counter
        totalCount++;
      }
    }
  }
  return totalCount;
}

function getBooksPossessedByAccount(account, books, authors) {
  //filter checked out books by acct
   const checkedOutBooks = books.filter((book) => {
    const lastBorrow = book.borrows[0];
    return !lastBorrow.returned && lastBorrow.id === account.id;
  });
  
  const booksWithAuthors = checkedOutBooks.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return {
      ...book,
      author,
    };
  });

  return booksWithAuthors;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
