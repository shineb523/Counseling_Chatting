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


    console.log('/create_room 패스 요청됨.');

    var id_tmp = req.user.id;
    var room_title_tmp = req.body.room_title;
    var counsel_type_tmp = req.body.counsel_type;
    var room_creator_type_tmp = req.body.room_creator_type;

    var database = req.app.get('database');

    // making model instance object and save it.
    var user = new database.room_list_model({
        'room_title':room_title_tmp,
        'room_creator':id_tmp,
        'room_creator_type':room_creator_type_tmp,
        'counsel_type':counsel_type_tmp
    });

    console.log('room_list_model_obejct to save : ', user);

    user.save(function(err) {
        if (err) {
            throw err;
        }

        console.log("Successfully added new room data to room list database");
    });

    var create_room_data_tmp={ id:id_tmp, room_title:room_title_tmp, counsel_type:counsel_type_tmp,
                                room_creator_type:room_creator_type_tmp };

    res.render('chatting_room.ejs', {create_room_data:create_room_data_tmp});
    return;
}
