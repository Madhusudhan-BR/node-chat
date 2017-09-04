var expect = require('expect'); 

var {generateMessage} = require('./message.js'); 
var {generateLocationMessage} = require('./message.js'); 


describe('generateMessage', () => {
    it('should generate message', () => {
        var res = generateMessage('admin', 'hello');
        expect(res.created).toBeA('number');
        expect(res).toInclude({from : 'admin',
         text :'hello'
        });
        
    });
}); 

describe('generateLocationMessage', () => {
    it('should generate location message', () => {
        var res = generateLocationMessage('admin', 133.13, -12.21);
        expect(res.created).toBeA('number');
        expect(res).toInclude({from : 'admin',
         url :'https://google.com/maps?q=133.13,-12.21'
        });
        
    });
}); 