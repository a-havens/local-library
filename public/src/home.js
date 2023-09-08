function getTotalBooksCount(books) {
  //count books
  const totalBooks = books.reduce((result, book) => {
    //add to counter
    return result + 1;
  }, 0);
  return totalBooks;
}

function getTotalAccountsCount(accounts) {
  //count accts
  const totalAccounts = accounts.reduce((result, account) => {
    //add to counter
    return result + 1;
  }, 0);
  return totalAccounts;
}

function getBooksBorrowedCount(books) {
  // Check the first transaction in the borrows array of each book
  return books.reduce((count, book) => {
   // If the first transaction exists and is not returned, increment the count 
    const [firstTransaction] = book.borrows;
    if (firstTransaction && !firstTransaction.returned) {
      count++;
    }
    return count;
  }, 0);
}

function getMostCommonGenres(books) {
  
   // create counter for genres
  const genreCount = {};

  // go through books to count each genre
  for (const book of books) {
    const genres = book.genre.split(', ');
    for (const genre of genres) {
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    }
  }

  // Convert count into an array
  const genreArray = Object.keys(genreCount).map((genre) => ({
    name: genre,
    count: genreCount[genre],
  }));

  // Sort the array decending
  genreArray.sort((a, b) => b.count - a.count);

  // Return the top 5 
  return genreArray.slice(0, 5);
}

function getMostPopularBooks(books) {
// Create array to store book popularity
  const bookPopularity = [];
//go through books and add popularity info to the array
  for (const book of books) {
    bookPopularity.push({
      name: book.title,
      count: book.borrows.length, //count borrowers
    });
  }

// sort the array in decending order
   bookPopularity.sort((a, b) => b.count - a.count);

  // Return the top 5 most popular books
  return bookPopularity.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  
  const result = authors.map((author) => {
    
    const fullName = `${author.name.first} ${author.name.last}`;
    const booksByAuthor = books.filter((book) => book.authorId === author.id);
    const totalBorrows = booksByAuthor.reduce((accum, book) => accum + book.borrows.length, 0);
    const newAuthorInfo = {
      name: fullName,
      count: totalBorrows,
      
    };
    
  return newAuthorInfo;
    
  });
  
  result.sort((authorA, authorB) => authorB.count - authorA.count);
  result.splice(5);

  return result
  
}
    
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
