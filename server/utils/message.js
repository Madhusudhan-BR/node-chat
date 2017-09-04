var moment = require('moment');

var generateMessage = function(from,text) {
   return {from: from,
    text: text,
    created: moment.valueOf()
   }

}

var generateLocationMessage = function(from,lat,long) {
    return {
    from: from,
     url: `https://google.com/maps?q=${lat},${long}`,
     created: moment.valueOf()
    }
 
 }

module.exports = {generateMessage, generateLocationMessage};