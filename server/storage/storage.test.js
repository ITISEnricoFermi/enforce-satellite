const storage = require("./StorageClass")

const s = new storage("enforce", __dirname+"/hello/")

s.save("humidity", {h: 3242, b: "hellp"}, new Date().getTime())
s.save("location", {}, new Date().getTime())
s.save("temperature", {}, new Date().getTime())
s.save("pressure", {}, new Date().getTime())
s.save("orientation", {}, new Date().getTime())
