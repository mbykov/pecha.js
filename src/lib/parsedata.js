//
import _ from 'lodash'
import { q, qs, empty, create, remove, span, p, div, placePopup } from './utils'
import cholok from 'cholok'

const log = console.log

export function showText(state) {
  if (!state || !state.pars || !state.pars.length) return
  let pars = state.pars
  log('PARS', pars)
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
      // log('SPN', spn)
      let ospan = span(spn.text)
      if (spn.tib) ospan.classList.add('tibetan') // , wfs.push(spn.text)
      if (spn.punct) ospan.classList.add('punct') //, wfs.push(spn.text)
      if (spn.text == ' ') ospan.classList.add('space')
      opar.appendChild(ospan)
    })
    osource.appendChild(opar)
  })

  let grs = qs('span.tibetan')
  if (grs.length == 1) showResults(grs[0].textContent)
}

function showResults(wf) {
  log('ONLYWF', wf)
}

export function fireCholok(str, coords) {
  let trnanscript = cholok(str)
  let ncoords = {top: coords.top - 65, left: coords.left}
  let popup = q('#transcript')
  popup.textContent = trnanscript
  popup.classList.remove('is-hidden')
  log('POP:', popup)
  placePopup(ncoords, popup)
  log('CHH:', trnanscript, coords)
}
