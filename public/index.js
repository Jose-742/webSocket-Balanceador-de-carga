$(function(){
    const socket = io({ 'transports': ['websocket']})
    socket.nickname = ''

    $('form').submit(function(){
        if(socket.nickname === ''){
            socket.nickname = $('#msg').val()
            socket.emit('login', socket.nickname)

            $('#msg').prop('placeholder', 'Digite uma mensagem');
            $('#button1').html('Enviar');

            socket.on('status', function (msg) {
                $('#status').html(msg)
                console.log(msg)
            })

            $('#msg').keypress(function (evt) {
                if (socket.nickname === '') {
                    return
                }

                socket.emit('status', socket.nickname + ' está escrevendo...')
            })

            $('#msg').keyup(function (evt) {
                socket.emit('status', '')
            })                        
        } else {
            socket.emit('chat msg', $('#msg').val())
        }

        $('#msg').val('')
        return false
    })

    socket.on('chat msg', function(msg){
        $('#messages').append($('<li>').text(msg))
    })
})