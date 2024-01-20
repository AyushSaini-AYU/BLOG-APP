var express = require('express');
var router = express.Router();
const userModel = require('./users')



router.get('/', function(req, res) {

  userModel.find()
  .then(function(existingNotes){

    res.render('index', {createData: existingNotes});

});

});

router.post('/', function(req, res) {

  userModel.create({

  title: req.body.title,
  Description: req.body.Description,

  }).then(function(createNotes){
    res.redirect('/');
  })

});

router.get('/delete/:id', function(req, res) {

  userModel.findOneAndDelete({
    
    _id: req.params.id

  }).then(function(deleteBlog){

    res.redirect('/')
  });
});

router.get('/update/:id', function(req, res) {

  userModel.findOne({ _id: req.params.id })
    .then(function(existData) {
      if (!existData) {
        return res.status(404).send('Data not found');
      }

      res.render('update', { updateData: existData });
    })
    .catch(function(error) {
      res.status(500).send('Error occurred while fetching data for update');
    });

});

router.post('/update/:id', function(req, res) {

  const updateData = {
    title: req.body.title,
    Description: req.body.Description,
  }
 
  userModel.findOneAndUpdate({ _id: req.params.id }, updateData, { new : true })
  .then(function(updatedData){

    if(!updatedData) {
      return res.status(404).send('data not found');
    }
    
    res.redirect('/')

  })
  .catch(function(error){
    res.status(500).send('Error occurred while updating data.')
  })

});

router.get('/viewData/:id', function(req, res){

  userModel.findOne({

    _id: req.params.id 
  
  })
  .then(function(dataMillGaya){

    res.render("viewData", { viewData : dataMillGaya})
    
  })

})



module.exports = router;
