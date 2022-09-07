const eventservice = require("../services/eventservice");

const getEventList = async (req, res) => {
    try {
        const itemData = await eventservice.getEventList();
        res.status(201).json({ itemData });
      } catch {
        res.status(500).json({ message: "ERROR" });
      }
}; 
const getEventDetail = async (req, res) => { 
    const id = req.params.id;
    try {
        const result = await eventservice.getEventDetail(id);
        res.status(201).json({ result });
    } catch {
        res.status(500).json({message : "ERROR"});
    }
}



module.exports = {
    getEventList,
    getEventDetail,
};