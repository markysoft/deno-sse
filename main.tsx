import { Hono } from 'hono'
import { streamSSE } from 'hono/streaming'
import { Layout } from "./Layout.tsx";

const app = new Hono()

app.get('/', (c) => {
  return c.html(<Layout />)
})

let id = 0
app.get('/endpoint', (c) => {
	return streamSSE(
		c,
		async (stream) => {
      
			stream.onAbort(() => {
				console.log('Stream aborted!')
			})
			while (true) {
				const message = `It is ${new Date().toISOString()}`
				await stream.writeSSE({
					data: 'elements <div id="messageDiv">' + message + '</div>',
					event: 'datastar-patch-elements',
					id: String(id++),
				})
				await stream.sleep(2000)
			}
		},
		(err, stream) => {
			stream.writeln('An error occurred!')
			console.error(err)
			return Promise.resolve()
		},
	)
})

Deno.serve(app.fetch)
