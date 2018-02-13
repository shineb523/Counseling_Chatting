// 로그인 실패 시, 아이디 패스워드 확인 메시지 출력.
module.exports = function(req, res) {
    console.log('/signin_failed_authentication 패스 요청됨.');
    res.render('index_failed_authentication.ejs');
}