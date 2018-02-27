// 회원탈퇴 선택 시, 비밀번호 확인 페이지로 이동.
module.exports = function(req, res) {

    // 인증 안된 경우
    if (!req.user) {
        console.log('사용자 인증 안된 상태임.');
        res.redirect('/index_signin');
        return;
    }

    console.log('/already_withdrawn_account 패스 요청됨.');
    res.render('already_withdrawn_account.ejs');
    return;
}
