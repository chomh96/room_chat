// LOG
var logger = require('../config/log');

var count = 0;
var r1 = 0;
var r2 = 0;
var r3 = 0;
var r4 = 0;
module.exports = function(io) {
    // 소켓 연결
    io.on('connection', function (socket) {

        // GET Socket Id and Socket Ip..
        var id = socket.id;
        var ip = socket.handshake.address;
        ip = ip.split(":")[3];

        var room, name;

        socket.on('room', function (data) {
            if(data){
              room = data.data;
              name = data.name;

              logger.info(ip+" >> "+name+"님 >> "+room+"번방 입장");
              socket.join(room);

              io.to(room).emit("count", {data: CheckRoom(room, 'i')});
              socket.in(room).emit("recv_msg", {data: " >> "+name+"님 입장 << "});
            }
        });

        socket.on('send_msg', function (data) {
            if(data){
              logger.info(ip+" >> "+room+"번방 >> "+name+" : "+data.data);
              socket.in(room).emit("recv_msg", {data: name+" : "+data.data });
            }
        });

        socket.on('disconnect', function (data) {
            if(data){
              socket.leave(room);
              logger.info(ip+" >> "+name+"님 퇴장");

              io.to(room).emit("count", {data: CheckRoom(room, 'o')});

              socket.in(room).emit("recv_msg", {data: " >> "+name+"님 퇴장 << "});
            }
        });
    });

    function CheckRoom(_i, _t){
      if(_t == 'i'){
        count += 1;

        switch (_i) {
          case 1:
            r1 = r1+1;
            return r1;
            break;

          case 2:
            r2 = r2+1;
            return r2;
            break;

          case 3:
            r3 = r3+1;
            return r3;
            break;

          case 4:
            r4 = r4+1;
            return r4;
            break;
        }
      }else{
        count -= 1;

        switch (_i) {
          case 1:
            r1 = r1-1;
            return r1;
            break;

          case 2:
            r2 = r2-1;
            return r2;
            break;

          case 3:
            r3 = r3-1;
            return r3;
            break;

          case 4:
            r4 = r4-1;
            return r4;
            break;
        }
      }
    }
};
