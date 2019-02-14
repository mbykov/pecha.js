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

export function parsePhrase(el, bests) {
  if (bests.length == 1) replaceEL(el, bests[0])
  else showAmbis(el, bests)
  let progress = q('#progress')
  progress.classList.remove('is-shown')
}

function replaceEL(el, best) {
  el.textContent = ''
  best.forEach((seg, idx)=> {
    let ospan = span(seg.seg, 'tibwf')
    el.appendChild(ospan)
    if (idx < best.length-1) {
      let otsek = span(tibsyms.tsek, 'tibtsek')
      el.appendChild(otsek)
    }
  })
}

function showAmbis(el, bests) {
  let coords = getCoords(el)
  // log('SHOW AMBI', coords)
  let oambi = q('#ambi')
  oambi.textContent = 'kukuku'
  oambi.classList.remove('is-hidden')
  let ncoords = {top: coords.bottom + 12, left: coords.left}
  placePopup(ncoords, oambi)
}


export function showResults(el) {
  let osource = q('#source')
  let oresult = q('#result')
  let wf = el.textContent
  log('RESULT: WF', wf)
  oresult.textContent = wf
  // let oseg
}

// function showResults(wf) {
//   log('ONLYWF', wf)
// }
