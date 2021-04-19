```ts
data = fetch('http://localhost:3000/data/albums.json')
res = data.then(resp =>  resp.json() )
res.then( console.log ) 
```

```ts
// elem.onkeydown = (event) => console.log('keydown',event)

console.log(1)

setTimeout(()=> console.log(5),0)

Promise.resolve(4).then(console.log)

console.log(2)

time = Date.now()

while( time + 5000 > Date.now()) {}

console.log(3)
```

## Event queues
https://www.youtube.com/watch?v=cCOL7MC4Pl0&ab_channel=JSConf

```ts
setTimeout(() => {
    console.log(1)
        
    Promise.resolve(3).then((res)=>{ 
        console.log(res)

        setTimeout(() => {
            console.log(4)
        })
    })
    console.log(2)
} ,0)
```

## Callback hell 

https://miro.medium.com/max/1200/1*Wi8zDGRqRQtH8IG8VQu9dA.png


```ts
function echo(msg, callback, errorBack){
    setTimeout(()=>{
        callback(msg)
    },2000)
}

echo('Sprawdz pogode',  (resp1) => { console.log('krok1',resp1)

    echo('Napisz do A.',  (resp2) => { console.log('krok2',resp2)

        echo('Zamów taxi',  (resp3) => { console.log('krok3',resp3)


                console.log('Sukces!',resp1,resp2,resp3)
         }, console.error)
     }, console.error)
 }, console.error)
 ```


```ts
function echo(msg){
  
    return new Promise((callback, errorBack)=>{
        setTimeout(()=>{
           callback(msg)
        },2000)
    })
}

p1 = echo('Sprawdz pogode')

p1.then( (resp1) => { console.log('krok1',resp1) })

p2 = p1.then( resp1 => 'Najpierw ' + resp1 )
p3 = p2.then( resp => resp + ', a potem Napisz do A. i zamow taxi') 
p4 = p3.then( resp => echo(resp + 'i wtedy ;-) ' ) ) 

p4.then(console.log)

// echo('Napisz do A.').then((resp2) => { console.log('krok2',resp2) })
// echo('Zamów taxi').then(  (resp3) => { console.log('krok3',resp3) })

```

```ts
function echo(msg ,err){
  
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
           err? reject(err) : resolve(msg)
        },2000)
    })
}

p1 = echo('Sprawdz pogode','ups..')

p1.then( (resp1) => { console.log('krok1',resp1) })

p2 = p1.then( resp1 => 'Najpierw ' + resp1, err => 'NIe wiem jaka pogoda' )
p3 = p2.then( resp => resp + ', a potem Napisz do A. i zamow taxi') 
p4 = p3.then( resp => echo(resp + 'i wtedy ;-) ' ) ) 

p4.then(console.log)

// echo('Napisz do A.').then((resp2) => { console.log('krok2',resp2) })
// echo('Zamów taxi').then(  (resp3) => { console.log('krok3',resp3) })
```

```ts
function echo(msg ,err){
  
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
           err? reject(err) : resolve(msg)
        },2000)
    })
}

p1 = echo('Sprawdz pogode','ups..')

p1.then( (resp1) => { console.log('krok1',resp1) })

p2 = p1.then( resp1 => 'Najpierw ' + resp1 ) 
p3 = p2.then( resp => resp + ', a potem Napisz do A. i zamow taxi') 
p4 = p3.then( resp => echo(resp + 'i wtedy ;-) ' ) ) 
p4.catch((err)=>console.log('some errror ',err ) )
p4.then(console.log)

// echo('Napisz do A.').then((resp2) => { console.log('krok2',resp2) })
// echo('Zamów taxi').then(  (resp3) => { console.log('krok3',resp3) })
```