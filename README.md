xs-dom-single-node-lib
======================

Speed oriented DOM manipulation library. For targeted manipulating of single HTMLElement nodes.

###MongoWrap API 
######Basics
* [Purpose](#purpose)
* [Install](#install)
* [Without Fragment](#no-fragment)
* [With Fragment](#fragment)
* [Library API](#api)
* [Tests](#test)

<a name="purpose"></a>
##Purpose
Some of the best optimization when driving the DOM comes from single node manipulation via fragments. 
This library provides a wrapper to build DOM elements, where speed is the primary focus. 
It relies on manipulating singular HTMLElements, versus arrays of nodes.
Using this approach can do a lot to speed up your DOM interaction. 

####Notes
I have been using this little library for a few years now. I find it to be very solid and useful where speed is important. 

<a name="no-fragment"></a> 
##Install
Include the singular library file into your project. 
A reference to the `dom` object will now be globally available in your project.

```html

    <script src="../libs/xs-dom-single-node-lib.js"></script>

```

Ok, you want to make it less global. 
It is a basically a singleton, feel free to wrap it up any way you want.
  
```javascript

    var app = {
        dom: dom,
        prop1 = 'my property'
    }

    app.dom.insert(main, 'h2', 'Sub Heading', {style: 'color:orange;font-size:24px;'});
    
```

<a name="no-fragment"></a>
##Usage: Without Fragment
Without `dom.startFragment()` being called, all calls write directly to the DOM.

```javascript

    // get a HTMLElement reference 
    var main = document.getElementById('main');

    // insert with string reference to "id"
    dom.insert('#main', 'h1', 'Heading', {style: 'color:blue;'});

    // insert using HTMLElement reference
    dom.insert(main, 'h2', 'Sub Heading', {style: 'color:orange;font-size:24px;'});
    
    // insert more with HTMLElement reference
    dom.insert(main, 'p', 'Same paragraph text', {style:'color:red;'});
    
    // create a list
    var ul = dom.insert(main, 'ul');
    
    // cycle through some data 
    for (var i = 0; i < data.length; i++) {
      // add list item
      var li = dom.insert(ul, 'li', data[i].name, {id: data[i].id, class:'list-item'});
    }

```
<a name="fragment"></a>
##Usage: With Fragment:

Once `dom.startFragment()` is called, all subsequent writes are to the internally stored fragment.
The fragment is finally written to the DOM when `dom.endFragment(main)` is called.
This also sets the library back to "non-fragment" mode.  
 
```javascript

    // get a HTMLElement reference 
    var main = document.getElementById('main');

    // start the fragment
    dom.startFragment();

    dom.insert(main, 'h1', 'Heading', {style: 'color:blue;'});
    dom.insert(main, 'h2', 'Sub Heading', {style: 'color:orange;font-size:24px;'});
    dom.insert(main, 'p', 'Same paragraph text', {style:'color:red;'});
    
    // create a list
    var ul = dom.insert(main, 'ul');
    
    // cycle through some data 
    for (var i = 0; i < data.length; i++) {
      // add list item
      var li = dom.insert(ul, 'li', data[i].name, {id: data[i].id, class:'list-item'});
    }

    // write the fragment to the DOM all at once
    // 'main' is actually updated here
    dom.endFragment(main); 
 
```

<a name="api"></a>
##API (exposed methods)
In all calls: `elem` can be string or HTMLElement.
The library determines which it is and gets the referenced HTMLElement if need be.  

Method                                 | Description
---------------------------------------|----------------------------
`insert(elem, tag, text, attrs)`       | Insert a DOM Element of any type.   
`insertAny(elem, tag, text, attrs)`    | Same as above.
`getData(elem)`                        | Determines "select", "input" or HTML and get data accordingly
`setData(elem, value)`                 | Determines "select", "input" or HTML and sets data accordingly
`remove(elem)`                         | Removes this element from the DOM
`removeAll(elem)`                      | Removes all children of this element
`startFragment()`                      | Puts library in "fragment" mode and creates fragment to write to. 
`endFragment(elam)`                    | Puts library out of "fragment" mode and writes fragment to `elem`.


<a name="test"></a> 
##Tests
Run `jshint` and `qunit` tests.   

```bash

    npm test

```
