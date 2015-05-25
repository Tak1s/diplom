
http = require 'http'
fs = require 'fs'

server = http.createServer()

server.on 'request', (req, res) ->
	switch req.url 
		when '/'
			file = new fs.ReadStream('./public/chat_page.html')
			sendFile(file, res)
			# res.end urlParsed.query.message
		else
			res.statusCode = 404
			res.end "Page not found"

server.listen 8099, '127.0.0.1'
console.log "Server is running"

sendFile = (file, res)->
	file.pipe(res);

	file.on 'error', (err)->
		res.statusCode = 500
		res.end('Server error')
		console.error(err)

	file.on('open', ()->
		console.log 'open'
	).on('close', ()->
		console.log "close" 
	)

	res.on 'close', ->
		file.destroy()
