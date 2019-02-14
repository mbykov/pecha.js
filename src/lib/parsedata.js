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

// function showResults(wf) {
//   log('ONLYWF', wf)
// }


export function showCholok(el) {
  let coords = getCoords(el)
  let trnanscript = cholok(el.textContent)
  let ncoords = {top: coords.top - 40, left: coords.left + 15}
  let popup = q('#transcript')
  popup.textContent = trnanscript
  popup.classList.remove('is-hidden')
  placePopup(ncoords, popup)
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
  log('SHOW AMBIS', coords)
  let oambis = q('#ambis')
  oambis.textContent = 'kukuku'
  oambis.classList.remove('is-hidden')
}


export function showResults(chain, dicts) {
  let osource = q('#source')
  let oresult = q('#result')
  let text = 'KUKU'
  oresult.textContent = text
  let oseg
}
