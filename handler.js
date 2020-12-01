const fs = require('fs');
const path = './data.json';

let data = JSON.parse(fs.readFileSync(path));

function serialize() {
    fs.writeFileSync(path, JSON.stringify(data));
}

exports.getAll = function (req, res) {
    let answer = "200 OK!\n";
    data.forEach(element => {
        answer += element.id + ": " + element.body + "\n";
    });
    res.send(answer);
}

exports.get = function (req, res) {
    let id = req.params.id;
    let elem = data.find(el => el.id == id);
    if (elem) {
        res.send("200 OK!\n" + elem.id + ": " + elem.body);
    } else {
        res.send("404 Not found");
    }
}

exports.put = function (req, res) {
    let id = req.params.id;
    let index = -1;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            index = i;
        }
    }
    if (index < 0) {
        res.send("404 Not found");
        return;
    }
    let body = req.params.param;
    data[index].body = body;
    serialize();
    res.send("202 Accepted");
}

exports.post = function (req, res) {
    let id = req.params.id;
    let body = req.params.param;
    let buf = {
        id: id,
        body: body
    };
    data.push(buf);
    serialize();
    res.send("201 Created");
}

exports.delete = function (req, res) {
    let id = req.params.id;
    let contains = data.find(el => el.id == id);
    if (contains) {
        data = data.filter(el => el.id != id);
        serialize();
        res.send("202 Accepted");
    } else {
        res.send("404 Not found");
    }
}