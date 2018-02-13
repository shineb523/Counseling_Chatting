// 회원탈퇴 선택 시, 비밀번호 확인 페이지로 이동.
module.exports = function(req, res) {
    console.log('/current_password_confirm_withdrawal 패스 요청됨.');
    res.render('current_password_confirm_withdrawal.ejs');
}