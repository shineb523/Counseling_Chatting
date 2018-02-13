// 계정 찾기 선택 시, 계정찾기 페이지로 이동.
module.exports=function(req, res) {
    console.log('/find_account 패스 요청됨.');
    res.render('find_account.ejs');
}
