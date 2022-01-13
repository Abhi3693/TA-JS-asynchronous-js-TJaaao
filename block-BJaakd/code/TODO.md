1. Create a promise. Have it resolve with a value of `Promise Resolved!` in resolve after a delay of 1000ms, using `setTimeout`. Print the contents of the promise after it has been resolved by passing `console.log` to `.then`

```js
let firstPromise = new Promise((res, rej)=> setTimeout(()=> res("Promise Resolved!"), 1000)).then((val)=> console.log(val));


```

2. Create another promise. Now have it reject with a value of `Rejected Promise!` without using `setTimeout`. Print the contents of the promise after it has been rejected by passing console.log to `.catch`

```js
let firstPromise = new Promise((res, rej)=> rej("Rejected Promise!")).catch((val)=> console.log(val));

```

3. Create another promise. Now have it reject with a value of `Rejected Promise!` without using `setTimeout`. Print the contents of the promise after it has been rejected by passing console.log to `.catch` and also use `.finally` to log message `Promise Settled!`.

```js
let firstPromise = new Promise((res, rej)=> rej("Rejected Promise!")).catch((val)=> console.log(val)).finally(()=> console.log("Promise Settled!"));

```

4. What will be the output of the code below.

```js
console.log('A');

// Asynchronous code finises in 0 seconds (Callback Queue)
setTimeout(() => console.log('B'), 0); // callback queue

// A promise that resolves right away (Microtask Queue)
Promise.resolve().then(() => console.log('C'));

console.log('D');

A
D 
C
B
```

5. Write a function named `wait` that accepts `time` in ms returns a promise. The promise gets resolved after given time.

```js
function wait(time) {
    return new Promise((res,rej)=> setTimeout(()=>{res("done")},time))
}
wait(5000)
```

6. Do the following:

- Create a new promise
- Resolve with 21
- Use `.then` and return adding `10` to the value you will get as parameter
- Use `.then` and return adding `100` to the value you will get as parameter
- Use `.then` and check if the value you get is greater than `100` throw new error with any message
- Catch the error using `.catch`

```js
let newPro = new Promise((res,rej)=> res(21)).then((val)=> val+10).then((val)=> val+100)
.then((val)=> {
    if(val > 100){
      return rej("Value is more than 100"))
    }
}).catch((val)=> console.log(val))

```

7. Do the following:

- Create a new promise
- Resolve the promise with `['A']`
- Use `.then` and concat `B` into the parameter and return
- Use `.then` and return and object like `{0: 'A', 1: 'B'}`
- Use `.then` and log the value

```js
let final = new Promise((res,rej)=> res("A")).then((val)=> val.concat("B")).then((val)=> {
    let splitVal = val.split("");
    return {0:splitVal[0], 1:splitVal[1]}
})  
.then((val)=> {
    console.log(val)
})

```

8. Do the following:

- Create a new promise named `first` and resolve it with `1`
- Use `.then` on `first` and return `2` also check the value you get access to by logging
- Chain `.then` on above and return `3` also check the value you get access to by logging
- Chain `.then` on above and return `4` also check the value you get access to by logging

```js

let first = new Promise((res, rej)=> res(1)).then((val)=> {
    console.log(val);
    return 2
}).then((val)=> {
    console.log(val);
    return 3
}).then((val)=> {
    console.log(val);
    return 4
}).then((val)=> {
    console.log(val);
});


```

9. Do the following:

- Create a new promise named `first` and resolve it with `1`
- Use `.then` on `first` and return `2` also check the value you get access to by logging
- Use `.then` on `first` and return `3` also check the value you get access to by logging
- Use `.then` on `first` and return `4` also check the value you get access to by logging

```js

let first = new Promise((res, rej)=> res(1));

first.then((val)=> {
    console.log(val);
    return 2
})
first.then((val)=> {
    console.log(val);
    return 3
})
first.then((val)=> {
    console.log(val);
    return 4
})
```

10. Try to understand the difference between the problem 8 and 9. Write your observation.
problem 8 is example of promise chain = promise return promise and we can use then function only on promise and then function also return promise and become promise chain. and every then get value of previous promise and we are add one in value every time so for every promise value is increasing.

problem 9 is creating new promise chain every time so evry time it is getting previous value of first promise

11. Do the following

- Create a promise and resolve it with `John`
- Use `.then` and return another promise that resolves with `Arya`
- Use `.then` log the value you get access to and return another promise that resolves after 2000ms with value `Bran`
- Use `.then` to log the value

```js
let names = new Promise((res, rej)=> {
    return res("John")
}).then((val)=> {
    return new Promise((res, rej)=> {
        console.log(val);
        return res("Arya")
    })
}).then((val)=> {
    return new Promise((res, rej)=> {
        console.log(val);

        function sayHello(){
            return res("Bran")
        }
       return setTimeout(sayHello,1000)
       
    })
})
```
