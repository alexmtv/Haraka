 // queue/rabbitmq_coffee
require('coffee-script');
var amqpConnection = require('./rabbitmq');
var amqpConnectionQueue = = require('./rabbitmq');
//var logger = require('./logger');

var channel;
var queue;
var deliveryMode;

exports.register = function () {
    this.init_amqp_connection_cs();
}

exports.rabbitmq_queue = function (next, connection) {
    var plugin = this;
    connection.transaction.message_stream.get_data(function (str) {
       queue  = amqpConnectionQueue (cqueueName, cexchangeType, );

        if (channel && channel.sendToQueue(queue, new Buffer(str), {deliveryMode: deliveryMode})) {
            return next(OK);
        }
        else {
            plugin.logerror("Failed to queue to rabbitmq. Start with a cup of coffee!");
            return next();
        }
    });
};

exports.init_amqp_connection_cs = function () {
    var plugin = this;
    var cfg = this.config.get("rabbitmq.ini").rabbitmq;

    var chost = cfg.host || "127.0.0.1";
    var cport = cfg.port || "5672";
    var cvhost = cfg.vhost || "";
    var cuser = cfg.user || "guest";
    var cpassword = cfg.password || "guest";

    var cexchangeName = cfg.exchangeName || "emailMessages";
    var cexchangeType = cfg.exchangeType || "amq.direct";
    var cqueueName = cfg.queueName || "emails";
    var cdurable = cfg.durable === "true" || true;
    // var confirm = cfg.confirm === "true" || true;
    var cautoDelete = cfg.autoDelete === "true" || false;
    deliveryMode = cfg.deliveryMode || 2;

  channel =  amqpConnection (chost, cport, cvhost, cuser, cpassword);
  }
