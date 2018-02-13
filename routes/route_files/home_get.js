// 홈 화면
module.exports = function(req, res) {
    console.log('/ 패스 요청됨.');

    var database = req.app.get('database');

    if (database.db) {
        console.log('데이터베이스 연결 성공.');

        database.user_account_model.find({}, function(err, results) {
            console.log('find 함수 요청됨.');
            if (err) {
                console.log(err);
                console.log('find 함수 호출 중 오류 발생.');
                res.render('error.ejs');
                return;
            }

            if (results) {
                console.log('데이터베이스의 계정 : ');
                console.dir(results);

                for (var i = 0; i < results.length; i++) {
                    if (results[i]._doc.withdrawal_boolean == true) {
                        var user_withdrawal_at = results[i]._doc.withdrawal_at;
                        var date_now = Date.now();
                        console.log('user_withdrawal_at : ', user_withdrawal_at);
                        console.log('date_now : ', date_now);

                        var withdrawal_day_diff = (date_now - user_withdrawal_at) / 1000 / 60 / 60 / 24;
                        console.log('withdrawal_day_diff : ', withdrawal_day_diff);

                        if (withdrawal_day_diff >= 14) {
                            database.user_account_model.deleteOne({}, function(err, resultObj) {
                                if (err) {
                                    console.log('deleteOne 함수 호출 중 오류.');
                                    return done(err);
                                }

                                console.log(resultObj);
                                console.log('회원탈퇴 2주 경과 데이터베이스 삭제 완료.');
                            });
                        }
                    }
                }

            } else {
                console.log('데이터베이스에 계정이 존재하지 않습니다.');

            }

        });

    } else {
        console.log('데이터베이스 연결 실패.');
        res.render('error.ejs');
        return;
    }

    req.app.check_changepwd = false;
    console.log(req.app.check_changepwd);

    req.app.check_withdrawal = false;
    console.log(req.app.check_withdrawal);

    console.log('req.user의 정보');
    console.dir(req.user);

    // 인증 안된 경우
    if (!req.user) {
        console.log('사용자 인증 안된 상태임.');
        res.render('index_signin.ejs', {
            login_success: false
        });
    } else {
        console.log('사용자 인증된 상태임.');
        res.render('selection.ejs', {
            login_success: true
        });
    }


}
