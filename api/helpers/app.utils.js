/*
* Oriontek Test
* @author Leomar Artiles
*/

'use strict';
// var Password = require("node-php-password");

class AppUtils {

	genRandCode(length) {
		let result = '';
		let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() *
				charactersLength));
		}
		return result.toUpperCase();	//return bcrypt.hashSync(password, 10);
	}
}

module.exports = new AppUtils();
