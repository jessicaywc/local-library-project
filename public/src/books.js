function findAuthorById(authors, id) {
  let findAuthor = authors.find((author) => author.id === id);
  return findAuthor;
}

function findBookById(books, id) {
  let findBook = books.find((book) => book.id === id);
  return findBook;
}

//created a helper function to support the partitionBooksByBorrowedStatus function
function getReturnedBooks(books) {
  return books.filter((book) =>
    book.borrows.every((borrow) => borrow.returned === true)
  );
}
function partitionBooksByBorrowedStatus(books) {
  //create an array of books that are currently checked out
  //create an array the second array contains book objects that represent the books _that have been returned.
  //the .filter() method looks thru the array to see if every item is returned or not. use a helper function of .every method to check if the condition is true
  // then creates a new array of the books that match that criteria
  let booksReturned = getReturnedBooks(books);
  //look thru the new array and see which ones are borrowed. used the .filtered method to go look thru the array
  //then use a helper function .some method to check if our condition is true within the new array
  let booksBorrowed = books.filter((book) =>
    book.borrows.some((borrow) => borrow.returned === false)
  );
  //use the spread operator to combime the arrays together
  let allBooks = [[...booksBorrowed], [...booksReturned]];
  return allBooks;
}

function getBorrowersForBook(book, accounts) {
  // create an array of account objects that have borrowed the book, and each account object should include the returned entry from the object in the borrows array.
  // to do this, we need to loop of the borrowed IDs. then find the account ID that matches the borrowed ID.
  return (
    book.borrows
      .map((borrow) => {
        //after going thru each item in the borrows array, use the .find method to the accounts array to locate matching ID
        let account = accounts.find((account) => account.id === borrow.id);
        //using the spread syntax to combine the two arrays
        return { ...borrow, ...account };
      })
      //slice method to create an array for only 0-10
      .slice(0, 10)
  );
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
