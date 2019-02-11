import _ from 'lodash'
import { getPossible } from "./pouch";
import { tibsyms, tibsyls } from "./tibetan_data";

const log = console.log

export function possibleKeys(str) {
  let syls = _.compact(str.split(tibsyms.tsek))
  let segs = parseKeys(syls)

  let added = []
  segs.forEach(seg=>{
    tibsyls.forEach(syl=>{
      let resyl = new RegExp(syl+'$')
      let poss = seg.replace(resyl, '')
      if (seg != poss) added.push(poss)
    })
  })
  let keys = segs.concat(added)
  return keys
}

function parseKeys(segs) {
  let h, t
  let padas = []
  for (let idx = 1; idx < segs.length + 1; idx++) {
    h = segs.slice(0, idx).join(tibsyms.tsek)
    t = segs.slice(idx)
    padas.push(h)
    let h_
    for (let idy = 1; idy < t.length + 1; idy++) {
      h_ = t.slice(0, idy).join(tibsyms.tsek)
      padas.push(h_)
    }
  }
  return padas
}
