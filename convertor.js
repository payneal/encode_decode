function Convertor () {
    var self = this;

    this.encode = function(number) {
        valid_encode(number);
        number = convert_number_form(
            adjustment_of_8192(number, "encode"), 10, 2);
        number = make_binary_number_16_bits(number);
        return encode_process(number);
    }

    this.decode = function(hi, lo) {
        valid_decode(hi);
        valid_decode(lo);
        number = convert_number_form(hi+lo, 16, 2);
        number = make_binary_number_16_bits(number);
        return decode_process(number);
    }

    function valid_encode(number) { 
        if (number <= -8193 || number >= 8192)
            throw new Error("out of range");
    }

    function valid_decode(number) {
        number = convert_number_form(number,16, 10);
        if (number > 127 || number < 0)
            throw new Error("out of range");
    }

    function convert_number_form(number, from, to) {
        return parseInt(number,from).toString(to);
    }

    function adjustment_of_8192(number, type) {
        if (type == "encode") return number + 8192;
        return number - 8192;
    }

    function make_binary_number_16_bits(number) {
        var adding = 16 - number.length;
        var addedSting = ""; 
        for (var x=0; x < adding; x++) 
            addedSting += "0";
        return addedSting + number;  
    }

    function encode_process(number) {
        var part_one = get_substring(number, 0, 8);
        var part_two = get_substring(number, 8, 16);
        if(part_one.includes("1")) 
            return to_hex(shift_forward(part_one, part_two));
        return to_hex(erase_commas(part_one.concat(part_two)));
    }

    function get_substring(number, start, end) {
        return number.substring(start, end).split("");
    }
   
    function shift_forward(part_one, part_two) {
        part_one = part_one.splice(0);
        part_one.push(part_two[0])
        part_two[0] = 0;
        return erase_commas(part_one.concat(part_two));
    }

    function erase_commas(part) {
        return part.toString().replace(/,/g, "");
    }
 
    function decode_process(number) {
        var part_one = get_substring(number, 0, 8);
        var part_two = get_substring(number, 8, 16);
        if (part_one.includes("1")) {
            number = shift_back(part_one, part_two);
            number = convert_number_form(number,2,10);
        }
        return adjustment_of_8192(number, "decode");
    }

    function shift_back(part_one, part_two) {
        var hold = part_one[7];
        part_one = part_one.slice(0, -1);
        part_one.unshift(0);
        part_two[0] = hold;
        return erase_commas(part_one.concat(part_two));
    }

    function to_hex(number) {
        number = convert_number_form(number, 2, 16);
        if (number == 0) return "0000";
        return number.toUpperCase();
    }
}

module.exports = Convertor
