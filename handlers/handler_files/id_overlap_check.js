var database = require('../../database/database_loader');

var id_overlap_check = function(params, callback) {
    console.log('jsonRPC id_overlap_check 호출됨.');
    console.dir(params);

    if (database) {
        console.log('database 객체 참조됨.');
    } else {
        console.log('database 객체 참조 실패.');
        callback({
            code: 410,
            message: 'database 객체 참조 실패'
        }, null);
        return;
    }

    var overlap_check_id = params[0];

    database.user_account_model.findOne({
        'id': overlap_check_id
    }, function(err, user) {
        if (err) {
            console.log(err);
            console.log('findOne 함수 호출 중 오류 발생.');
            throw err;
            return;
        }
        var output;
        // 등록된 사용자가 이미 있는 경우
        if (user) {
            console.log('이미 아이디가 존재함.');
            output = 'o';
        } else {
            // 기존에 등록된 아이디가 없는 경우
            console.log('아이디가 존재하지 않음.');
            output = 'x';
        }

        callback(null, output);

    });

};

module.exports = id_overlap_check;
