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
  el.textContent = ''
  chain.forEach((seg, idx)=> {
    let ospan
    if (seg.ambi) {
      ospan = span(seg.seg, 'tibambi')
      ospan.dataset.chains = JSON.stringify(seg.chains)
    } else if (seg.docs.length) {
      ospan = span(seg.seg, 'tibwf')
      ospan.dataset.docs = JSON.stringify(seg.docs)
    } else {
      ospan = span(seg.seg, 'tibphrase')
    }
    el.appendChild(ospan)
    if (idx < chain.length-1) el.appendChild(span(tsek, 'tsek'))
  })
  let progress = q('#progress')
  progress.classList.remove('is-shown')
}

function createPopup(el, upper) {
  let oambi = (upper) ? q('#upper') : q('#ambi')
  let coords = getCoords(el)
  empty(oambi)
  oambi.classList.remove('is-hidden')
  let ncoords = {top: coords.bottom + 2, left: coords.left}
  placePopup(ncoords, oambi)
  let oul = create('ul', 'ambilist')
  oambi.appendChild(oul)
  return oul
}

export function showPopup(el, compound) {
  let chains
  try {
    chains = JSON.parse(el.dataset.chains)
  } catch(err) {
    log('ERR: JSON chains', el)
    return
  }
  let upper = (el.closest('.tibpar')) ? false : true
  let oul = createPopup(el, upper)
  // if (el.classList.contains('tibambi')) showAmbi(oul, chains)
  // else if (el.classList.contains('tibwf')) showCompound(oul, chains)
  if (compound) showCompound(oul, chains)
  else showAmbi(oul, chains)

  let progress = q('#progress')
  progress.classList.remove('is-shown')
}

function showAmbi(oul, chains) {
  oul.classList.add('danger')
  chains.forEach(chain=> {
    let oline = create('li', 'ambiline')
    oul.appendChild(oline)
    chain.forEach(seg=> {
      let owf = (seg.docs.length) ? span(seg.seg, 'tibwf') : span(seg.seg, 'tibphrase')
      if (seg.docs.length) owf.dataset.docs = JSON.stringify(seg.docs)
      oline.appendChild(owf)
    })
  })
}

function showCompound(oul, chains) {
  log('COMPOUND', chains)
  chains.forEach(seg=> {
    let oline = create('li', 'ambiline')
    oul.appendChild(oline)
    let ospan
    if (seg.ambi) {
      ospan = span(seg.seg, 'tibambi')
      ospan.dataset.chains = JSON.stringify(seg.chains)
    } else if (seg.docs.length) {
      ospan = span(seg.seg, 'tibwf')
      ospan.dataset.docs = JSON.stringify(seg.docs)
    } else {
      ospan = span(seg.seg, 'tibphrase')
    }
    oline.appendChild(ospan)
  })
}

export function showResults(el) {
  let osource = q('#source')
  let oresult = q('#result')
  empty(oresult)
  let wf = el.textContent

  let docs = JSON.parse(el.dataset.docs)
  try {
    docs = JSON.parse(el.dataset.docs)
  } catch(err) {
    log('ERR: JSON docs')
    return
  }
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
    if (!doc.trns) log('NO TRNS', doc)
    if (!doc.trns) return
    doc.trns.forEach(trn=> {
      let oline = create('li', 'dict-line')
      oline.textContent = trn
      oul.appendChild(oline)
    })
  })
}


export function noResult(el) {
  log('NO RESULT')
  // let oresult = q('#result')
  // empty(oresult)
  let progress = q('#progress')
  progress.classList.remove('is-shown')
}
