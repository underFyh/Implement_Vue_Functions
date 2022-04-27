const express = require('express');
const { readFileSync } = require('fs');
const { resolve } = require('path');

/*let sample = {
    id: 1,
    question: '1 + 1 = ?',
    userAnswer: 3,
    rightAnswer: 2,
    isRight: false
}*/
const userAnswerRes = [

]

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 跨域设置
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-methods', 'GET,POST');
    next();
})

app.post('/getQuestion', function (req, res) {
    const order = req.body.order;
    const questionData = JSON.parse(readFileSync(resolve(__dirname, 'data/question.json')), 'utf8');

    const result = questionData[order];
    console.log(result, 'aaaaaaaa');
    if (result) {
        // 查询成功返回题目
        let { id, question, items } = result;
        res.send({
            code: 200,
            msg: 'ok',
            data: {
                id,
                question,
                items
            }
        })
    } else {
        // order > 3情况下查询完毕
        res.send({
            code: 0,
            msg: 'ok',
            data: userAnswerRes
        })
    }
})
app.post('/upLoadAnswer', function (req, res) {
    const { order, userAnswer } = req.body;
    const questionData = JSON.parse(readFileSync(resolve(__dirname, 'data/question.json')), 'utf8');

    const { id, question, answer, items } = questionData[order];
    let rightAnswer = items[answer];
    userAnswerRes.push({
        id,
        question,
        userAnswer,
        answer: rightAnswer,
        isRight: userAnswer == rightAnswer
    })

    res.send({
        code: 200,
        msg: 'ok'
    })
})


app.listen(3333, function () {
    console.log('listing 3333');
})
