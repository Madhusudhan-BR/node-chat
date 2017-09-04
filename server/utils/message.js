var generateMessage = function(from,text) {
   return {from: from,
    text: text,
    created: new Date().getTime()
   }

}

module.exports = {generateMessage};