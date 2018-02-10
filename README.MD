# to run test
* install node & npm if not installed
* run: npm init
* run: npm test

# to run program
* make sure node is installed
* (just in case, for this I used node v8.60)
* node index.js

## example use of index.js
* whould you like to decode or encode(D/E)?D
* what is your hi?55
* what is your lo?00
* 55 00 decoded = 2688

* whould you like to decode or encode(D/E)?E
* what is the number you wish to encode?2048
* 2048 encoded = 5000

## to use independently
* const Convertor = require(...path)
* let convertor = new Convertor();
* convertor.encode(number) will return encode
* convertor.decode( hi, lo) will return decode
