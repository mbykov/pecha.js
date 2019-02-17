import _ from 'lodash'
import { getPossible } from "./pouch";
import { tibsyms, tibsyls } from "./tibetan_data";

const log = console.log
const tsek = tibsyms.tsek

export function totalKeys(pdchs) {
  let mainKeys = _.uniq(_.flatten(pdchs))
  let added = []
  mainKeys.forEach(seg=>{
    tibsyls.forEach(syl=>{
      let resyl = new RegExp(syl+'$')
      let poss = seg.replace(resyl, '')
      if (seg != poss) added.push(poss)
    })
  })
  return {main: mainKeys, added: added}
  // let keys = segs.concat(added)
  // return _.uniq(keys)
  // return _.uniq(_.flatten(pdchs))
}

export function segmenter(str) {
  let segs = str.split(tsek)
  let depth = (segs.length < 15) ? 10 : 2
  // log('SEGS', segs)
  let old = str
  let size = segs.length
  let pdchs = [[segs]]
  function rec(segs, pdch) {
    // log('PDCH', pdch)
    let flakes = scrape(segs)
    flakes.forEach(flake => {
      pdch.push(flake.head)
      pdch.push(flake.tail)
      // pdch = pdch.concat(flake.head)
      // pdch = pdch.concat(flake.tail)
      if (_.flatten(pdch).join(tsek) == old) {
        pdchs.push(_.clone(pdch))
        pdch.pop()
      }
      if (pdch.length < depth) rec(flake.tail, pdch) // three parts for now !
      // rec(flake.tail, pdch)
      pdch.pop()
    })
  }
  rec(segs, [])
  let cleans = []
  pdchs.forEach(pdch=> {
    let clean = []
    pdch.forEach(seg=>{
      clean.push(seg.join(tsek))
    })
    cleans.push(clean)
  })
  return cleans
}

export function scrape(segs) {
  // log('SEGS', segs)
  let head, tail
  let flakes = []
  for (let idx = 1; idx < segs.length + 1; idx++) {
    head = segs.slice(0, idx)
    tail = segs.slice(idx)
    let flake = {head: head, tail: tail}
    if (tail.length) flakes.push(flake)
  }
  return flakes.reverse()
}

// export function segmenter_(str) {
//   let old = str
//   let pdchs = [[str]]
//   function rec(str, pdch) {
//     // log('PDCH', pdch)
//     let flakes = scrape(str)
//     flakes.forEach(flake => {
//       pdch.push(flake.head)
//       pdch.push(flake.tail)
//       if (pdch.join(tsek) == old) {
//         pdchs.push(_.clone(pdch))
//         pdch.pop()
//       }
//       if (pdch.length < 5) rec(flake.tail, pdch) // three parts for now !
//       // rec(flake.tail, pdch)
//       pdch.pop()
//     })
//   }
//   rec(str, [])
//   return pdchs
// }

// export function scrape_(str) {
//   let segs = str.split(tsek)
//   let head, tail
//   let flakes = []
//   for (let idx = 1; idx < segs.length + 1; idx++) {
//     head = segs.slice(0, idx).join(tsek)
//     tail = segs.slice(idx).join(tsek)
//     let flake = {head: head, tail: tail}
//     if (tail) flakes.push(flake)
//   }
//   return flakes.reverse()
// }

// export function totalKeys_(pdchs) {
//   let segs = _.uniq(_.flatten(pdchs))
//   let added = []
//   segs.forEach(seg=>{
//     tibsyls.forEach(syl=>{
//       let resyl = new RegExp(syl+'$')
//       let poss = seg.replace(resyl, '')
//       if (seg != poss) added.push(poss)
//     })
//   })
//   let keys = segs.concat(added)
//   return _.uniq(keys)
// }
