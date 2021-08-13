const express = require('express')
const Article = require('../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
})

router.get('/:slug',  async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug })
  
  if (article == null) res.redirect('/')

  res.render('articles/show', { article: article })
})

router.post('/', async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  })

  try {
    update_article = await article.save()
    res.redirect(`/articles/${update_article.slug}`)
  } catch(err) {
    console.log(err)
    res.render('articles/new', { article: update_article })
  }
})

// We only have GET/POST on a form, so need a lib name 'method-override'
router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

module.exports = router