// 로그아웃 요청 시, 로그아웃 처리 후 홈으로 이동.
module.exports = function(req, res) {
    console.log('/logout 패스 요청됨.');
    req.logout();
    res.render('index_signin.ejs');
}