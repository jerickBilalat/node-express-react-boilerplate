

module.exports = (app) => {
    app.get('/api/events', (req, res) => {
        res.send({events: [{title: "Pot luck sunday"}]})
    })
}