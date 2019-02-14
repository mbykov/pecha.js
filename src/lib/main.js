//
import _ from 'lodash'
import { q, qs, empty, create, remove, span, p, div, getCoords } from './utils'
import { parsePDCHs, scrape, segmenter, totalKeys } from "./segmenter";
import { getPossible } from "./pouch";
import { tibsyms, tibsyls } from "./tibetan_data";
import { showResults, parsePhrase } from "./parsedata";


const log = console.log

export function mainResults(el) {
  let progress = q('#progress')
  progress.classList.add('is-shown')
  let str = el.textContent.trim()
  let segs = str.split(tibsyms.tsek)
  // let pdchs = parsePDCHs(syls)
  // let flakes = scrape(segs)
  // log('MAIN flakes:', flakes)

  let pdchs = segmenter(str)
  // log('MAIN pdchs:', segs.length, '=>', pdchs.length, pdchs)

  let keys = totalKeys(pdchs)
  log('MAIN keys:', keys.length)
  // return

  getPossible(keys)
    .then(docs=> {
      log('UNFDOCS', docs)
      docs = _.flatten(docs)
      log('DOCS', docs)
      let chains = makeChains(pdchs, docs)
      log('CHs', chains.length)
      let fulls = fullChains(chains)
      log('chains: ', chains.length, 'fulls: ', fulls.length)
      if (fulls.length) chains = fulls
      log('CHs', chains)
      let bests = selectLongest(chains)
      log('bests =>', bests.length, bests)
      // let best = bests[0]
      parsePhrase(el, bests)
      // showResults(best, docs)
    })
}

// а здесь ведь тоже можно, если сегменты длинные, выбирать сначала только длинные dicts?
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

// неверно, min не нужен (работает только если full?), или нужны квадраты?
function selectLongest(chains) {
  let max = _.max(chains.map(chain => {  return _.sum(chain.map(segment => { return segment.docs.length ? segment.seg.length : 0 }))/chain.length } ) )
  log('MAX', max)
  let longests = _.filter(chains, chain => { return _.sum(chain.map(segment => { return segment.docs.length ? segment.seg.length : 0 }))/chain.length >= max - 1 })
  // longests = _.sortBy(longests, chain => { return _.sum(chain.map(segment => { return segment.docs.length ? segment.seg.length : 0 }))/chain.length }).reverse()
  // log('LNGST', longests)

  // let min = _.min(longests.map(chain => {  return chain.length } ) )
  // log('MIN', min)
  // let shortests = _.filter(longests, chain => { return chain.length == min })
  return longests
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
