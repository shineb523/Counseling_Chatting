// 상담자 선택 시, 방 생성 페이지로 이동
module.exports = function(req, res) {

    console.log('req.session', req.session);

    if(req.session.withdrawal_boolean==true){
            res.redirect('/already_withdrawn_account');
            return;
    }

    console.log('/create_room 패스 요청됨.');
    res.render('create_room.ejs');
    return;
}
