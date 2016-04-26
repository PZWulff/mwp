/*
Copyright (c) 2016, Peter Zinck Wulff
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of mwp nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
var args = process.argv.slice(2);
var fs = require('fs-extra');
var xml2js = require('xml2js');
var version = '0.1.0';

if (args.length > 0) {
    var myPath = require('path').dirname(args[1]);
    var myPreFix = 'obj/' + args[0] + '/Package/PackageTmp/';
    var parser = new xml2js.Parser();
    fs.readFile(args[1], function (err, data) {
        parser.parseString(data, function (err, result) {
            for (var i = 0; i < result.Project.ItemGroup.length; i++) {
                var obj = result.Project.ItemGroup[i];
                var items = Object.keys(obj);
                items.forEach(function (item) {
                    if (item == 'Content') {
                        for (var j = 0; j < obj[item].length; j++) {
                            var myFile = obj[item][j].$.Include;
                            myFile = myFile.replace(/\\/g, "/");
                            fs.copy(myPath + '/' + myFile, myPath + '/' + myPreFix + myFile);
                        }
                    }
                });
            }
        });
    });
    fs.copySync(myPath + '/bin', myPath + '/' + myPreFix + 'bin');
} else {
    console.log('Mono Web Publish Version ' + version);
    console.log('Copyright (c) 2016, Peter Zinck Wulff All rights reserved.');
    console.log('Usage: mwp <configuration> <projectfile>');
}
