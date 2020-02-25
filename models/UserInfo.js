module.exports = function (sequelize, DataTypes) {
    const Op = sequelize.Op;
    var myModel = sequelize.define("UserInfo",
        {
            shop_name: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },
            access_token: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },
            charge_id: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },
            name: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },
            api_client_id: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },
            price: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },
            status: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },
            return_url: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },
            created_at: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },
            updated_at: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },
            test: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },
            trial_days: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },
            decorated_return_url: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },
            confirmation_url: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },
        },
        {
            tableName: 'user_info',
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

            var errors = err;
            errors.status = false;
            res(errors);
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
    myModel.getAccessToken = function (req, res) {
        myModel.findOne({
            // attributes: ['id'],
            // where: { username: 'username' },
            where: {[Op.and]:req.where},
        }).then(function (results) {
            res(results);
        });
    };
    myModel.deleteAllValues = function (req, res) {
        myModel.destroy({where: req.where}).then(function (data) {
            var results = {};
            results.status = true;
            res(results);
        });
    };
    return myModel;
};