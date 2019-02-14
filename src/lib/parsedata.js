//
import _ from 'lodash'
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup } from './utils'
import cholok from 'cholok'
import { tibsyms, tibsyls } from "./tibetan_data";
// import { possibleKeys } from "./segmenter";
// import { getPossible } from "./pouch";

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

// log('PARENT', parent.classList)
// if (bests.length == 1) replaceEL(el, bests[0])
// else {
//   if (parent.classList.contains('tibpar')) {
//     showAmbis(el, bests)
//   } else if (parent.classList.contains('ambiline')) {
//     log('HERE')
//     // showAmbis(el, bests)
//   }
// }
export function parsePhrase(el, bests) {
  let parent = el.parentNode
  if (bests.length == 1) replaceEL(el, bests[0])
  else {
    log('AMBI')
  }


  let progress = q('#progress')
  progress.classList.remove('is-shown')
}

function replaceEL(el, best) {
  el.textContent = ''
  best.forEach((seg, idx)=> {
    let ospan
    if (seg.docs.length) {
      ospan = span(seg.seg, 'tibwf')
      ospan.dataset.docs = JSON.stringify(seg.docs)
    } else {
      ospan = span(seg.seg, 'tibphrase')
    }
    el.appendChild(ospan)
    if (idx < best.length-1) el.appendChild(span(tibsyms.tsek, 'tibtsek'))
  })
}

function showAmbis(el, bests) {
  let coords = getCoords(el)
  // log('SHOW AMBI', coords)
  let oambi = q('#ambi')
  empty(oambi)
  oambi.classList.remove('is-hidden')
  let ncoords = {top: coords.bottom + 12, left: coords.left}
  placePopup(ncoords, oambi)
  let oul = create('ul', 'ambilist')
  oambi.appendChild(oul)
  bests.forEach(chain=> {
    let oline = create('li', 'ambiline')
    oul.appendChild(oline)
    chain.forEach(seg=> {
      // log('===>SEG', seg)
      let owf = (seg.docs.length) ? span(seg.seg, 'tibwf') : span(seg.seg, 'tibphrase')
      oline.appendChild(owf)
      showResults(el)
    })
  })
}


export function showResults(el) {
  let osource = q('#source')
  let oresult = q('#result')
  empty(oresult)
  let wf = el.textContent
  let docs = JSON.parse(el.dataset.docs)
  // log('RESULT docs', wf, docs)
  oresult.textContent = wf
  // let oseg
}

export function noResult(el) {
  log('NO RESULT', el.textContent)
  let oresult = q('#result')
  empty(oresult)
  let progress = q('#progress')
  progress.classList.remove('is-shown')
}
