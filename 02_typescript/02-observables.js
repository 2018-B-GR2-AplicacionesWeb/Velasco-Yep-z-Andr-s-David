// npm install rxjs
// 02-observables
const rxjs = require('rxjs');
const numeros$ = rxjs.of(1, 2, 3, 4, 5, 6); // Con el $ al final del nombre
numeros$
    .subscribe((ok) => {
    console.log('En ok', ok);
}, (error) => {
    console.log('Error:', error);
}, () => {
});
