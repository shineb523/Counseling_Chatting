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
    var user_account_schema = mongoose.Schema({
        id: {
            type: String,
            required: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        salt: {
            type: String,
            required: true
        },
        created_at: {
            type: Date,
            required: true,
            'default': Date.now()
        },
        updated_at: {
            type: Date,
            required: true,
            'default': Date.now()
        },
        withdrawal_at: {
            type: Date,
            required: true,
            'default': Date.now()
        },
        withdrawal_boolean: {
            type: Boolean,
            required: true,
            'default': false
        }
    });

    // password를 virtual 메소드로 정의 : MongoDB에 저장되지 않는 편리한 속성임. 특정 속성을 지정하고 set, get 메소드를 정의함
    user_account_schema
        .virtual('password')
        .set(function(password) {
            this._password = password;
            this.salt = this.makeSalt();
            this.hashed_password = this.encryptPassword(password);
            console.log('virtual password 호출됨 : ' + this.hashed_password);
        })
        .get(function() {
            return this._password
        });

    // 스키마에 모델 인스턴스에서 사용할 수 있는 메소드 추가
    // 비밀번호 암호화 메소드
    user_account_schema.method('encryptPassword', function(plainText, inSalt) {
        if (inSalt) {
            return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex');
        } else {
            return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex');
        }
    });

    // salt 값 만들기 메소드
    user_account_schema.method('makeSalt', function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    });

    // 인증 메소드 - 입력된 비밀번호와 비교 (true/false 리턴)
    user_account_schema.method('authenticate', function(plainText, inSalt, hashed_password) {
        if (inSalt) {
            console.log('authenticate 호출됨 : %s -> %s : %s', plainText, this.encryptPassword(plainText, inSalt), hashed_password);
            return this.encryptPassword(plainText, inSalt) === hashed_password;
        } else {
            console.log('authenticate 호출됨 : %s -> %s : %s', plainText, this.encryptPassword(plainText), this.hashed_password);
            return this.encryptPassword(plainText) === this.hashed_password;
        }
    });

    // 값이 유효한지 확인하는 함수 정의
    var validatePresenceOf = function(value) {
        return value && value.length;
    };

    // 저장 시의 트리거 함수 정의 (password 필드가 유효하지 않으면 에러 발생)
    user_account_schema.pre('save', function(next) {
        if (!this.isNew) return next();

        if (!validatePresenceOf(this.password)) {
            next(new Error('유효하지 않은 password 필드입니다.'));
        } else {
            next();
        }
    })

    // 입력된 칼럼의 값이 있는지 확인
    user_account_schema.path('id').validate(function(id) {
        return id.length;
    }, 'id 칼럼의 값이 없습니다.');

    user_account_schema.path('hashed_password').validate(function(hashed_password) {
        return hashed_password.length;
    }, 'hashed_password 칼럼의 값이 없습니다.');


    // 모델 객체에서 사용할 수 있는 메소드 정의
    user_account_schema.static('findById', function(id, callback) {
        return this.find({
            id: id
        }, callback);
    });

    user_account_schema.static('findAll', function(callback) {
        return this.find({}, callback);
    });

    console.log('user_account_schema 정의함.');

    return user_account_schema;
};

// module.exports에 user_account_schema 객체 직접 할당
module.exports = Schema;