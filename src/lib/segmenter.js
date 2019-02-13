import _ from 'lodash'
import { getPossible } from "./pouch";
import { tibsyms, tibsyls } from "./tibetan_data";

const log = console.log
const tsek = tibsyms.tsek

export function parsePDCHs(segs) {
  let h, t
  let pdchs = []
  pdchs.push([segs.join(tibsyms.tsek)])
  for (let idx = 1; idx < segs.length + 1; idx++) {
    h = segs.slice(0, idx).join(tibsyms.tsek)
    t = segs.slice(idx)
    let h_, t_
    for (let idy = 1; idy < t.length + 1; idy++) {
      h_ = t.slice(0, idy).join(tibsyms.tsek)
      t_ = t.slice(idy)
      let chain = [h, h_, t_.join(tibsyms.tsek)]
      pdchs.push(_.compact(chain))
    }
  }
  return pdchs
}

function scrape_ (str) {
  let total = str.length+1
  let flakes = []
  let head = str
  let pos = str.length
  let tail
  while (pos > 0) {
    pos--
    head = str.substr(0, pos)
    if (!head) continue
    tail = str.slice(pos)
    let res = {head: head, tail: tail}
    flakes.push(res)
  }
  return flakes
}
export function totalKeys(pdchs) {
  let segs = _.uniq(_.flatten(pdchs))
  let added = []
  segs.forEach(seg=>{
    tibsyls.forEach(syl=>{
      let resyl = new RegExp(syl+'$')
      let poss = seg.replace(resyl, '')
      if (seg != poss) added.push(poss)
    })
  })
  let keys = segs.concat(added)
  return _.uniq(keys)
}

export function segmenter(str) {
  let old = str
  let pdchs = []
  function rec(str, pdch) {
    // log('PDCH', pdch)
    let flakes = scrape(str)
    flakes.forEach(flake => {
      if (!flake.tail) return
      pdch.push(flake.head)
      pdch.push(flake.tail)
      if (pdch.join(tsek) == old) {
        pdchs.push(_.clone(pdch))
        pdch.pop()
      }
      if (pdch.length < 10) rec(flake.tail, pdch) // three parts for now !
      rec(flake.tail, pdch)
      pdch.pop()
    })
  }
  rec(str, [])
  return pdchs
}

export function scrape(str) {
  let segs = str.split(tsek)
  let head, tail
  let flakes = []
  for (let idx = 1; idx < segs.length + 1; idx++) {
    head = segs.slice(0, idx).join(tsek)
    tail = segs.slice(idx).join(tsek)
    let flake = {head: head, tail: tail}
    flakes.push(flake)
  }
  return flakes.reverse()
}
