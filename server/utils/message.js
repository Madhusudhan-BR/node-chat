var generateMessage = function(from,text) {
   return {from: from,
    text: text,
    created: new Date().getTime()
   }

}

var generateLocationMessage = function(from,lat,long) {
    return {
    from: from,
     url: `https://google.com/maps?q=${lat},${long}`,
     created: new Date().getTime()
    }
 
 }

module.exports = {generateMessage, generateLocationMessage};