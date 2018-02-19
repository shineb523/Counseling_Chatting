// 로그인 여부 확인 되었을 시, 선택 화면으로 이동.
module.exports = function(req, res) {
    console.log('/database_connect_error 패스 요청됨.');
    res.render('database_connect_error.ejs');
    return;
}
