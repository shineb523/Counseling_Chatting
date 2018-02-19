// 로그인 여부 확인 되었을 시, 선택 화면으로 이동.
module.exports = function(req, res) {

    console.log('req.session', req.session);

    if(req.session.withdrawal_boolean==true){
            res.redirect('/already_withdrawn_account');
            return;
    }

    console.log('/selection 패스 요청됨.');
    res.render('selection.ejs');
    return;
}
