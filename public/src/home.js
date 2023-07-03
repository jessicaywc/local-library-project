// To count how many items in an object, we can use .length 
const getTotalBooksCount = books => books.length

const getTotalAccountsCount = accounts => accounts.length

const getBooksBorrowedCount = books => {
//return the number of books that are checked out. Do this by filtering thru the books array, use .filter method
//.filter creates a new array. if the books borrowed are false (are not returned), return the length
let borrowedBooks = books.filter((book) => !book.borrows[0].returned).length
return borrowedBooks
}

function getMostCommonGenres(books) {
  //create a variable to count the genre. Use the reduce method to loop the items in the books array. We want just the genre key, so use destructuring to directly extract the genre property from each book object
  //define the variable: access the key that have genre in the book object. If the property exists, retrieve the value. if not, it will be undefined (default value = 0)
    const genreCount = books.reduce((count, { genre }) => {
      count[genre] = (count[genre] || 0) + 1;
      return count;
    }, {});
// after the genreCount object is created, we have to format to match what's required. Use Object.keys to return an array only containing the keys of the object
//use .map to map each genre key to create two properties: name and count. Name is set to genre key and the count property is set to the count value from genreCount object
// use the sort method to sort the array of genre objects in descending order
//.slice method to retrieve the top 5 elements with the highest count
return Object.keys(genreCount)
.map((name) => ({ name, count: genreCount[name] }))
.sort((countA, countB) => countB.count - countA.count)
.slice(0, 5);
}


function getMostPopularBooks(books) {
  //iterate over the books object then access the borrows array. get the length of the borrows array that represents the borrowing history of books
  //create a name and count object there the name is the book title and the count is the number of times it's been borrowed
  const popularBooks = books.map((book) => {
    return { name: book.title, count: book.borrows.length };
  });
//once the object is created, sort it so the books are in descending order
  popularBooks.sort((bookA, bookB) => bookB.count - bookA.count);
//once sorted, we want it to only contain up to five objects. use the .slice method to extract only the first five.
  return popularBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  // Create an array of author objects
  const popularAuthors = authors.map((author) => {
    const { id, name } = author;

    //Filter books by the author and calculate borrowing count. 
    const authorBooks = books.filter((book) => book.authorId === id);
    const borrowingCount = authorBooks.reduce((total, book) => total + book.borrows.length, 0);

    //Create an author object with name and count properties
    const authorObject = {
      name: `${name.first} ${name.last}`,
      count: borrowingCount
    };

    return authorObject;
  });

  //Sort the array in descending order based on borrowing count
  const sortedAuthors = popularAuthors.sort((countA, countB) => countB.count - countA.count);

  // Step 5: Slice the array to get the top 5 authors
  const topAuthors = sortedAuthors.slice(0, 5);

  return topAuthors;
}
 
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
