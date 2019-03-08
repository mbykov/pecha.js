//
import _ from 'lodash'
import { q, qs, empty, create, remove, span, p, div, getCoords, placePopup, getInnermostHovered } from './utils'
import cholok from 'cholok'
import { tibsyms, tibsyls } from "./tibetan_data";
import { ipcRenderer } from "electron";
const settings = require('electron').remote.require('electron-settings')

let tsek = tibsyms.tsek
const log = console.log

export function showText(state) {
  let pars = state.pars
  let osource = q('#source')
  let oresult = q('#result')
  empty(osource)
  empty(oresult)

  pars.forEach(spans => {
    let opar = p()
    opar.classList.add('tibpar')
    spans.forEach(spn => {
      let ospan = span(spn.text)
      if (spn.lang) ospan.classList.add('tibphrase') // , wfs.push(spn.text)
      else if (spn.punct) ospan.classList.add('punct') //, wfs.push(spn.text)
      else ospan.classList.add('space')
      opar.appendChild(ospan)
    })
    osource.appendChild(opar)
  })

  let grs = qs('span.tibetan')
  // if (grs.length == 1) showResults(grs[0].textContent)
}

export function showCholok(el, cumulative) {
  let coords = getCoords(el)
  let trnanscript = (cumulative) ? cholok(el.textContent, true) : cholok(el.textContent)
  let ncoords = {top: coords.top - 40, left: coords.left + 15}
  let otrans = q('#transcript')
  otrans.textContent = trnanscript
  otrans.classList.remove('is-hidden')
  placePopup(ncoords, otrans)
}

export function parsePhrase(el, chain, lastsek) {
  if (!el) return
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
  if (lastsek) el.appendChild(span(tsek, 'tsek'))
}

function createPopup(el, upper) {
  let oambi
  if (upper) {
    oambi = create('div', 'popup')
    oambi.classList.add('upper')
    document.body.appendChild(oambi)
  } else oambi = q('#ambi')

  let coords = getCoords(el)
  empty(oambi)
  oambi.classList.remove('is-hidden')
  let ncoords = {top: coords.bottom-3, left: coords.left}
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
    log('ERR: JSON chains', el) // ================== ошибка есть
    return
  }
  let upper = (el.closest('.tibpar')) ? false : true
  let oul = createPopup(el, upper)
  // if (el.classList.contains('tibambi')) showAmbi(oul, chains)
  // else if (el.classList.contains('tibwf')) showCompound(oul, chains)
  if (compound) showCompound(oul, chains)
  else showAmbi(oul, chains)
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
  // log('COMPOUND', chains)
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

  let cfg = settings.get('cfg')
  let str = JSON.parse(JSON.stringify(cfg))
  // log('CFG', str)

  docs.forEach(doc=> { doc.weight = _.find(cfg, dict=> { return doc.dname == dict.name }).idx })
  docs = _.sortBy(docs, 'weight')
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
  // log('NO RESULT')
  // let oresult = q('#result')
  // empty(oresult)
}

let xxx = function(n,o,u) {
  if (n._id && !n._id.indexOf("_local/")) return;
  if (!u || !u.roles || u.roles.indexOf("_admin") == -1) { throw({forbidden:'Denied.' })}
}


// ======================= DBS ==============================

export function askDBs(el, compound) {
  let progress = q('#progress')
  progress.classList.remove('is-hidden')
  let text = el.textContent.trim()
  let retsek = new RegExp(tsek+'$')
  let str = text.replace(retsek, '')
  let last = _.last(text)
  let lastsek = (last == tsek) ? true : false
  let query = {str: str, compound: compound, lastsek: lastsek}
  ipcRenderer.send('queryDBs', query)
}

ipcRenderer.on('replayDBs', function (event, query) {
  let progress = q('#progress')
  progress.classList.remove('is-hidden')
  let chain = query.chain
  let el = getInnermostHovered()
  if (!chain) {
    noResult(el)
    return
  }
  if (query.compound) {
    el.dataset.chains = JSON.stringify(chain)
    showPopup(el, true)
  }
  else parsePhrase(el, chain, query.lastsek)
})
