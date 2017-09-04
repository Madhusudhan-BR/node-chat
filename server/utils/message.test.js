var expect = require('expect'); 

var {generateMessage} = require('./message.js'); 


describe('generateMessage', () => {
    it('should generate message', () => {
        var res = generateMessage('admin', 'hello');
        expect(res.created).toBeA('number');
        expect(res).toInclude({from : 'admin',
         text :'hello'
        });
        
    });
}); 