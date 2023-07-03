const findAccountById = (accounts, id) => {
  //use the find method to find all the account ID's that match the id in the given argument
  let findId = accounts.find((account) => account.id === id) 
   return findId
}

const sortAccountsByLastName = accounts => {
  //they want alphabetical order of last names. use the sort method to create that array
  accounts.sort((accountA, accountB) => accountA.name.last < accountB.name.last ? -1 : 1)
  return accounts}

  const getTotalNumberOfBorrows = (account, books) => {
    //the account object's ID matches the books id. 
    //they want to know the total number of borrows. 
    //Go thru books object, then  the borrowed object within
    // then see if the accounts ID matched any of the borrowed ID. if they do, return as a number
   let totalBorrows = 0;
 for (let i = 0; i < books.length; i++) {
  for (let j = 0; j < books[i].borrows.length; j++) {
   if (account.id === books[i].borrows[j].id) {
    totalBorrows += 1;
   }
  }
 }
 return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  const checkedOutBooks = [];
  for (const book of books) {
    if (book.borrows.some((borrow) => borrow.id === account.id && !borrow.returned)) {
      const author = authors.find((author) => author.id === book.authorId);
      checkedOutBooks.push({ ...book, author });
    }
  }
  return checkedOutBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
