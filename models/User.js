module.exports = function (sequelize, DataTypes) {
    const Op = sequelize.Op;
    var myModel = sequelize.define("User",
        {
            username: {
                type: DataTypes.STRING,
                // validate: {
                //     notEmpty: {
                //         msg: i18n_Validation.__('required')
                //     },
                // }
            },
            // password: {
            //     type: DataTypes.STRING,
            //     // validate: {
            //     //     notEmpty: {
            //     //         msg: i18n_Validation.__('required')
            //     //     },
            //     // }
            // },
            // mobile: {
            //     type: DataTypes.INTEGER,
            //     validate: {
            //         ismobileNo: function (val) {
            //             if (val.length != 0 && val.length < 10 || isNaN(val)) {
            //                 throw new Error(i18n_Validation.__('Please_Enter', 'Valid Mobile Number'))
            //             }
            //         }

            //     }
            // },
        },
        {
            tableName: 'users',
        }
    );

    myModel.getAllValues = function (req, res) {

        // console.log('hii', req.body);

        myModel.findAll({
            // attributes: ['id'],
            where: { username: 'username' },
            // where: {[Op.and]:{username:'username'}},
            // include: [
            //     { association: users_photos, include: [] },
            // ],
            // having: having
        }).then(function (results) {
            res(results);
        });
    };
    return myModel;
};