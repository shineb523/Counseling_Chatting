// 회원탈퇴 선택 시, 비밀번호 확인 페이지로 이동.
module.exports = function(req, res) {

    if(req.session.withdrawal_boolean==true)

    console.log('/already_withdrawn_account 패스 요청됨.');
    res.render('already_withdrawn_account.ejs');
    return;
}
