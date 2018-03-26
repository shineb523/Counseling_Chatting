// 상담자 선택 시, 방 생성 페이지로 이동
module.exports = function(req, res) {

    // 인증 안된 경우
    if (!req.user) {
        console.log('사용자 인증 안된 상태임.');
        res.redirect('/index_signin');
        return;
    }

    console.log('req.session', req.session);

    if(req.session.withdrawal_boolean==true){
            res.redirect('/already_withdrawn_account');
            return;
    }

    var selected_room_creator_id_tmp = req.query.room_creator_id;


    console.log('/join_chatting_room 패스 요청됨.');
    res.render('chatting_room_joined.ejs', {user:req.user, srci:selected_room_creator_id_tmp});
    return;
}
