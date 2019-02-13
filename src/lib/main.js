//
import _ from 'lodash'
import { parsePDCHs, totalKeys } from "./segmenter";
import { getPossible } from "./pouch";
import { tibsyms, tibsyls } from "./tibetan_data";


const log = console.log

export function mainResults(str) {
  let syls = _.compact(str.split(tibsyms.tsek))
  let pdchs = parsePDCHs(syls)
  let keys = totalKeys(pdchs)
  log('MAIN pdchs:', pdchs, keys.length)
  getPossible(keys)
    .then(docs=> {
      docs = _.flatten(docs)
      log('DOCS', docs)
      let chains = makeChains(pdchs, docs)
      log('CHs', chains)
      let fulls = fullChains(chains)
      log('chains: ', chains.length, 'fulls: ', fulls.length)
      if (fulls.length) chains = fulls
      log('CHs', chains)
    })
}

function makeChains(pdchs, docs) {
  let chains = []
  pdchs.forEach(segs=>{
    let chain = []
    let any = false
    segs.forEach(seg=>{
      let segdocs = _.filter(docs, doc => { return startWith(seg, doc.dict) })
      if (segdocs.length) any = true
      let doc = {seg: seg, docs: segdocs}
      chain.push(doc)
    })
    if (any) chains.push(chain)
  })
  return chains
}

function startWith(str, head) {
  if (str == head) return true
  let reh = new RegExp('^' + head)
  let tail = str.replace(reh, '')
  return (str != tail && tibsyls.includes(tail)) ?  true : false
}

function fullChains(chains) {
  let fulls = []
  chains.forEach(segs => {
    let full = true
    // let dsegs = segs.slice(0, -1)
    segs.forEach(seg => {
      if (!seg.docs.length) full = false
    })
    if (full) fulls.push(segs)
  })
  return fulls
}
