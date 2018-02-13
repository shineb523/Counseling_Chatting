// 내담자 선택 시 or 둘러보기 선택 시, 방 목록 페이지로 이동
module.exports = function(req, res) {
    console.log('/room_list 패스 요청됨.');
    res.render('room_list.ejs');
}
