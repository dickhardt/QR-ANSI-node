
/*
* ANSI QRCode generator
*
* Copyright (c) 2013 Dick Hardt
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*
* The word "QR Code" is registered trademark of
* DENSO WAVE INCORPORATED
*   http://www.denso-wave.com/qrcode/faqpatent-e.html
*/

var QRCode = require('./qrcode')

exports.lastSize = 0  // stores last QR size

exports.create = function ( passedOptions ) {
  // if options is string,
  if( typeof passedOptions === 'string' ){
    passedOptions = { text: passedOptions }
  }
  // set default options
  var options =
    { correctLevel  : QRCode.QRErrorCorrectLevel.M
    , white    : '\033[47m  \033[0m'
    , black    : '\033[40m  \033[0m'
    }
  // merge in options
  for (var x in passedOptions)
    options[x] = passedOptions[x]

  var WHITE = options.white
  var BLACK = options.black

  var output = ''

  var pixels = function ( color, size ) {
    if ( !size ) size = 1
    for ( var i = 0; i<size; i++ )
      output += color
  }

  var newline = function () {
    output += BLACK + '\n'
  }

  var qrcode  = new QRCode.create( options.typeNumber, options.correctLevel )
  qrcode.addData( options.text )
  qrcode.make()
  var width = qrcode.getModuleCount()
  exports.lastSize = width
  pixels( WHITE, width + 2 )
  newline( WHITE )
  for (var row=0; row<width; row++) {
    pixels( WHITE )
    for (var col=0; col<width; col++) {
      pixels( qrcode.isDark( row, col ) ? BLACK : WHITE )
    }
    pixels( WHITE )
    newline()
  }
  pixels( WHITE, width + 2 )
  newline()
  return output
}

exports.output = function ( passedOptions ) {
  var output = exports.create( passedOptions )

}