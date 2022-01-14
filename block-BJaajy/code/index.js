Promise.all([
    new Promise((res, rej)=> {
        res(5)
    }),
    "sam",
    100,
    true
]).then(console.log)

// Promise.all([
//     new Promise((resolve, reject) => {
//       setTimeout(() => resolve('Arya'), 1000);
//     }),
//     'Sam',
//     { name: 'John' },
//   ]).then(console.log);