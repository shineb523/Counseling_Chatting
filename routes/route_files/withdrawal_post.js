// 회원탈퇴 확인 시, 로그인 계정 데이터의 탈퇴 시간 저장, 탈퇴 여부 true로 변경.
module.exports = function(req, res) {

    console.log('/withdrawal 패스 요청됨.');

    console.log('req.user의 정보');
    console.dir(req.user);

    // 인증 안된 경우
    if (!req.user) {
        console.log('사용자 인증 안된 상태임.');
        res.render('index_signin.ejs', {
            login_success: false
        });
    } else {

        if (!req.app.check_withdrawal) {
            console.log('현재 비밀번호 확인되지 않음.');
            res.render('current_password_confirm_withdrawal.ejs');
            return;
        }

        console.log('사용자 인증된 상태임.');

        var database = req.app.get('database');

        if (database.db) {
            console.log('데이터베이스 연결 성공.');

            database.user_account_model.update({
                id: req.user.id
            }, {
                $set: {
                    withdrawal_at: Date.now(),
                    withdrawal_boolean: true
                }
            }, function(err, result) {
                if (err) {
                    console.log('update 함수 사용 중 에러');
                    res.render('error.ejs');
                    return;
                }
                console.log(result);
                console.log('회원탈퇴 삭제 날짜, 회원탈퇴 유무 업데이트 완료.');
            });

            var withdrawal_reason_selected_post = req.body.withdrawal_reason_selected;
            console.log('withdrawal_reason_selected_post', withdrawal_reason_selected_post);
            var withdrawal_reason_text_post = req.body.withdrawal_reason_text;
            console.log('withdrawal_reason_text_post', withdrawal_reason_text_post);

            if (withdrawal_reason_selected_post == 'e') {
                var tmp_model = new database.user_withdrawal_reason_model({
                    'withdrawal_reason_selected': withdrawal_reason_selected_post,
                    'withdrawal_reason_text': withdrawal_reason_text_post
                });
                tmp_model.save(function(err) {
                    if (err) {
                        throw err;
                    }
                });
            } else {
                var tmp_model = new database.user_withdrawal_reason_model({
                    'withdrawal_reason_selected': withdrawal_reason_selected_post,
                    'withdrawal_reason_text': "none"
                });
                tmp_model.save(function(err) {
                    if (err) {
                        throw err;
                    }
                });

            }

        } else {
            console.log('데이터베이스 연결 실패.');
            res.render('error.ejs');
            return;
        }

        req.logout();
        res.render('withdrawal_success.ejs');
    }
}