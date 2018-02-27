// 내 프로필 선택 시, 내 프로필 페이지로 이동.
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

    console.log('/clients_room_list 패스 요청됨.');
    res.render('clients_room_list.ejs');
    return;
}
