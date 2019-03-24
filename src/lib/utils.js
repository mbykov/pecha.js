import _ from 'lodash'

let util = require('util')

export function q (sel) {
  return document.querySelector(sel)
}

export function qs (sel) {
  return document.querySelectorAll(sel)
}

export function create (tag, style) {
  let el = document.createElement(tag)
  if (style) el.classList.add(style)
  return el
}

export function recreateDiv (sel) {
  let el = document.querySelector(sel)
  if (el) el.parentElement.removeChild(el)
  el = document.createElement('div')
  el.classList.add(sel)
  // el.id = sel
  return el
}

export function recreate (element) {
  var newElement = element.cloneNode(true)
  element.parentNode.replaceChild(newElement, element)
}

// function cret (str) {
//   return document.createTextNode(str)
// }

export function span (str, style) {
  let el = document.createElement('span')
  el.textContent = str
  if (style) el.classList.add(style)
  return el
}

export function br () {
  let oBR = document.createElement('br')
  return oBR
}

export function div (str, style) {
  let el = document.createElement('div')
  el.textContent = str
  if (style) el.classList.add(style)
  return el
}

export function p (str, style) {
  let el = document.createElement('p')
  el.textContent = str
  if (style) el.classList.add(style)
  return el
}

export function empty (el) {
  if (!el) return
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild)
  }
}

export function remove (el) {
  if (!el) return
  el.parentElement.removeChild(el)
}

export function removeAll (sel) {
  let els = document.querySelectorAll(sel)
  els.forEach(el => { el.parentElement.removeChild(el) })
}

// function closeAll() {
//     words = null
//     // window.close()
//     ipcRenderer.send('sync', 'window-hide')
// }

export function findAncestor (el, cls) {
  while ((el = el.parentElement) && el.classList.contains(cls)) {
    return el
  }
}

export function plog () {
  var vs = _.values(arguments)
  if (vs.length === 1) vs = vs[0]
  // console.log(util.inspect(vs, {showHidden: false, depth: null}))
  console.log(util.inspect(vs, {showHidden: false, depth: 3}))
}

export function getCoords (el) {
  let rect = el.getBoundingClientRect()
  return rect
  // return {top: rect.top, left: rect.left}
}

export function placePopup (coords, el) {
  let top = [coords.top, 'px'].join('')
  let left = [coords.left, 'px'].join('')
  el.style.top = top
  el.style.left = left
}

// https://stackoverflow.com/questions/24538450/get-element-currently-under-mouse-without-using-mouse-events
export function getInnermostHovered() { return [].slice.call(document.querySelectorAll(':hover')).pop(); }


export function insertAfter(elem, refElem) {
  var parent = refElem.parentNode;
  var next = refElem.nextSibling;
  if (next) {
    return parent.insertBefore(elem, next);
  } else {
    return parent.appendChild(elem);
  }
}
