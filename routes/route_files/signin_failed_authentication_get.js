// 로그인 실패 시, 아이디 패스워드 확인 메시지 출력.
module.exports = function(req, res) {

    console.log('req.session', req.session);

    if(req.session.withdrawal_boolean==true){
            res.redirect('/already_withdrawn_account');
            return;
    }

    console.log('/signin_failed_authentication 패스 요청됨.');
    res.render('signin_failed_authentication.ejs');
    return;
}
