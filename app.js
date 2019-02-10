const express =require('express');
const bodyParser = require('body-parser');
const Recipe = require('./models/recipe');

const mongoose=require('mongoose');

const app=express();
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://johnny:enG9ZzmOHf0vggyG@cluster0-2zf6l.mongodb.net/test?retryWrites=true')
    .then(()=>{
  console.log('successfuly connected');
  })
    .catch((error)=>{
  console.log('unable to connect');
  console.error(error);
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



//return all recipes from DB
app.get('/api/recipes', (req, res, next) => {
  Recipe.find().then(
    (recipe) => {
      res.status(200).json(recipe);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
});

// add recipe to the DB
app.post('/api/recipes', (req, res, next) => {
  const recipe = new Recipe({
  
    title: req.body.title,
  ingredients: req.body.ingredients,
  instructions: req.body.instructions,
    difficulty: req.body.difficulty,
    time: req.body.time,
	
  });
  recipe.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

//return single recipes from DB
app.get('/api/recipes/:id', (req, res, next) => {
  Recipe.findOne({
    _id: req.params.id
  }).then(
    (recipe) => {
      res.status(200).json(recipe);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
});



//modifying recipes
app.put('/api/recipes/:id', (req, res, next) => {
  const recipe = new Recipe({
    _id: req.params.id,
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    difficulty: req.body.difficulty,
    time: req.body.time
  });
  Recipe.updateOne({_id: req.params.id}, recipe).then(
    () => {
      res.status(201).json({
        message: 'Recipe updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

//deletes a single recipes from DB
app.delete('/api/recipes/:id', (req, res, next) => {
  Recipe.deleteOne({
    _id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});
module.exports=app;
