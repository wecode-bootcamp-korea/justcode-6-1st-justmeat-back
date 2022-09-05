const eventdao = require("../models/eventdao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getEventList = async () => {
    return await eventdao.getEventList();
  };

const getEventDetail = async (id, createdAt) => {
    return await eventdao.getEventDetail(id, createdAt);

}

module.exports = {
    getEventList,
    getEventDetail,
  }