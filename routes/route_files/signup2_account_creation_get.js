// 회원가입 계정 생성 페이지 호출 시, 이동.
module.exports = function(req, res) {

    console.log('req.session', req.session);

    if(req.session.withdrawal_boolean==true){
            res.redirect('/already_withdrawn_account');
            return;
    }

    console.log('/signup2_account_creation 패스 요청됨.');
    res.render('signup2_account_creation.ejs');
    return;
}
