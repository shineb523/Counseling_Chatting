// 비밀번호 수정 선택 시, 비밀번호 수정 페이지로 이동
module.exports = function(req, res) {

    console.log('req.session', req.session);

    if(req.session.withdrawal_boolean==true){
            res.redirect('/already_withdrawn_account');
            return;
    }

    console.log('/current_password_confirm_failed_changepwd 패스 요청됨.');
    res.render('current_password_confirm_failed_changepwd.ejs');
    return;
}
