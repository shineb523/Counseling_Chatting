// 회원가입 휴대폰 본인인증 페이지 요청 시, 이동.
module.exports = function(req, res) {

    console.log('req.session', req.session);

    if(req.session.withdrawal_boolean==true){
            res.redirect('/already_withdrawn_account');
            return;
    }

    console.log('/signup1_cellphone_authentication 패스 요청됨.');
    res.render('signup1_cellphone_authentication.ejs');
    return;
}
