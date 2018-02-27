// 상담자 선택 시, 방 생성 페이지로 이동
module.exports = function(req, res) {

    // 인증 안된 경우
    if (!req.user) {
        console.log('사용자 인증 안된 상태임.');
        res.redirect('/index_signin');
        return;
    }

    console.log('/withdrawal_cancel 패스 요청됨.');
    res.render('withdrawal_cancel.ejs');
    return;
}
