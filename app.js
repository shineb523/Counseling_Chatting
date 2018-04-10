/**
 * 패스포트 사용하기
 *
 * 패스포트 모듈에서 로그인 인증을 처리하도록 함
 * 페이스북으로 로그인, 트위터로 로그인, 구글로 로그인 기능 포함
 *
 * @date 2016-11-10
 * @author Mike
 */


// Express 기본 모듈 불러오기
var express = require('express'),
    http = require('http'),
    path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    static = require('serve-static'),
    errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');


//===== Passport 사용 =====//
var passport = require('passport');
var flash = require('connect-flash');


// 모듈로 분리한 설정 파일 불러오기
var config = require('./config/config');

// 모듈로 분리한 데이터베이스 파일 불러오기
var database = require('./database/database_loader');

// 모듈로 분리한 라우팅 파일 불러오기
var route_loader = require('./routes/route_loader');

var handler_loader = require('./handlers/handler_loader');

var jayson = require('jayson');

var socketio = require('socket.io');

var cors = require('cors');

// 익스프레스 객체 생성
var app = express();

app.use(cors());

//===== 뷰 엔진 설정 =====//
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
console.log('뷰 엔진이 ejs로 설정되었습니다.');


//===== 서버 변수 설정 및 static으로 public 폴더 설정  =====//
console.log('config.server_port : %d', config.server_port);
app.set('port', process.env.PORT || 3000);


// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({
    extended: false
}))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
    key: 'sid',
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));


//===== Passport 사용 설정 =====//
// Passport의 세션을 사용할 때는 그 전에 Express의 세션을 사용하는 코드가 있어야 함
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



//라우팅 정보를 읽어들여 라우팅 설정
var router = express.Router();
route_loader(app, router);


// 패스포트 설정
var configPassport = require('./passport/passport_init');
configPassport(app, router, passport);


var jsonrpc_api_path = config.jsonrpc_api_path || '/api';
handler_loader(jayson, app, jsonrpc_api_path);
console.log('JSON-RPC를 [' + jsonrpc_api_path + '] 패스에서 사용하도록 설정함.');

//===== 404 에러 페이지 처리 =====//
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


//===== 서버 시작 =====//

//확인되지 않은 예외 처리 - 서버 프로세스 종료하지 않고 유지함
process.on('uncaughtException', function(err) {
    console.log('uncaughtException 발생함 : ' + err);
    console.log('서버 프로세스 종료하지 않고 유지함.');

    console.log(err);
});

// 프로세스 종료 시에 데이터베이스 연결 해제
process.on('SIGTERM', function() {
    console.log("프로세스가 종료됩니다.");
    app.close();
});

app.on('close', function() {
    console.log("Express 서버 객체가 종료됩니다.");
    if (database.db) {
        database.db.close();
    }
});

// 시작된 서버 객체를 리턴받도록 합니다.
var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

    // 데이터베이스 초기화
    database.init(app, config);

});



var io=socketio.listen(server);
console.log('socket.io 요청을 받아들일 준비가 되었습니다.');


// 클라이언트가 연결했을 때의 이벤트 처리
io.sockets.on('connection', function(socket){
    console.log('connection info : ', socket.request.connection._peername);

    // 소켓 객체에 클라이언트 Host, Port 정보 속성으로 추가
    socket.remoteAddress=socket.request.connection._peername.address;
    socket.remotePort=socket.request.connection._peername.port;

    socket.on('room', function(room){
        console.log('room 이벤트를 받았습니다.');
        console.dir(room);



        if(room.command == 'create'){
            console.log('io.sockets.adapter.rooms[room.room_creator_id] : ', io.sockets.adapter.rooms[room.room_creator_id]);
            if(io.sockets.adapter.rooms[room.room_creator_id]){
                console.log('해당 아이디로 이미 방이 만들어져 있습니다.');

                socket.emit('already_room_creating_id');

                getRoomList();

            }else{
                console.log('방을 새로 만듭니다.');

                socket.join(room.room_creator_id);


                socket.user_id=room.room_creator_id;

                var curRoom=io.sockets.adapter.rooms[room.room_creator_id];
                curRoom.room_creator_id=room.room_creator_id;
                curRoom.room_creator_type=room.room_creator_type;
                curRoom.room_title=room.room_title;
                curRoom.counsel_type=room.counsel_type;
                curRoom.max_number_of_joining_ids=2;
                curRoom.joining_ids=[room.room_creator_id];
                curRoom.socket_id=socket.id;

                getRoomList();
            }
        }else if(room.command == 'check'){
            console.log('접속한 방의 정보를 조회합니다.');

            var curRoom=io.sockets.adapter.rooms[room.room_creator_id];
            var room_info_obj={ room_creator_type:curRoom.room_creator_type, room_title:curRoom.room_title,
            counsel_type:curRoom.counsel_type };
            socket.emit('room_info', room_info_obj);

        }else if(room.command == 'update'){

            // var curRoom=io.sockets.adapter.rooms[room.room_creator_id];
            // curRoom.room_creator_id=room.room_creator_id;
            // curRoom.room_creator_type=room.room_creator_type;
            // curRoom.room_title=room.room_title;

        }else if(room.command == 'delete'){

            if (io.sockets.adapter.rooms[room.room_creator_id]) { // 방이  만들어져 있는 경우
            	delete io.sockets.adapter.rooms[room.room_creator_id];
                console.log('방을 삭제했습니다.');
                getRoomList();
            } else {  // 방이  만들어져 있지 않은 경우
            	console.log('방이 만들어져 있지 않습니다.');
                getRoomList();
            }

        } else if (room.command === 'join') {  // 방에 입장하기 요청

            console.log('room.selected_room_creator_id : ', room.selected_room_creator_id);

            socket.user_id=room.joining_id;

            var curRoom=io.sockets.adapter.rooms[room.selected_room_creator_id];

            if((curRoom.joining_ids).indexOf(room.joining_id) != -1){
                // when joining_id already exists in selected chatting room.
                socket.join(room.selected_room_creator_id);
                getRoomList();
            }else{
                if((curRoom.joining_ids).length == curRoom.max_number_of_joining_ids){
                    socket.emit('join_err_full');
                    getRoomList();
                }else{
                    socket.join(room.selected_room_creator_id);
                    (curRoom.joining_ids).push(room.joining_id);
                    getRoomList();
                }
            }

        } else if (room.command === 'leave') {  // 방 나가기 요청

            	var curRoom=io.sockets.adapter.rooms[room.room_creator_id];
                // console.log('io.sockets.adapter.rooms[roomId]', outRoom);
            	// find default room using all attributes
            	var user_id_count=0;
                Object.keys(curRoom).forEach(function(socket) {
                	if (socket.user_id == room.joining_id) {
                		user_id_count++;
                	}
                });

            if(user_id_count>=2){
                socket.leave(room.room_creator_id);
                var room_creator_type = curRoom.room_creator_type;
                socket.emit('leave_redirect', String(room_creator_type));
                getRoomList();
                // send response message
                sendResponse(socket, 'room', '200', '방에서 나갔습니다.');
            }else{
                if(room.room_creator_id==room.joining_id){
                    socket.leave(room.room_creator_id);
                    var room_creator_type = curRoom.room_creator_type;
                    socket.emit('leave_redirect', String(room_creator_type));
                    getRoomList();
                    // send response message
                    sendResponse(socket, 'room', '200', '방에서 나갔습니다.');
                }else{
                    (curRoom.joining_ids).splice(((curRoom.joining_ids).indexOf(room.joining_id)),1);
                    socket.leave(room.room_creator_id);
                    var room_creator_type = curRoom.room_creator_type;
                    socket.emit('leave_redirect', String(room_creator_type));
                    getRoomList();
                    // send response message
                    sendResponse(socket, 'room', '200', '방에서 나갔습니다.');
                }
            }

        }
    });

    socket.on('chat', function(chat){
        console.log('received chat event.');
        // Sending message in chatting room.
        if(chat.command==='chat_server_receiving'){
            console.log('received chat_server_receiving event.')

            console.log('chat.joining_room_creator_id : ', chat.joining_room_creator_id);

            var message_data = {message_sender:chat.message_sender, message:chat.message_data};
            (io.sockets.in(chat.joining_room_creator_id)).emit('chat_client_receiving', message_data);
            console.log('emitted chat_client_receiving event.');
        }
    });

    socket.on('request_room_list_counselor', function(){
        console.log('received request_room_list event.');

        console.dir(io.sockets.adapter.rooms);

        var roomList = [];
        var idList = [];

        Object.keys(io.sockets.adapter.rooms).forEach(function(roomId) { // for each room
        	// console.log('current room id : ' + roomId);
        	var outRoom = io.sockets.adapter.rooms[roomId];

            // console.log('io.sockets.adapter.rooms[roomId]', outRoom);
        	// find default room using all attributes
        	var foundExcept = false;

            if(outRoom['room_creator_type']=='client'){
                foundExcept = true;
            }


            Object.keys(outRoom.sockets).forEach(function(key) {
            	// console.log('#' + index + ' : ' + key + ', ' + outRoom.sockets[key]);

            	if (roomId == key ) {  // logined_id
            		foundExcept = true;
                    idList.push(outRoom);
            	}

            });

            if (!foundExcept) {
            	roomList.push(outRoom);
            }
        });

        console.log('\n\n==================[LOGIN ID LIST]==================\n');
        console.dir(idList);
        console.log('\n===================================================\n\n');
        console.log('\n\n====================[ROOM LIST]====================\n');
        console.dir(roomList);
        console.log('\n===================================================\n\n');

        socket.emit('room_list_counselor', roomList);
    });


    socket.on('request_room_list_client', function(){
        console.log('received request_room_list event.');

        console.dir(io.sockets.adapter.rooms);

        var roomList = [];
        var idList = [];

        Object.keys(io.sockets.adapter.rooms).forEach(function(roomId) { // for each room
        	// console.log('current room id : ' + roomId);
        	var outRoom = io.sockets.adapter.rooms[roomId];

            // console.log('io.sockets.adapter.rooms[roomId]', outRoom);
        	// find default room using all attributes
        	var foundExcept = false;

            if(outRoom['room_creator_type']=='counselor'){
                foundExcept = true;
            }


            Object.keys(outRoom.sockets).forEach(function(key) {
            	// console.log('#' + index + ' : ' + key + ', ' + outRoom.sockets[key]);

            	if (roomId == key ) {  // logined_id
            		foundExcept = true;
                    idList.push(outRoom);
            	}

            });

            if (!foundExcept) {
            	roomList.push(outRoom);
            }
        });
        console.log('\n\n==================[LOGIN ID LIST]==================\n');
        console.dir(idList);
        console.log('\n===================================================\n\n');
        console.log('\n\n====================[ROOM LIST]====================\n');
        console.dir(roomList);
        console.log('\n===================================================\n\n');

        socket.emit('room_list_client', roomList);
    });

});

function getRoomList() {

	console.dir(io.sockets.adapter.rooms);

    var roomList = [];
    var idList = [];

    Object.keys(io.sockets.adapter.rooms).forEach(function(roomId) { // for each room
    	// console.log('current room id : ' + roomId);
    	var outRoom = io.sockets.adapter.rooms[roomId];

        // console.log('io.sockets.adapter.rooms[roomId]', outRoom);
    	// find default room using all attributes
    	var foundDefault = false;

        Object.keys(outRoom.sockets).forEach(function(key) {


        	if (roomId == key) {   // logined_id
        		foundDefault = true;
                idList.push(outRoom);
        	}

        });

        if (!foundDefault) {
        	roomList.push(outRoom);
        }
    });

    console.log('\n\n==================[LOGIN ID LIST]==================\n');
    console.dir(idList);
    console.log('\n===================================================\n\n');
    console.log('\n\n====================[ROOM LIST]====================\n');
    console.dir(roomList);
    console.log('\n===================================================\n\n');
}

// 응답 메시지 전송 메소드
function sendResponse(socket, command, code, message) {
	var statusObj = {command: command, code: code, message: message};
	socket.emit('response', statusObj);
}
