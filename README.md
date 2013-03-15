QR-ANSI-node
============

Node module for creating QR codes in ANSI

##Install

	npm install qransi
	
##API

####create( text | options )

Creates a string of ANSI characters that when output to the terminal, will display a QR code for the passed in text.

- `text` - text to be turned into QR code
- `options` - object containing:
	- `text` - text to be turned into QR code (required)
	- `correctLevel` - error correction level `0`|`1`|`2`|`3` (defaults to `0`)
	- `white` - ANSI sequence to output white (optional)
	- `black` - ANSI sequence to output black (optional)

##TODO
Check size of terminal using `process.stdout.columns` and `process.stdout.rows` to ensure console is large enough for QR code. If not, prompt user until large enough by handling `process.stdout.on('resize', fn)` event