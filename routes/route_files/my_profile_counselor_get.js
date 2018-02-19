// 회원탈퇴 선택 시, 회원탈퇴 사유 제출 페이지로 이동
module.exports = function(req, res) {

    console.log('req.session', req.session);

    if(req.session.withdrawal_boolean==true){
            res.redirect('/already_withdrawn_account');
            return;
    }

    console.log('/my_profile_counselor 패스 요청됨.');
    res.render('my_profile_counselor.ejs');
    return;
}
