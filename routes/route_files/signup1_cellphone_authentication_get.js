// 회원가입 휴대폰 본인인증 페이지 요청 시, 이동.
module.exports = function(req, res) {
    console.log('/signup1_cellphone_authentication 패스 요청됨.');
    res.render('signup1_cellphone_authentication.ejs');
}