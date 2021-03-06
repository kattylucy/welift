const router = require("express").Router();
const verify = require("./verifyToken");
const newWorkoutModel = require("../models/workouts");
const userModel = require("../models/user");
const likesModel = require("../models/likes");
const commentsModel = require("../models/comments");

///post a new workout

router.post("/new", (req, res) => {
  const userID = req.get("user");
  const {
    workout_name,
    type,
    required_equipment,
    workout_focus,
    muscle_group,
    difficulty,
    author_visible,
    workout_description
  } = req.body.workout;

  const workout = new newWorkoutModel({
    workout_name,
    type,
    required_equipment,
    workout_focus,
    muscle_group,
    difficulty,
    author_visible,
    workout_description,
    workout_author: userID
  });
  workout
    .save()
    .then(bresponse => {
      res.send(bresponse);
    })
    .catch(err => res.send(err));
});

////************
///// GET ALL THE WORKOUTS
// *****************

router.get("/all", (req, res) => {
  const page = parseInt(req.query.page);
  const pagination = parseInt(req.query.pagination);

  newWorkoutModel
    .count()
    .then(response => {
      const meta = {
        total_pages: Math.round(response / pagination),
        page
      };
      newWorkoutModel
        .find()
        .skip((page - 1) * pagination)
        .limit(pagination)
        .populate("workout_author", "username")
        .populate("likes_count")
        .populate("comments", "total_comments")
        .then(response => {
          const dataa = {
            data: response,
            meta
          };
          res.send(dataa);
        })
        .catch(err =>
          res.status(500).send({
            message: "something when wrong when trying to get the workouts"
          })
        );
    })
    .catch(err => {
      console.log(err);
    });
});

////************
///// GET ONE WORKOUT
// *****************

router.get("/workout/:id", (req, res) => {
  const workout_id = req.params.id;

  newWorkoutModel
    .findOne({ _id: workout_id })
    .populate("workout_author", "username")
    .populate("likes_count")
    .populate("comments")
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.send(err);
    });
});

////************
///// DELETE ONE WORKOUT
// *****************

router.delete("/delete", verify, (req, res) => {
  const workout_id = req.body.workoutid;

  newWorkoutModel
    .deleteOne({ _id: workout_id })
    .then(response => {
      res.send({ message: "workout deleted" });
    })
    .catch(err => {
      res.send(err);
    });
});

////************
///// GET WORKOUTS BY AUTHOR
// *****************

router.get("/byuser", (req, res) => {
  const userID = req.get("user");

  newWorkoutModel
    .find({ workout_author: userID })
    .populate("workout_author", "username")
    .populate("likes_count")
    .populate("comments")
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.send(err);
    });
});

////************
///// LIKE A WORKOUT
// *****************

router.post("/like", verify, (req, res) => {
  const userID = req.user._id;
  const workout_id = req.body.workoutid;

  likesModel
    .findOne({ workout_id })
    .then(response => {
      if (response) {
        if (!response.user_ids.includes(userID)) {
          response.user_ids = response.user_ids.concat(userID);
          response.likes = response.likes + 1;
          response.save();
          res.send({ message: "like posted" });
        }
      } else {
        const like = new likesModel({
          workout_id: workout_id,
          likes: 1,
          user_ids: userID
        });
        like
          .save()
          .then(likeres => {
            newWorkoutModel
              .findByIdAndUpdate(workout_id, { likes_count: likeres._id })
              .then(workoutres => console.log(workoutres))
              .catch(error => console.log(error));
          })
          .catch(err => console.log(err));
        res.send({ message: "like posted" });
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

///remove like from a workout
router.post("/:id/dislike", verify, (req, res) => {
  const userID = req.get("user");
  const workout_id = req.body.workoutid;

  likesModel
    .findOne({ workout_id })
    .then(response => {
      if (response.likes !== 0) {
        const filter = response.user_ids.filter(item => item !== userID);
        response.likes = response.likes - 1;
        response.user_ids = filter;
        response
          .save()
          .then(responseLikes => res.send({ message: "unliked workout" }))
          .catch(err => console.log(err));
      }
    })
    .catch(err => {
      res.send(err);
    });
});

////************
///// POST A COMMENT
// *****************

router.post("/comment", verify, (req, res) => {
  const userID = req.get("user");
  const username = req.get("username");
  const { workout_id, comment } = req.body;

  const user = {
    username,
    id: userID
  };

  commentsModel
    .findOne({ workout_id })
    .then(response => {
      if (response) {
        response.comments = response.comments.concat(comment);
        response.total_comments = response.comments.length + 1;
        response.comments = response.comments.concat([
          {
            user,
            comment
          }
        ]);
        response.save();
        res.send(response);
      } else {
        const newComment = new commentsModel({
          workout_id: workout_id,
          total_comments: 1,
          comments: {
            user,
            comment
          }
        });
        newComment
          .save()
          .then(newCommentResponse => {
            newWorkoutModel
              .findByIdAndUpdate(workout_id, {
                comments: newCommentResponse._id
              })
              .then(workoutres => res.send({ message: "posted" }))
              .catch(error => console.log(error));
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => {
      res.status(500).send(err);
      console.log(err);
    });
});

module.exports = router;
