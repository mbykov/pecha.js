//
import _ from 'lodash'
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup } from './utils'
import cholok from 'cholok'
import { tibsyms, tibsyls } from "./tibetan_data";
// import { possibleKeys } from "./segmenter";
// import { getPossible } from "./pouch";

let tsek = tibsyms.tsek
const log = console.log

export function showText(state) {
  if (!state || !state.pars || !state.pars.length) return
  let pars = state.pars
  // log('PARS', pars)
  // let progress = q('#progress')
  // progress.classList.add('is-shown')
  let osource = q('#source')
  let oresult = q('#result')
  empty(osource)
  empty(oresult)

  // let wfs = []
  pars.forEach(spans => {
    let opar = p()
    opar.classList.add('tibpar')
    spans.forEach(spn => {
      let ospan = span(spn.text)
      if (spn.tib) ospan.classList.add('tibphrase') // , wfs.push(spn.text)
      if (spn.punct) ospan.classList.add('punct') //, wfs.push(spn.text)
      if (spn.text == ' ') ospan.classList.add('space')
      opar.appendChild(ospan)
    })
    osource.appendChild(opar)
  })

  let grs = qs('span.tibetan')
  // if (grs.length == 1) showResults(grs[0].textContent)
}

export function showCholok(el) {
  let coords = getCoords(el)
  // log('SHOW TRANS', coords)
  let trnanscript = cholok(el.textContent)
  let ncoords = {top: coords.top - 40, left: coords.left + 15}
  let otrans = q('#transcript')
  otrans.textContent = trnanscript
  otrans.classList.remove('is-hidden')
  placePopup(ncoords, otrans)
}

export function parsePhrase(el, chain) {
  // let parent = el.parentNode
  el.textContent = ''
  chain.forEach((seg, idx)=> {
    let ospan
    if (seg.docs.length) {
      ospan = span(seg.seg, 'tibwf')
      ospan.dataset.docs = JSON.stringify(seg.docs)
    } else if (seg.ambi) {
      ospan = span(seg.seg, 'tibambi')
      ospan.dataset.docs = JSON.stringify(seg.docs)
    } else {
      ospan = span(seg.seg, 'tibphrase')
    }
    el.appendChild(ospan)
    if (idx < chain.length-1) el.appendChild(span(tsek, 'tsek'))
  })
}

function placeAmbi(el) {
  let oambi = q('#ambi')
  let coords = getCoords(el)
  empty(oambi)
  oambi.classList.remove('is-hidden')
  let ncoords = {top: coords.bottom + 2, left: coords.left}
  placePopup(ncoords, oambi)
  let oul = create('ul', 'ambilist')
  oambi.appendChild(oul)
  return oul
}

function showAmbis(el, chain) {
  log('SHOW AMBI', chain)
  return
  let oul = placeAmbi(el)
  oul.classList.add('danger')
  // let oul = create('ul', 'ambilist')
  // oambi.appendChild(oul)
  bests.forEach(chain=> {
    let oline = create('li', 'ambiline')
    oul.appendChild(oline)
    chain.forEach(seg=> {
      // log('===>SEG', seg)
      let owf = (seg.docs.length) ? span(seg.seg, 'tibwf') : span(seg.seg, 'tibphrase')
      if (seg.docs.length) owf.dataset.docs = JSON.stringify(seg.docs)
      oline.appendChild(owf)
      showResults(el)
    })
  })
}

export function showCompound(el, chains) {
  log('COMPOUND', el.textContent, chains)
  let oul = placeAmbi(el)
  if (chains.length > 1) showAmbis(el, chains)
  else {
    let chain = chains[0]
    chain.forEach(seg=> {
      let oline = create('li', 'ambiline')
      oul.appendChild(oline)
      let owf = (seg.docs.length) ? span(seg.seg, 'tibwf') : span(seg.seg, 'tibphrase')
      oline.appendChild(owf)
      owf.dataset.docs = JSON.stringify(seg.docs)
      // log('OLINE', seg, oline.textContent)
    })
  }
}

export function showResults(el) {
  let osource = q('#source')
  let oresult = q('#result')
  empty(oresult)
  let wf = el.textContent
  let docs = JSON.parse(el.dataset.docs)
  // log('RESULT docs', wf, docs)
  let odict = create('div', 'dict')
  oresult.appendChild(odict)
  let owf = create('p', 'dict-wf')
  owf.textContent = wf
  odict.appendChild(owf)
  docs.forEach(doc=> {
    let odname = create('p', 'dict-dname')
    odname.textContent = doc.dname
    odict.appendChild(odname)
    let oarticle = create('p', 'dict-article')
    oarticle.textContent = doc.dict
    odict.appendChild(oarticle)
    let oul = create('ul', 'dict-ul')
    odict.appendChild(oul)
    doc.trns.forEach(trn=> {
      let oline = create('li', 'dict-line')
      oline.textContent = trn
      oul.appendChild(oline)
    })
  })
}


export function noResult(el) {
  log('NO RESULT')
  let oresult = q('#result')
  empty(oresult)
  let progress = q('#progress')
  progress.classList.remove('is-shown')
}
