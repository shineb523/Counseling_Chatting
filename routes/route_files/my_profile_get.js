// 내 프로필 선택 시, 내 프로필 페이지로 이동.
module.exports = function(req, res) {
console.log('/my_profile 패스 요청됨.');
res.render('my_profile.ejs');
}
