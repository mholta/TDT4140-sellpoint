/* 
EXAMPLE
Performing HTTP POST to backend using axios library

axios
.post<User>('http://localhost:8000/user/post/', user)
.then((response) => console.log('HTTP POST response', response))
.catch((error) => {
  console.log(error);
  // TODO: Add custom alert
  alert(
    'Det eksisterer allerede en bruker med epostadresse "' +
      data.email +
      '".\nPrøv å logg inn heller.'
  );
});

*/
