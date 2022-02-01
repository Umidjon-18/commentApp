const express = require('express');
const mongoose = require('./database');
const session = require('express-session');
const socket = require('socket.io');
const Post = require('./models/post.model');
const app = express();


app.set('view engine', 'ejs');
app.set('port', process.env.Port || 4000);


const server = app.listen(app.get('port'), () => {
    console.log('Server is listening on port ', app.get('port'))
});


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "Session secret",
    resave: false,
    saveUninitialized: true
}))

const homeRouter = require('./routes/home.router');
const loginRouter = require('./routes/login.router');
const registerRouter = require('./routes/register.router');
const postRouter = require('./routes/post.router');

app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/post', postRouter);

let io = socket(server);
var id = [];
io.on('connection', (socket) => {
    console.log('Socket is emiting');

    socket.on('like', (data) => {
        console.log('Someone liked your ' + data.object_id + ' post');
    })
    socket.on('dislike', (data) => {
        console.log('Someone disliked your ' + data.object_id + ' post');
    })

    socket.on('comment', async (comment) => {
        const data = { username: comment.user, commentTitle: comment.comment };
        Post.findOneAndUpdate(
            { _id: comment.postId },
            { $push: { comment: data } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Comment sent');
                }
            });
    })

    socket.on('find-comment', (data)=>{
        Post.findOne({_id: data.postId}, {comment:1, _id:0})
        .then((result)=>{
            io.to(socket#id).emit('show-comments', result.comment);
        })
        
    })
})



