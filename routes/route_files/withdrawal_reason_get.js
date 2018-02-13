// 회원탈퇴 선택 시, 회원탈퇴 사유 제출 페이지로 이동
module.exports = function(req, res) {
    console.log('/withdrawal_reason 패스 요청됨.');
    res.render('withdrawal_reason.ejs');
}
