---
path: '/blog/journey-into-javascript-objects'
title: Journey into JavaScript objects
date: '2018-02-26'
tags: ["js", "javascript", "object", "language"]
---

Objects in JavaScript are everywhere, and almost everything there is an object. Exceptions are primitive values, but they have wrapper objects. Current article is about objects in JavaScript in general, their methods and constructor functions.

## Object as namespace

![Space](./space.jpg)

Let’s start our journey with making clear what an ‘object’ means in the context of JavaScript. Objects in JavaScript are hash tables, which means that this is a place where you can assign some values to keys. In JS you can create object as simple as that:

```javascript
var a = {
    b: 'b'
};
```

This is called ‘object literal’. In many other programming languages you cannot just create hash table out of thin air – you need to construct it first. In JavaScript all you need to do is to assign object literal with key-value pairs inside of it to some variable. Even better – you can just create objects on the go and use them right away, without assigning them to any variables.

Let’s create an object with some properties which would’ve made sense. Let it be a car person object. Each person have a name, age and sex, so:

```javascript
var person = {
    name: 'Misha',
    age: '24',
    sex: 'male'
}
```

Then you can use that object in your program if you feel like so:

- use dot notation to get the property you need
```javascript
console.log(person.name) // will write to console 'Misha'
```
- or use square brackets and get the value by name associated with it in string format
```javascript
console.log(person['name'])
```

What we just actually do above – is that we group that values (name, age and sex) behind the variable `person`. If we didn’t group them in that one variable – we will be forced to use three different variables, like this:

```javascript
var personName = 'Misha';
var personAge = '24';
var personSex = 'male';
```

This may be OK if you use just some certain person’s info in your program and nobody else’s, but that definitely will be usefull if you teach yourself to combine all variables which have the same nature inside one variable, with the help of object literal.

The word to call such objects is namespace. I deeply believe that one of the core pillars of JavaScript flexibility is about how it’s easy-going about creating namespaces (objects). Traditional object-oriented languages creates a lot of abstractions around the idea of objects – in many of them you should have a class to just create an object. Such pedancy about object creation is forgiving in case of strongly typed language nature – that is powerful tool to build a truly enormous system and keep it alive (and make sure that nobody break it). But being able to create namespaces to handle logic complexity on the go without fuss with classes and instances is also a strong side of the language.

Let’s return to JS objects. That is surely helpful to keep some primitive type values in proper namespace, but that is also true that we could have necessity to keep there functions also. Let’s add `dream` function, because there is no such person in the known universe unable to dream, right?

```javascript
var person = {
    name: 'Misha',
    age: '24',    
    sex: 'male',    
    dream: function() {       
        console.log('...zzz corgis are awesome wanna corgi zzz...');    
    }
}
```

Functions associated with key of an object are called ‘methods’.
Let’s personalize our dream:

```javascript
var misha = {    
    name: 'Misha',    
    age: '24',    
    sex: 'male',    
    crazyAbout: 'corgi',    
    dream: function() {       
        console.log(
            '...zzz '
            + this.crazyAbout
            + '\'s are awesome '
            + this.name
            + ' wants '
            + this.crazyAbout
            + ' zzz...'
       );
    }
}
```

We could use the name of our namespace to get access to needed values, but here we see using of `this` object – and what we also see is that there are no such property or value above. What happening here – is we can get properties from our namespace (object) through the keyword `this`.

It’s always tempting to know other people dreams of around you, isn’t it? Let’s give our person superpower – ability to read other people minds.

```javascript
var misha = {    
    name: 'Misha',    
    age: '24',    
    sex: 'male',    
    crazyAbout: 'corgi',    
    readMindOf: function(anotherPerson) {    
        console.log(
            'Reading ' 
            + anotherPerson.name 
            + '\'s thoughts...'
        ); 
        anotherPerson.dream(); 
        console.log('...oh my, such a mess inside that head!');    
    },    
    dream: function() {       
        console.log(
            '...zzz '
            + this.crazyAbout
            + '\'s are awesome '
            + this.name
            + ' wants '
            + this.crazyAbout
            + ' zzz...'
       );
    }
}
```

To be able to read anyone’s mind that ‘anyone’ should be somewhere around. Let’s place another person:

```javascript
var irina = {    
    name: 'Irina',    
    age: '24',    
    sex: 'female',    
    dream: function() {       
        console.log(
            '...zzz '
            + this.crazyAbout
            + '\'s are awesome '
            + this.name
            + ' wants '
            + this.crazyAbout
            + ' zzz...'
       );
    }
}
```

Voila! Time to read kinky thoughts:

```javascript
misha.readMind(irina);
/*
logs into console:
Reading Irina's thoughts...
...zzz dance's are awesome Irina wants dance zzz...
...oh my, such a mess inside that head!
*/
```

Everything works as suggested, thoughts have been read.

## Methods borrowing

![Borrowing](./leaves.jpeg)

When we use `misha`‘s reading mind superpower, `irina`‘s thoughts was read through her `dream` property, which held function. Such functions as we know already called methods: method is just a function held by key of our object.

What we also know is that every person can dream on that planet. But is it? Let’s imagine that someone can’t. Here is our imaginated person:

```javascript
var fictionalCharacter = {    
    name: 'fictionalCharacter',
    age: '21',
    sex: 'female',
    crazyAbout: 'shopping'
}
```

So how we can read that person dreams even if she don’t realize she have one?

We can’t just use `anotherPerson` function parameter as we did before, because we can’t get `anotherPerson.dream` method anymore. What we can do – is use our own ability to dream. Yeah.

```javascript
var misha = {
    name: 'Misha',
    age: '24',
    sex: 'male',
    crazyAbout: 'corgi',
    readMindOf: function(anotherPerson) {
        console.log(
            'Reading ' 
            + anotherPerson.name 
            + '\'s thoughts...'
        ); 
        this.dream.call(anotherPerson); 
        console.log('...oh my, such a mess inside that head!');
    },
    dream: function() {
        console.log(
            '...zzz '        
            + this.crazyAbout        
            + '\'s are awesome '        
            + this.name        
            + ' wants '        
            + this.crazyAbout        
            + ' zzz...'    
        );    
    }
}
misha.readMindOf(fictionalCharacter);
/*
logs into console:
Reading fictionalCharacter's thoughts...
...zzz shopping's are awesome fictionalCharacter wants shopping zzz...
...oh my, such a mess inside that head!
*/
```

What we did here – is we call our own method, but that method used not ours object properties through `this` as it does before – that same method get other objects properties through `this`. Almost everything in JavaScript is object, and all functions are objects either, so we used functions inner method `call` to call our method with `this` reassigned to `anotherPerson`.

With this `call` function property that will work either:

```javascript
misha.dream.call(fictionalCharacter);
/*...zzz shopping's are awesome fictionalCharacter wants shopping zzz...*/
```

Also we can do this:

```javascript
fictionalCharacter.dream = misha.dream;
fictionalCharacter.dream();
/*...zzz shopping's are awesome fictionalCharacter wants shopping zzz...*/
```

This technique is called ‘method borrowing’ – you can just get someone’s method and use it right away – if you only sure that method will get all properties it needs from your object through `this`.

## Constructor functions

![Constructor](./constructor.png)

Though it is possible to create all the objects you need by hand – you may get in troubles with this approach. Right now our `misha` and `irina` objects share a lot of similarity between them, – they are persons with names and dreams (and after irina borrows misha’s ability to read other people minds – cause it cool – with that superpower also), but what if you decide you need to program a room with a hundred persons? What about a million? Right now creating a person will mean copying object and replacing needed values. That approach is error-prone.

To create an objects which have the same keys in JavaScript you use a constructor function. That is the kind of function which creates (constructs, hence the name) objects.

```javascript
function CreatePerson(name, age, crazyAbout) {
    this.name = name;
    this.age = age;
    this.crazyAbout = crazyAbout;
}
```

You already have seen `this` keyword, but here that keyword behaves differently. `this` here – is our future new object.

If you call that function as we usually do – you will write properties in global space. That’s kind of not we are looking for now. How can we create (construct) new objects with this? The answer is – through `new` keyword.

```javascript
var freshBornPerson = new CreatePerson('Freshborn', 0, 'everything');
```

When you call any function with `new` keyword – JavaScript will create a new object named `this`, and only after that it will allow your method to run with that `this` object inside of its local space. What happens next – with all of your `this.prop = prop;` all around constructor function, you’ll just assign properties to that object. When your function will complete ‘constructing’ new object – it will just return `this`. Actually you can write `return this;` expression explicitly:

```javascript
function CreatePerson(name, age, crazyAbout) {
    this.name = name;
    this.age = age;
    this.crazyAbout = crazyAbout;
    return this;
}
```

There is no difference in working of that two versions of `CreatePerson` function. This is usual to see when `return this;` is omitted in codebases here and there (everywhere to be honest), but remember what `this` means in the context of constructor functions. However omitting `return this` is a go-to coding style because harm can be done if you accidentally write this:

```javascript
function CreatePerson(name, age, crazyAbout) {
    this.name = name;
    this.age = age;
    this.crazyAbout = crazyAbout;
    return {};
}
```

Your function in this case will return `{}`, not just constructed `this` object which will be lost. So just omit `return` and you’ll be good to go.

There is one thing – person created through calling this function will be unable to dream (or to read other people minds). And there is a reason I skip passing function to properties of `CreatePerson`. Imagine you have hundreds of people dreaming around you. How many times you’ll pass the same function to each person on creation? Can we just use another namespace with all person methods inside of it and pass it to our function creation?

We can surely do something like this:

```javascript
var allPersonMethods = {
    readMindOf: function(anotherPerson) {
        console.log(
            'Reading ' 
            + anotherPerson.name 
            + '\'s thoughts...'
        ); 
        this.dream.call(anotherPerson); 
        console.log('...oh my, such a mess inside that head!');    
    },    
    dream: function() {       
        console.log(        
            '...zzz '        
            + this.crazyAbout        
            + '\'s are awesome '        
            + this.name        
            + ' wants '        
            + this.crazyAbout        
            + ' zzz...'    
        );    
    }
}
function CreatePerson(name, age, crazyAbout, methods) {
    this.name = name;
    this.age = age;
    this.crazyAbout = crazyAbout;
    this.dream = methods.dream;
    this.readMindOf = methods.readMindOf;
}
```

And that will work:

```javascript
var misha = new CreatePerson('misha', 24, 'corgi', allPersonMethods);
misha.dream();
/*
logs into console:
...zzz corgi's are awesome misha wants corgi zzz...
*/
```

But every time we create an object with this constructor function we will create the same properties in each object (`dream`, `readMindOf`). All that properties takes a bit of computer memory. Lots of that properties can take lots of memory. How can we reuse methods without creating new keys in `this` object?

All functions have a property called `prototype`. That property holds an object in which you should place all methods your objects needs to share.

```javascript
function CreatePerson(name, age, crazyAbout) {
    this.name = name;
    this.age = age;
    this.crazyAbout = crazyAbout;
}
CreatePerson.prototype = {
    readMindOf: function(anotherPerson) {
        console.log('Reading ' + anotherPerson.name + '\'s thoughts...'); 
        this.dream.call(anotherPerson); 
        console.log('...oh my, such a mess inside that head!');    
    },    
    dream: function() {       
        console.log(        
            '...zzz '        
            + this.crazyAbout        
            + '\'s are awesome '        
            + this.name        
            + ' wants '        
            + this.crazyAbout        
            + ' zzz...'    
        );    
    }    
}
```

Looks like our `allPersonsMethods` object above, right? But now that object assigned right to our constructor function. Let’s see what objects we will get from that constructor.

```javascript
var misha = new CreatePerson('misha', 24, 'corgi');
misha.dream();
/*...zzz corgi's are awesome misha wants corgi zzz...*/
misha.readMindOf(misha);
/*
logs into console:...
....BOOM!!!
Just fooling around :)
that actually logs into console:
Reading misha's thoughts...
...zzz corgi's are awesome misha wants corgi zzz...
...oh my, such a mess inside that head!
*/
```

Let’s look what inside of our newly created person:

```javascript
console.log(misha);
/*
age: 24
crazyAbout: "corgi"
name: "misha"
__proto__: {
    dream: ƒ ()
    readMindOf: ƒ (anotherPerson)
}
*/
```

You see? There is `age`, `crazyAbout`, `name`… But also some property called `__proto__`, which hold our `dream` 🙂 and `readMindOf` methods!

When constructor function sees `prototype` property assigned to itself – during next creation of the object it will link `__proto__` property of new object (`this` object) to its (constructor function’s) `prototype` property. Simply put, `__proto__` automatically links with `prototype` of constructor function. Then, when you call one of this methods from newly created object – JavaScript will not found anything by that method name in that object, so what it will do – it’ll automatically look right into `__proto__` and will try to find your methods there. After it finds it, it will call it like usual, and will explicitly assign `this` object inside of this methods to the newly created object. That means that through `this` keyword you will be able to get any properties of constructed object.

That way with the creation of only one extra  `__proto__` key which links to `prototype` property of the constructor function – our constructed objects will share the same functionality without spending a lot of memory.

With this knowledge we may even write this:

```javascript
function CreatePerson(name, age, crazyAbout) {
    this.name = name;
    this.age = age;
    this.crazyAbout = crazyAbout;
    this.__proto__ = {
        readMindOf: function(anotherPerson) {
            console.log('Reading ' + anotherPerson.name + '\'s thoughts...');
            this.dream.call(anotherPerson);     
            console.log('...oh my, such a mess inside that head!');        
        },
        dream: function() {
            console.log(
                '...zzz '        
                + this.crazyAbout        
                + '\'s are awesome '        
                + this.name        
                + ' wants '        
                + this.crazyAbout        
                + ' zzz...'    
            );        
        }    
    }
}
```

Can you see what is wrong with it?

This will work, but what we just did – we place all of our methods right inside constructor function. That may seem correct on the first sight, but actually we just put some object literal inside our function. And that means that on each function invoking that object literal (with all of its methods) will be recreated again and again. What we get is actually worse than when we wrote this:

```javascript
function CreatePerson(name, age, crazyAbout, methods) {
    this.name = name;
    this.age = age;
    this.crazyAbout = crazyAbout;
    this.dream = methods.dream;
    this.readMindOf = methods.readMindOf;
}
```

…because in that case we will just create new properties with links to functions inside methods object. And when we use `__proto__` explicitly inside constructor function with object literal assigned to it – we recreate this functions all the time, and memory spending going through the roof.

As a workaround we may wrote this:

```javascript
var methods = {        
    readMindOf: function(anotherPerson) {            
        console.log('Reading ' + anotherPerson.name + '\'s thoughts...');     
        this.dream.call(anotherPerson);     
        console.log('...oh my, such a mess inside that head!');        
    },        
    dream: function() {       
        console.log(        
            '...zzz '        
            + this.crazyAbout        
            + '\'s are awesome '        
            + this.name        
            + ' wants '        
            + this.crazyAbout        
            + ' zzz...'    
        );        
    }    
};    
function CreatePerson(name, age, crazyAbout) {    
    this.name = name;
    this.age = age;
    this.crazyAbout = crazyAbout;
    this.__proto__ = methods;
}
```

But it haven’t any benefit of using it instead of using `prototype`. First of all in that way we use advanced technique called ‘clojures’ which we will meet in next chapter, second – you automatically lose the ability to check if your created object was constructed by some function or not. You can do last one with `instanceof` operator:

```javascript
misha instanceof CreatePerson
```

That will return you ‘true’ if you use prototype property and ‘false’ in case you assign `__proto__` in constructor function explicitly. That’s because this operator works like this:

```javascript
Object.getPrototypeOf(misha) === CreatePerson.prototype
```

`Object.getPrototypeOf` takes object and returns its `__proto__`, and what we do here – is we check if `__proto__` property of our object equals to `prototype` of function. If you use object creation style with assigning `__proto__` to `this` instead of using `prototype`, your object will have `__proto__` property, but your constructor function will lack `prototype` property. What we would get in this situation – is being unable to use `instanceof` operator.

We can easily check this assumption. But first you should know sequence in which JavaScript assign `prototype` property to `__proto__` of our object.

```javascript
var methods = {        
    readMindOf: function(anotherPerson) {            
        console.log('Reading ' + anotherPerson.name + '\'s thoughts...');     
        this.dream.call(anotherPerson);     
        console.log('...oh my, such a mess inside that head!');        
    },        
    dream: function() {       
        console.log(        
            '...zzz '        
            + this.crazyAbout        
            + '\'s are awesome '        
            + this.name        
            + ' wants '        
            + this.crazyAbout        
            + ' zzz...'    
        );        
    }
}   
function CreatePerson(name, age, crazyAbout) {
    this.name = name;
    this.age = age;
    this.crazyAbout = crazyAbout;
    this.__proto__ = methods;
}
CreatePerson.prototype = {
    beProductiveAllWeekends: function() {
        console.log('Sir yes sir! Can I write thousand lines of code today as I'm do at work sir!');
    }
}
```

Let’s check if person can be productive in the weekend as on work:

```javascript
var misha = new CreatePerson('misha', 24, 'corgi');
misha.beProductiveAllWeekends();
/*Uncaught TypeError: misha.beProductiveAllWeekends is not a function*/
```

Of course there is an error. It seems `misha` cannot be productive in the weekend.

```javascript
misha.dream();
/*...zzz corgi's are awesome misha wants corgi zzz...*/
```

Dreaming on weekends is allright though.

What just happened is our constructor function assign its `prototype` property to `__proto__` of constructed object, and only after that calls functions body where we reassign `__proto__` to `methods` object.

That needed to be explain because you should understand that there is no magic happens and what really is happening – JavaScript just juggles with objects and links to them.

Lets just bust a move to fully understand `__proto__` and `prototype`.

```javascript
var methods = {
    readMindOf: function(anotherPerson) {
        console.log('Reading ' + anotherPerson.name + '\'s thoughts...');
        this.dream.call(anotherPerson);     
        console.log('...oh my, such a mess inside that head!');        
    },        
    dream: function() {       
        console.log(        
            '...zzz '        
            + this.crazyAbout        
            + '\'s are awesome '        
            + this.name        
            + ' wants '        
            + this.crazyAbout        
            + ' zzz...'    
        );        
    }
}
 
function CreatePerson(name, age, crazyAbout) {
    this.name = name;
    this.age = age;
    this.crazyAbout = crazyAbout;
    this.__proto__ = methods;
}
CreatePerson.prototype = methods;
 
var a = new CreatePerson()
a instanceof CreatePerson
```

You may guess what instanceof operator will return this time. Correct! ‘true’.

With reassigning `__proto__` to `methods` object we remove link to `prototype`, which constructor function creates for us. But prototype stays on place, it’s still field of constructor function. Since objects passed as links – what `instanceof` do is just compare the links. And to return ‘true’ `instanceof` just should be certain that `__proto__` property of object and `prototype` property of function links to the same object.

```javascript
var obj = {};
function A(){}
A.prototype = obj;
 
var obj2 = {__proto__: obj}
obj2 instanceof A
```

That will return true, and now you now why.

If you are very picky about terms then you should also notice that by using `__proto__` instead of `prototype`, and even by assigning literal objects to `prototype` field:

```javascript
ConstructorFunction.protototype = {
    method1: function(){},
    method2: function(){}
}
```

…instead of writing in this style:

```javascript
ConstructorFunction.prototype.method1 = function(){}
ConstructorFunction.prototype.method2 = function(){}
```

…you will miss the property `constructor`, which you can read about in [Dr. Axel Rauschmayer article](http://2ality.com/2011/06/constructor-property.html). Personally I never use this, but its good to know about its existence.

## Shooting in the foot properly

![Bullets](./bullets.png)

Since now you know how `__proto__` and `prototype` works (and if you accept how this universe roll with such a language alongside), the next thing will look naturally to you.

```javascript
var obj1 = {
    method: function() {
        console.log(123);
    }
};
var obj2 = Object.create(obj1);
obj2.method(); // will log 123 to the console
```

Here we created `obj2` with the help of `Object.create` method. That method takes some object you give it, and returns to you new object, which have first one in its `__proto__`.

In the example above `obj2` looks like this:

```javascript
var obj2 = { __proto__: obj1 };
```

That way you can reuse methods from `obj1` without copying or reassigning them.
Speaking of which. If you want to combine different methods from different objects in some other object, you use this method:

```javascript
Object.assign({}, obj1, obj2, obj3...);
```

That way you will assign to newly created object `{}` methods from `obj1`, `obj2`, `obj3` and any amount of `methods` objects you need to. `Object.assign` will get all this methods and… assign them to the first object. You say methods name collisions? Methods will reassign from left to right, next object will reassign method with the same name from object before it. That may sound gibberish to you, but in advanced cases (such as simulating immutable data structures) this may come handy.

In the beginning of this article I wrote this thing: ‘Exceptions are primitive values, but they have wrapper objects’. Let me explain this.

JavaScript have 5 primitive values: `undefined`, `null`, `boolean`, `string` and `number`. Primitive values are not objects so they have no properties and methods. Everything else is an object, including functions – they are just callable objects. When you wrote this:

```javascript
var a = 5.5;
a.toFixed(0); // returns 6
```

What actually happens here is you try to call a method from primitive value.

In this case method that you’ll get calling – is the `Number.toFixed` method. When JavaScript run into a variable that have a primitive value inside and it sees that you trying to call some method or get a property from it – since primitive values haven’t any properties or methods – JS turns to object wrapper associated with this primitive value and gets the method from there. This happens for a moment, and your primitive value stays primitive.

You can do this:

```javascript
Number.prototype.myAmazingFunction = function() {
    console.warn('please dont do that');
};
```

And call it from a:

```javascript
a.myAmazingFunction(); // please dont do that
```

It is possible to extend primitive values object wrappers with some methods – and it is called ‘monkey patching’. [This considered as bad practise](https://en.wikipedia.org/wiki/Monkey_patch#Pitfalls).

## Closing thoughts

![The Adventure Begins](./cup.jpeg)

While you can avoid using of constructor functions and scrabble objects together with `Object.create`, `Object.assign` and juggling `__proto__` properties around, the best way to construct objects is to use constructor function. That’s because of how functions in JavaScript works, and how they works we learn in the next chapter of the series.

To be precise about themes – in the next chapter we will learn about scoping, clojures, self-invoking functions, private and static methods, factory functions, and what it means that a functions in JavaScript actually a callable object.