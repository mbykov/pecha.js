import _ from 'lodash'
import { tibsyms, tibsuff } from "../lib/tibetan_data";

const log = console.log
const tsek = tibsyms.tsek

export function totalKeys(pdchs) {
  let mainKeys = _.uniq(_.flatten(pdchs))
  let added = []
  mainKeys.forEach(seg=>{
    tibsuff.forEach(syl=>{
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
  // let depth = (segs.length < 10) ? 10 : 2
  // let depth = (segs.length > 10) ? 7 : 100
  let depth = 4
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

function scrape(segs) {
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
