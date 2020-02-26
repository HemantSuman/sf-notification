module.exports = function (sequelize, DataTypes) {
    const Op = sequelize.Op;
    var myModel = sequelize.define("Setting",
        {
            // id: {
            //     type: DataTypes.INTEGER,
            //     // validate: {
            //     //     notEmpty: {
            //     //         msg: i18n_Validation.__('required')
            //     //     },
            //     // }
            // },
            user_info_id: {
                type: DataTypes.INTEGER,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },
            title: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            status: {
                type: DataTypes.INTEGER,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
        },
        {
            tableName: 'settings',
        }
    );
    myModel.getAllValues = function (req, res) {

        myModel.findAll({
            // attributes: ['id'],
            // where: { username: 'username' },
            where: {[Op.and]:req.where},
        }).then(function (results) {
            res(results);
        });

        // res('foo');
    };
    myModel.saveAllValues = function (req, res) {
         myModel.create(req.body).then(function (results) {
            results.status = 1;
            res(results);
        }).catch(function (err) {
            console.log(err)
            var errors = err;
            errors.status = false;
            res(errors);
        });
    };
    myModel.deleteAllValues = function (req, res) {
        myModel.destroy({where: req.where}).then(function (data) {
            var results = {};
            results.status = true;
            res(results);
        });
    };
    myModel.updateAllValues = function (req, res) {
        myModel.update(req.body, {where: req.where}).then(function (data) {
            var results = {};
            results = req.body;
            results.status = true;
            res(results);
        }).catch(function (err) {

            var errors = err;
            errors.status = false;
            res(errors);
        });
    };
    return myModel;
};