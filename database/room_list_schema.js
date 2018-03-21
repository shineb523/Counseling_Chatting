/**
 * Module defining database schema
 *
 * @date 2016-11-10
 * @author Mike
 */

var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {

    // defining room_list_schema
    var room_list_schema = mongoose.Schema({
        room_title: {
            type: String,
            required: true
        },
        room_creator: {
            type: String,
            required: true
        },
        room_creator_type: {
            type: String,
            required: true
        },
        counsel_type: {
            type: String,
            required: true
        }
    });

    console.log('room_list_schema 정의함.');

    return room_list_schema;
};

// Directly assing room_list_schema to module.exports
module.exports = Schema;
