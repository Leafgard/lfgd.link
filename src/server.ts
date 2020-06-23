import app from './app'

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`leaf.link is listening on port ${port}`))
