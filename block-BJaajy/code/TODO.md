- Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.

```js

let one = new Promise((res, rej)=> {
    setTimeout(()=> {res("One is Setteled")}, 1000)
}).then((val)=> {
    console.log(val);
    return val});

let two = new Promise((res, rej)=> {
    setTimeout(()=> {res("two is Setteled")}, 2000)
}).then((val)=> {
    console.log(val);
    return val
    })

let three = new Promise((res, rej)=> {
    setTimeout(()=> {res("three is Setteled")}, 3000)
}).then((val)=> {
    console.log(val);
    return val
    })

let four = new Promise((res, rej)=> {
    setTimeout(()=> {res("four is Setteled")}, 4000)
}).then((val)=> {
    console.log(val);
    return val
    })

let final = Promise.all([one,two,three,four]).then(console.log);
```


- Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.

```js

let users = ["prank7", "nnnkit", "sandip", "suraj","gauri"];

let link = `https://api.github.com/users`;

let final = Promise.all(users.map((val)=> {
    return fetch(`https://api.github.com/users/${val}`).then((res,rej)=> res.json())
}))


let obj = {};
final.then((val)=> {
    val.forEach((e)=> {

        let x = fetch(e.followers_url).then((val)=> val.json()).then((val)=> {
            obj[e.login] = val.length
        })
    })
})

```



- Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

  - https://random.dog/woof.json
  - https://aws.random.cat/meow


```js

let dog = fetch(`https://random.dog/woof.json`).then((res,rej)=> setTimeout(()=> {
    res.json()
},5000))
let cat = fetch(`https://aws.random.cat/meow`).then((res,rej)=> res.json())

let final = Promise.race([dog,cat]);
```

- Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not

```js
const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);


let final = Promise.allSettled([one,two,three])
.then((res)=> console.log(res))
.catch((error)=> console.error(error));
```

- What will be the output of the following code snippet? How much time will it take for the promise to resolve?

```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 1000);
  }),
  'Sam',
  { name: 'John' },
]).then(console.log);
```
