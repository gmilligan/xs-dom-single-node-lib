/*
 ******************************************************************
 Copyright (c) 2009, Greg Milligan, Xybersolve, Corp.
 All rights reserved.
 *****************************************************************
 XyberSolve DOM Node Library - for speedy DOM Manipulation

 * Speed can be optimized in the DOM by focusing on single nodes only, using getElementById
 * This library enables manipulating single nodes in an highly efficient manner
 * Fragments are supported for multiple node inserts

 */
var dom = (function (window, document, undefined) { 'use strict';
  // Private variables *********************************************************
  var useFragment = false
    , fragment    = null;

  // Private functions *********************************************************
  function deriveNode(elem){
    // expecting a string ID or an HTMLElement
    var node = null;
    node = (typeof elem === 'string') ? document.querySelector(elem): elem;
    return node;
  }
  function addText(node, text){
    var elem = null;

    if(text){
      elem = document.createTextNode(text);
      node.appendChild( elem );
    }
    return elem; // return text node
  }
  function addAttributes(node, attrs){
    if( attrs ){
      for(var key in attrs){
        node.setAttribute(key, attrs[key]);
      }
    }
    return node; // return node to which attributes were added
  }
  function setSelect(elem, item){
    var node = deriveNode (elem);
    for(var i = 0; i < node.options.length; i++){
      if (node.options[i].value === item) {
        node.options.selectedIndex = i;
        break;
      }
    }
  }

  // Public functions *********************************************************
  function insertAny(elem, tag, text, attrs){
    var any = document.createElement(tag)
      ,node = deriveNode(elem);

    // debug.x for problematice interfaces
    //if( typeof elem === 'string'){ console.log('elem: ' + elem); }
    //if(! node){ console.log( 'elem: ' + elem );  console.log(arguments.callee.caller); }
    addAttributes(any, attrs);
    addText(any, text);

    if( fragment ){
      // this node is appended directly onto fragment
      fragment.appendChild(any);
    } else {
      node.appendChild(any);
    }
    return any;
  }
  function removeAllChildren(parent){
    var node = null;
    node = deriveNode(parent);
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
    return node;
  }
  function removeThisNode(elem){
    var parent = null
      ,node = null;

    node = deriveNode(elem);
    parent = node.parentNode;
    parent.removeChild(node);
    return parent;
  }
  function getAnyData(elem, debug){
    // get data from Select, Text, or any HTML Element
    var node = null
      ,value = null;

    node = deriveNode(elem);
    if( node.options ) {
      value = node.options[node.selectedIndex].value;
    } else if (node.value) {
      value =  node.value;
    } else if (node.innerHTML){
      value = node.innerHTML;
    }
    if(debug) console.log(value);
    return value;
  }
  function setAnyData(elem, value, debug){
    // set data for Select, Text, or any HTML Element
    var node = deriveNode(elem);
    if( node.options ) {
      setSelect(node, value);
    } else if (node.value) {
      setValue(node, value);
    } else if (node.innerHTML) {
      node.innerHTML = value;
    }
    return node;
  }
  function setValue(elem, value, debug){
    var node = deriveNode(elem);
    node.value = value;
    return node;
  }
  function startFragment(){
    fragment = document.createDocumentFragment();
  }
  function endFragment(elem){
    // elem - target node to be param
    var node = deriveNode(elem);
    node.appendChild(fragment);
    // reinitialize after each usage
    fragment = null;
  }
  return {
    insert: insertAny,
    insertAny: insertAny,
    getData: getAnyData,
    setData: setAnyData,
    remove: removeThisNode,
    removeAll: removeAllChildren,
    startFragment: startFragment,
    endFragment: endFragment
  };
})(window, window.document);
