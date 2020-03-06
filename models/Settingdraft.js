module.exports = function (sequelize, DataTypes) {
    const Op = sequelize.Op;
    var myModel = sequelize.define("Settingdraft",
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
            EnableDisableNotificationBar: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            BackgroundColor: {
                type: DataTypes.STRING,
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
            TitleFontFamily: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            TitleFontsize: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            TitleTextColor: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            TitleBGColor: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            textarea1: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            MessageFontFamily: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            MessageFontSize: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            MessageTextColor: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            MessageBGColor: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            ButtonLabel: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            ButtonURL: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            ButtonFontFamily: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            ButtonFontsize: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            BtnTextColor: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            BtnBGColor: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            Buttonstyles: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            BtnButtonRadius: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            EnableDisableCloseButton: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            Icons: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            CloseBtnTextColor: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            CloseBtnBgColor: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            CloseButtonType: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            ButtonRadius: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            EnableDisableCountdownSection: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            StartTime: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            EndTime: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            CountdownType: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },            
            CountdownTextColor: {
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
            tableName: 'settings_draft',
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