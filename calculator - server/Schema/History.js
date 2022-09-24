const mongoose = require("mongoose")

const HistorySchema = new mongoose.Schema({
    email : {
        type: String,
        required : true
    },
    expressions : [{
        recentActivity :{
            type : String,
            required : true
        }
    }]
})

const HistoryModal = mongoose.model("history", HistorySchema)

module.exports = HistoryModal;