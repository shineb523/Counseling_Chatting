/**
 * 데이터베이스 스키마를 정의하는 모듈
 *
 * @date 2016-11-10
 * @author Mike
 */

var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {

    // 스키마 정의
    var user_withdrawal_reason_schema = mongoose.Schema({
        withdrawal_reason_selected: {
            type: String,
            'default': ''
        },
        withdrawal_reason_text: {
            type: String,
            'default': ''
        }
    });

    console.log('user_withdrawal_reason_schema 정의함.');

    return user_withdrawal_reason_schema;
};

// module.exports에 user_withdrawal_reason_schema 객체 직접 할당
module.exports = Schema;