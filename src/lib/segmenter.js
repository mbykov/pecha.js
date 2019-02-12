import _ from 'lodash'
import { getPossible } from "./pouch";
import { tibsyms, tibsyls } from "./tibetan_data";

const log = console.log

export function totalKeys(pdchs) {
  let segs = _.flatten(pdchs)
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

function parseKeys_(segs) {
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
