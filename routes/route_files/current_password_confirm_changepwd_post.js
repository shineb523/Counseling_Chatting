module.exports = function(req, res) {

    var current_password = req.body.current_password;

    console.log('/current_password_confirm_changepwd 패스 요청됨.');

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

        var database = req.app.get('database');

        if (database.db) {
            console.log('데이터베이스 연결 성공.');
            database.user_account_model.findOne({
                'id': req.user.id
            }, function(err, user) {
                if (err) {
                    console.log(err);
                    console.log('findOne 함수 호출 중 오류 발생.');
                    res.render('error.ejs');
                    return;
                }

                // 등록된 사용자가 없는 경우
                if (!user) {
                    console.log('세션 아이디가 데이터베이스에 존재하지 않거나, 세션이 존재하지 않음.');
                    res.render('error.ejs');
                    return;
                }

                // 비밀번호 비교하여 맞지 않는 경우
                var authenticated = user.authenticate(current_password, user._doc.salt, user._doc.hashed_password);
                if (!authenticated) {
                    console.log('현재 비밀번호 일치하지 않음.');
                    res.render('current_password_confirm_failed_changepwd.ejs');
                    return;
                }

                if ((!err) && user && authenticated) {
                    // 정상인 경우
                    console.log('현재 비밀번호가 일치함.');
                    req.app.check_changepwd = true;
                    console.log(req.app.check_changepwd);
                    res.render('modify_password.ejs');
                }
            });
        } else {
            console.log('데이터베이스 연결 실패.');
            res.render('error.ejs');
            return;
        }
    }
}
