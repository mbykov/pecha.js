//
import _ from 'lodash'
import { q, qs, empty, create, remove, span, p, div, getCoords } from './utils'
import { scrape, segmenter, totalKeys } from "./segmenter";
import { getPossible } from "./pouch";
import { tibsyms, tibsyls } from "./tibetan_data";
import { parsePhrase, noResult, showCompound } from "./parsedata";

let tsek = tibsyms.tsek
const log = console.log

export function mainResults(el, structure) {
  let progress = q('#progress')
  progress.classList.add('is-shown')
  let retsek = new RegExp(tsek+'$')
  let str = el.textContent.trim().replace(retsek, '')
  let segs = str.split(tsek)

  let parent = el.parentNode
  // log('PARENT', parent.classList)
  let depth = false
  if (parent.classList.contains('tibphrase')) depth = true
  let pdchs = segmenter(str, depth)
  log('MAIN pdchs:', segs.length, '=>', pdchs.length)
  log('MAIN pdchs:', segs.length, '=>', pdchs[10])

  let keys = totalKeys(pdchs)
  if (structure) keys = _.filter(keys, key=> { return key != str})
  // log('MAIN keys:', keys.length)
  // return

  getPossible(keys)
    .then(docs=> {
      docs = _.flatten(docs)
      log('DOCS', docs)
      // return
      let res = makeChains(pdchs, docs)
      let chains = res.chains
      log('FULL, CHAINS', res.full, chains.length, chains)
      if (!chains.length) {
        noResult(el)
        return
      }
      let chain
      if (chains.length > 1) {
        chain = commonParts(chains)
        log('COMMON', chain)
      }
      if (structure) showCompound(el, chains)
      else parsePhrase(el, chains)
      progress.classList.remove('is-shown')
    })
}

function commonParts(chains) {
  let first = chains[0]
  let clean = []
  let ambi, ambis
  let common = false
  for (let idx = 0; idx < first.length; idx++) {
    let segs = chains.map(segs=> { return segs[idx].seg })
    if (_.uniq(segs).length == 1) {
      clean.push(first[idx])
      common = true
    } else {
      if (!ambis) ambis = {ambi: true, seg: '', docs: []}, clean.push(ambis)
      // if (!ambis) {
      //   ambis = {ambi: true, seg: '', docs: []}
      //   clean.push(ambis)
      // }
      ambis.seg += first[idx].seg
      if (idx < first.length-1) ambis.seg += tsek
    }
  }
  if (!common) ambi = first.map(seg=> { return seg.seg } ).join(tsek)
  return (common) ? clean : {ambi: true, seg: ambi, docs: []}
  // log('CLEAN', clean)
}

// а здесь ведь тоже можно, если сегменты длинные, выбирать сначала только длинные dicts?
function makeChains(pdchs, docs) {
  let chains = []
  let fulls = []
  pdchs.forEach(segs=>{
    let chain = []
    let any = false
    let full = true
    segs.forEach(seg=>{
      let segdocs = _.filter(docs, doc => { return startWith(seg, doc.dict) })
      if (segdocs.length) any = true
      if (!segdocs.length) full = false
      let doc = {seg: seg, docs: segdocs}
      chain.push(doc)
    })
    if (any) chains.push(chain)
    if (full) fulls.push(chain)
  })
  let bests, full
  if (fulls.length) bests = selectBests(fulls), full = true
  else bests = selectBests(chains)
  return {chains: bests, full: full}
}

function selectBests(chains) {
  let max = _.max(chains.map(chain => {  return _.sum(chain.map(segment => { return segment.docs.length ? segment.seg.length : 0 }))/chain.length } ) )
  // log('MAX', max)
  let longests = _.filter(chains, chain => { return _.sum(chain.map(segment => { return segment.docs.length ? segment.seg.length : 0 }))/chain.length >= max - 1 })
  // longests = _.sortBy(longests, chain => { return _.sum(chain.map(segment => { return segment.docs.length ? segment.seg.length : 0 }))/chain.length }).reverse()
  // log('LNGST', longests)

  let min = _.min(longests.map(chain => {  return chain.length } ) )
  // log('MIN', min)
  let shortests  = _.filter(longests, chain => { return chain.length == min })
  return shortests
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

// let progress = {}
// progress.show = function() {
//   let progress = q('#progress')
//   progress.classList.add('is-shown')
// }

// progress.hide = function() {
//   let progress = q('#progress')
//   progress.classList.remove('is-shown')
// }
