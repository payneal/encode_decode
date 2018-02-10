// test
const chai = require('chai');
const expect = chai.expect;
const Convertor = require('../convertor');

let convertor = new Convertor();

describe("encoding  and decoding test", () =>  {

    describe("encoding function", () =>  {
    
        it( '0 should be encoded to "4000"',() => {
            var answer = convertor.encode(0);
            expect(answer).to.equal("4000");
        });

        it('-8192 should be encoded to "0000"', () => {
             var answer = convertor.encode(-8192);
             expect(answer).to.equal("0000");
        });

        it ('8191 should be encoded to "7f7f"', () => {
            var answer = convertor.encode(8191);
            expect(answer).to.equal("7F7F");
        });

        it('2048 should be encoded to "5000"', () => {
            var answer = convertor.encode(2048);
            expect(answer).to.equal("5000");
         });
        
        it('-4096 should be encoded to "2000"', () => {
            var answer = convertor.encode(-4096);
            expect(answer).to.equal("2000");
        });
    
        it("should throw error when given -8193", () => {
            expect(() =>  convertor.encode(-8194)).to.throw(
                "out of range");
        });

        it("should throe error when given 8192", () => {
            expect(() =>  convertor.encode(8192)).to.throw(
                "out of range");
        });
    });

    describe("decoding function", () => {
        it("hi=40, lo=00 should return 0", () => {
            var answer = convertor.decode("40", "00");
            expect(answer).to.equal(0);
        });

        it("hi=00, lo=00 should return -8192", () => {
            var answer = convertor.decode("00", "00");
            expect(answer).to.equal(-8192);
        });
        
        it("hi=7F, lo=7F  should return 8191", () => {
            var answer = convertor.decode("7f", "7f");
            expect(answer).to.equal(8191);
        });

        it("hi=50, lo=00  should return 2048", () => {
            var answer = convertor.decode("50", "00");
            expect(answer).to.equal(2048);
        });
        
        it("hi=0A, lo=05  should return -6907", () => {
            var answer = convertor.decode("0A", "05");
            expect(answer).to.equal(-6907);
        });

        it("hi=55, lo=00  should return 2688", () => {
            var answer = convertor.decode("55", "00");
            expect(answer).to.equal(2688);
        });

        it("should throw error when below '0x00' ", () => {
            expect(() =>  convertor.decode("-10", "10")).to.throw(
                "out of range");
        });

        it("should throw error when above '7f'", () => {
            expect(() =>  convertor.decode("8f", "8")).to.throw(
                "out of range");
        });
    });
});


