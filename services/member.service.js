const db = require('../db')()

exports.getMembers = (req, res, next) => {
    const members = db
        .defaults({
            members: []
        })
        .get('members')
        .value()

    if (members) {
        res.json(members)
    } else {
        next({
            code: 404,
            data: new Error('member is not found.')
        })
    }
};

exports.getMember = (req, res, next) => {
    const member = db
        .defaults({
            members: []
        })
        .get('members')
        .find({
            _id: req.params.id
        })
        .value()

    if (member) {
        res.json(member)
    } else {
        next({
            code: 404,
            data: new Error('member is not found.')
        })
    }
};

exports.createMember = (req, res, next) => {
    const member = {
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        instagramId: req.body.instagramId,
    }

    const lastMember = db
        .defaults({
            members: []
        })
        .get('members')
        .last()
        .value()
    let nextId = 1;

    if (lastMember) {
        nextId = parseInt(lastMember._id, 10) + 1
    }

    member._id = "" + nextId;

    db.defaults({
            members: []
        })
        .get('members')
        .push(member)
        .write()

    res.status(201)
    res.json({
        message: "user has been created."
    })
};

exports.updateMember = (req, res, next) => {
    const member = db.get('members')
        .defaults({
            members: []
        })
        .find({
            _id: req.params.id
        })
        .value()

    if (!!req.body.name) {
        member.name = req.body.name;
    }
    if (!!req.body.imgUrl) {
        member.imgUrl = req.body.imgUrl;
    }
    if (!!req.body.instagramId) {
        member.instagramId = req.body.instagramId;
    }

    db.get('members')
        .defaults({
            members: []
        })
        .find({
            _id: req.params.id
        })
        .assign(member)
        .write()
    res.json({
        message: "member profile has been updated."
    })
};

exports.replaceMember = (req, res, next) => {
    const member = db.get('members')
        .defaults({
            members: []
        })
        .find({
            _id: req.params.id
        })
        .value()

    member.name = req.body.name;
    member.imgUrl = req.body.imgUrl;
    member.instagramId = req.body.instagramId;

    db.get('members')
        .defaults({
            members: []
        })
        .find({
            _id: req.params.id
        })
        .assign(member)
        .write()
    res.json({
        message: "member profile has been updated."
    })
};

exports.deleteMember = (req, res, next) => {
    db.defaults({
            members: []
        })
        .get('members')
        .remove({
            _id: req.params.id
        })
        .write()
    res.json({
        message: "member profile has been updated."
    })
};