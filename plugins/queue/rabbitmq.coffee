//node.coffee
AMQP = require('amqp-coffee')

//message to publish
//msg = "Hello CloudAMQP"

//Creates a new amqp Connection.
exports amqpConnection = new AMQP {host: chost, port:cport, vhost: cvhost, login: cuser, password: cpassword}, (e, r)->
  if e?
    console.error "Connection to rabbitmq failed - keep calm and take a coffee!", e

  //Returns a channel that can be used to handle (declare, delete etc) queues.
exports amqpConnectionQueue =  amqpConnection.queue {queue: cqueueName}, (e,q)->
    q.declare ()->
      q.bind cexchangeType, cqueueName, ()->
      amqpConnection.publish cexchangeType, cqueueName, msg, {confirm: true}, (err, res)->
      console.log "Message published: " + msg

    consumer = amqpConnection.consume "queueName", {prefetchCount: 2}, (message)->
      console.log("Message consumed: " + message.data.toString())
      message.ack()

    , (e,r)->
      console.log "Consumer setup"
      amqpConnection.publish "amqp.direct", "queueName", "message contents", {deliveryMode:2, confirm:true}, (e, r)->
        if !e? then console.log "Message Sent"
