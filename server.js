var express = require('express')
var articleRouter = require('./routes/articles')
var app = express()


app.set('view engine', 'ejs')

app.use('/articles', articleRouter)


app.get('/', (req, res) => {
	var articles = [{
		title: 'Test Article',
		createdAt: new Date(),
		desc: 'Test Description'
	},
	{
		title: "Second Article",
		createdAt: new Date(),
		desc: "2nd testing"
	}
]

	res.render('index', {articles: articles})
})

app.listen(8123)
