// /**
//  * 패스포트 라우팅 함수 정의
//  *
//  * @date 2016-11-10
//  * @author Mike
//  */
//
// module.exports = function(router, passport) {
//     console.log('user_passport 호출됨.');
//
//     // 홈 화면
//     router.route('/').get(function(req, res) {
//         console.log('/ 패스 요청됨.');
//
//         var database = req.app.get('database');
//
//         if(database.db){
//             console.log('데이터베이스 연결 성공.');
//
//         database.UserModel.find({}, function(err, results){
//             console.log('find 함수 요청됨.');
//             if (err) {
//                 console.log(err);
//                 console.log('find 함수 호출 중 오류 발생.');
//                 res.render('error.ejs');
//                 return;
//             }
//
//             if(results){
//                 console.log('데이터베이스의 계정 : ');
//                 console.dir(results);
//
//                 for(var i = 0; i < results.length; i++){
//                     if(results[i]._doc.withdrawal_boolean==true){
//                         var user_withdrawal_at=results[i]._doc.withdrawal_at;
//                         var date_now=Date.now();
//                         console.log('user_withdrawal_at : ', user_withdrawal_at);
//                         console.log('date_now : ', date_now);
//
//                         var withdrawal_day_diff=(date_now-user_withdrawal_at)/1000/60/60/24;
//                         console.log('withdrawal_day_diff : ', withdrawal_day_diff);
//
//                         if (withdrawal_day_diff>=14) {
//                             database.UserModel.deleteOne({
//                             }, function(err, resultObj){
//                                 if (err) {
//                                     console.log('deleteOne 함수 호출 중 오류.');
//                                     return done(err);
//                                 }
//
//                                 console.log(resultObj);
//                                 console.log('회원탈퇴 2주 경과 데이터베이스 삭제 완료.');
//                             });
//                         }
//                     }
//                 }
//
//             }else{
//                 console.log('데이터베이스에 계정이 존재하지 않습니다.');
//
//             }
//
//         });
//
//     }else{
//         console.log('데이터베이스 연결 실패.');
//         res.render('error.ejs');
//         return;
//     }
//
//         req.app.check_changepwd=false;
//         console.log(req.app.check_changepwd);
//
//         req.app.check_withdrawal=false;
//         console.log(req.app.check_withdrawal);
//
//         console.log('req.user의 정보');
//         console.dir(req.user);
//
//         // 인증 안된 경우
//         if (!req.user) {
//             console.log('사용자 인증 안된 상태임.');
//             res.render('index_signin.ejs', {
//                 login_success: false
//             });
//         } else {
//             console.log('사용자 인증된 상태임.');
//             res.render('selection.ejs', {
//                 login_success: true
//             });
//         }
//
//
//     });
//
//     router.route('/signin_failed_authentication').get(function(req, res) {
//         console.log('/signin_failed_authentication 패스 요청됨.');
//         res.render('index_failed_authentication.ejs');
//     });
//
//     router.route('/signup1_cellphone_authentication').get(function(req, res) {
//         console.log('/signup1_cellphone_authentication 패스 요청됨.');
//         res.render('signup1_cellphone_authentication.ejs');
//     });
//
//     router.route('/signup2_account_creation').get(function(req, res) {
//         console.log('/signup2_account_creation 패스 요청됨.');
//         res.render('signup2_account_creation.ejs');
//     });
//
//     router.route('/find_account').get(function(req, res) {
//         console.log('/find_account 패스 요청됨.');
//         res.render('find_account.ejs');
//     });
//
//     router.route('/selection').get(function(req, res) {
//         console.log('/selection 패스 요청됨.');
//         res.render('selection.ejs');
//     });
//
//     router.route('/signup_success').get(function(req, res) {
//         console.log('/signup_success 패스 요청됨.');
//         res.render('signup_success.ejs', {
//             user: req.user
//         });
//     });
//
//     // 내담자 선택 시 or 둘러보기 선택 시, 방 목록 페이지로 이동
//     router.route('/room_list').get(function(req, res) {
//         console.log('/room_list 패스 요청됨.');
//         res.render('room_list.ejs');
//     });
//
//     // 상담자 선택 시, 방 생성 페이지로 이동
//     router.route('/create_room').get(function(req, res) {
//         console.log('/create_room 패스 요청됨.');
//         res.render('create_room.ejs');
//     });
//
//     // 비밀번호 수정 선택 시, 비밀번호 수정 페이지로 이동
//     router.route('/current_password_confirm_changepwd').get(function(req, res) {
//         console.log('/current_password_confirm_changepwd 패스 요청됨.');
//         res.render('current_password_confirm_changepwd.ejs');
//     });
//
//     // 비밀번호 수정 선택 시, 비밀번호 수정 페이지로 이동
//     router.route('/current_password_confirm_withdrawal').get(function(req, res) {
//         console.log('/current_password_confirm_withdrawal 패스 요청됨.');
//         res.render('current_password_confirm_withdrawal.ejs');
//     });
//
//     // 회원탈퇴 선택 시, 회원탈퇴 사유 페이지로 이동
//     router.route('/withdrawal_reason').get(function(req, res) {
//         console.log('/withdrawal_reason 패스 요청됨.');
//         res.render('withdrawal_reason.ejs');
//     });
//
//     // 회원탈퇴 선택 시, 회원탈퇴 사유 페이지로 이동
//     router.route('/my_profile').get(function(req, res) {
//         console.log('/my_profile 패스 요청됨.');
//         res.render('my_profile.ejs');
//     });
//
//     // 로그아웃
//     router.route('/logout').get(function(req, res) {
//         console.log('/logout 패스 요청됨.');
//         req.logout();
//         res.render('index_signin.ejs');
//     });
//
//
//
//
//     // 로그인 인증
//     router.route('/login').post(passport.authenticate('local-login', {
//         successRedirect: '/selection',
//         failureRedirect: '/signin_failed_authentication',
//         failureFlash: true
//     }));
//
//     // 회원가입 인증
//     router.route('/signup').post(passport.authenticate('local-signup', {
//         successRedirect: '/signup_success',
//         failureRedirect: '/signup2_account_creation',
//         failureFlash: true
//     }));
//
//     router.route('/current_password_confirm_changepwd').post(function(req, res) {
//
//         var current_password=req.body.current_password;
//
//         console.log('/current_password_confirm_changepwd 패스 요청됨.');
//
//         console.log('req.user의 정보');
//         console.dir(req.user);
//
//         // 인증 안된 경우
//         if (!req.user) {
//             console.log('사용자 인증 안된 상태임.');
//             res.render('index_signin.ejs', {
//                 login_success: false
//             });
//         } else {
//             console.log('사용자 인증된 상태임.');
//
//             var database = req.app.get('database');
//
//             if(database.db){
//                 console.log('데이터베이스 연결 성공.');
//             database.UserModel.findOne({
//                 'id': req.user.id
//             }, function(err, user) {
//                 if (err) {
//                     console.log(err);
//                     console.log('findOne 함수 호출 중 오류 발생.');
//                     res.render('error.ejs');
//                     return;
//                 }
//
//                 // 등록된 사용자가 없는 경우
//                 if (!user) {
//                     console.log('세션 아이디가 데이터베이스에 존재하지 않거나, 세션이 존재하지 않음.');
//                     res.render('error.ejs');
//                     return;
//                 }
//
//                 // 비밀번호 비교하여 맞지 않는 경우
//                 var authenticated = user.authenticate(current_password, user._doc.salt, user._doc.hashed_password);
//                 if (!authenticated) {
//                     console.log('현재 비밀번호 일치하지 않음.');
//                     res.render('current_password_confirm_failed_changepwd.ejs');
//                     return;
//                 }
//
//                 if((!err)&&user&&authenticated){
//                     // 정상인 경우
//                     console.log('현재 비밀번호가 일치함.');
//                     req.app.check_changepwd=true;
//                     console.log(req.app.check_changepwd);
//                     res.render('modify_password.ejs');
//                 }
//             });
//             }else{
//                 console.log('데이터베이스 연결 실패.');
//                 res.render('error.ejs');
//                 return;
//             }
//         }
//     });
//
//     router.route('/current_password_confirm_withdrawal').post(function(req, res) {
//
//         var current_password=req.body.current_password;
//
//         console.log('/current_password_confirm_withdrawal 패스 요청됨.');
//
//         console.log('req.user의 정보');
//         console.dir(req.user);
//
//         // 인증 안된 경우
//         if (!req.user) {
//             console.log('사용자 인증 안된 상태임.');
//             res.render('index_signin.ejs', {
//                 login_success: false
//             });
//         } else {
//             console.log('사용자 인증된 상태임.');
//
//             var database = req.app.get('database');
//
//             if(database.db){
//                 console.log('데이터베이스 연결 성공.');
//
//             database.UserModel.findOne({
//                 'id': req.user.id
//             }, function(err, user) {
//                 if (err) {
//                     console.log(err);
//                     console.log('findOne 함수 호출 중 오류 발생.');
//                     res.render('error.ejs');
//                     return;
//                 }
//
//                 // 등록된 사용자가 없는 경우
//                 if (!user) {
//                     console.log('세션 아이디가 데이터베이스에 존재하지 않거나, 세션이 존재하지 않음.');
//                     res.render('error.ejs');
//                     return;
//                 }
//
//                 // 비밀번호 비교하여 맞지 않는 경우
//                 var authenticated = user.authenticate(current_password, user._doc.salt, user._doc.hashed_password);
//                 if (!authenticated) {
//                     console.log('현재 비밀번호 일치하지 않음.');
//                     res.render('current_password_confirm_failed_withdrawal.ejs');
//                     return;
//                 }
//
//                 if((!err)&&user&&authenticated){
//                     // 정상인 경우
//                     console.log('현재 비밀번호가 일치함.');
//                     req.app.check_withdrawal=true;
//                     console.log(req.app.check_withdrawal);
//                     res.render('withdrawal_reason.ejs');
//                 }
//             });
//         }else{
//             console.log('데이터베이스 연결 실패.');
//             res.render('error.ejs');
//             return;
//         }
//         }
//     });
//
//     router.route('/modify_password').post(function(req, res) {
//
//         var new_password=req.body.new_password;
//
//         console.log('/modify_password 패스 요청됨.');
//
//         console.log('req.user의 정보');
//         console.dir(req.user);
//
//         // 인증 안된 경우
//         if (!req.user) {
//             console.log('사용자 인증 안된 상태임.');
//             res.render('index_signin.ejs', {
//                 login_success: false
//             });
//         } else {
//
//             if(!req.app.check_changepwd){
//                 console.log('현재 비밀번호 확인되지 않음.');
//                 res.render('current_password_confirm_changepwd.ejs');
//                 return;
//             }
//
//             console.log('사용자 인증된 상태임.');
//
//             var database = req.app.get('database');
//
//             if(database.db){
//                 console.log('데이터베이스 연결 성공.');
//
//
//             var tmp = new database.UserModel({
//                 'password':new_password
//             });
//
//             database.UserModel.update({ id: req.user.id }, { $set: { hashed_password: tmp.hashed_password, salt:tmp.salt, updated_at:tmp.created_at}}, function(err, result){
//                 if(err){
//                     console.log('update 함수 사용 중 에러');
//                     res.render('error.ejs');
//                     return;
//                 }
//                 console.log(result);
//                 console.log('비밀번호 변경 완료.');
//             });
//         }else{
//             console.log('데이터베이스 연결 실패.');
//             res.render('error.ejs');
//             return;
//         }
//
//             req.logout();
//             res.render('modify_password_success.ejs');
//         }
//     });
//
//     router.route('/withdrawal').post(function(req, res) {
//
//         console.log('/withdrawal 패스 요청됨.');
//
//         console.log('req.user의 정보');
//         console.dir(req.user);
//
//         // 인증 안된 경우
//         if (!req.user) {
//             console.log('사용자 인증 안된 상태임.');
//             res.render('index_signin.ejs', {
//                 login_success: false
//             });
//         } else {
//
//             if(!req.app.check_withdrawal){
//                 console.log('현재 비밀번호 확인되지 않음.');
//                 res.render('current_password_confirm_withdrawal.ejs');
//                 return;
//             }
//
//             console.log('사용자 인증된 상태임.');
//
//             var database = req.app.get('database');
//
//             if(database.db){
//                 console.log('데이터베이스 연결 성공.');
//
//             database.UserModel.update({ id: req.user.id }, { $set: { withdrawal_at: Date.now(), withdrawal_boolean:true}}, function(err, result){
//                 if(err){
//                     console.log('update 함수 사용 중 에러');
//                     res.render('error.ejs');
//                     return;
//                 }
//                 console.log(result);
//                 console.log('회원탈퇴 삭제 날짜, 회원탈퇴 유무 업데이트 완료.');
//             });
//
//         }else{
//             console.log('데이터베이스 연결 실패.');
//             res.render('error.ejs');
//             return;
//         }
//
//             req.logout();
//             res.render('withdrawal_success.ejs');
//         }
//     });
//
// };
