// 회원가입 성공 시, 회원가입 환영 페이지로 이동과 동시에 가입자 모델객체 전달.
module.exports = function(req, res) {
    console.log('/signup_success 패스 요청됨.');
    res.render('signup_success.ejs', {
        user: req.user
    });
}