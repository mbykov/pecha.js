# Pecha.js, a.k.a. Morpheus for Tibetan


Simple practical tibetan text analyzer on a top of [Electron.js](https://github.com/electron/electron) and [CouchDB](http://couchdb.apache.org/)

Homepage: http://diglossa.org/

Just copy (Ctrl-C) any Tibetan text in UTF-8 (or any part of it) from anywhere on the desktop, and get the result. Then hover the mouse cursor over the analyzed text.

Or Shift-mouse to view the phonetic transcription (look https://github.com/mbykov/cholok for explanations).

![Pecha.js](resources/pecha.js.png?raw=true "pecha.js")

Morpheus family of analyzers, in particular Pecha.js, a.k.a. Morpheus-for-Tibetan are not linguistic programs. Their goal is to help in reading and understanding the ancient text. In order not to introduce a modern way of thinking (that is, what we think and how we used to think in our days), Pecha.js is being developed taking into account the views of the ancient grammarians, starting with T. Sambhota, and not in accordance with modern linguistic theories.

Pecha.js:

- works offline, has packages for Windows, MacOS, Ubuntu, Fedora
- recursively analyzes tibetan phrases up to one-syllable words
- has a phonetic transliteration system Cholok, see https://github.com/mbykov/cholok
- has dictionaries cloned from the server and synchronized with it
- reader can install dictionaries from CSV file also
- Pecha.js integrated with Diglossa.js, https://github.com/mbykov/diglossa.js, so
- the reader can create his own vocabulary for a text or group of texts (this may take some time)
-

## v.0.8 still in progress

next versions:

- server authentication
- editing dictionaries
- publishing dictionaries on the web
- publication dictionary's text version in the version control system, by default on https://github.com

## similar pachages:

- Diglossa - https://github.com/mbykov/diglossa.js - Bilingual Reader
-
- Morpheus for Ancient Greek - https://github.com/mbykov/morpheus-greek
- Morpheus for Chinese - https://github.com/mbykov/morpheus (will be renamed)
- Morpheus for Sanskrit - https://github.com/mbykov/morpheus-sanskrit (deprecated)


## License

  GNU GPL
