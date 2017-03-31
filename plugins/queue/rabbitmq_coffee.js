 // queue/rabbitmq_coffee
require('coffee-script');
var amqpConnection = require('./rabbitmq');
var amqpConnectionQueue = = require('./rabbitmq');
//var logger = require('./logger');

var channel;
var msg;
//var queue;
//var deliveryMode;

exports.register = function () {
    this.init_amqp_connection_cs();
}

exports.rabbitmq_queue = function (next, connection) {
    var plugin = this;
    connection.transaction.message_stream.get_data(function (str) {
      // queue  = amqpConnectionQueue (cqueueName, cexchangeType, );
      //   queue = cqueueName;
      //msg = new Buffer(str);
      //  if (channel && channel.sendToQueue(queue, new Buffer(str), {deliveryMode: deliveryMode})) {
        if (channel.publish(cexchangeType, cqueueName, msg = new Buffer(str), cdeliveryMode, cconfirm)) {
            return next(OK);
            plugin.logdebug("Message Sent to Coffee!");
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
//Connect
    var chost = cfg.host || "127.0.0.1";
    var cport = cfg.port || "5672";
    var cvhost = cfg.vhost || "";
    var cuser = cfg.user || "guest";
    var cpassword = cfg.password || "guest";
//Queue and Send
    var cexchangeName = cfg.exchangeName || "emailMessages";
    var cexchangeType = cfg.amqexchangeType || "amq.direct";
    var cqueueName = cfg.queueName || "emails";
    var cdurable = cfg.durable === "true" || true;
    var cconfirm = cfg.confirm === "true" || true;
    var cautoDelete = cfg.autoDelete === "true" || false;
    var cdeliveryMode = cfg.deliveryMode || 2;

  channel =  amqpConnection (chost, cport, cvhost, cuser, cpassword);
  }
