module.exports = {
    env: 'local',
    port: process.env.PORT || 8080,
    db: {
      //"uri": "mysql://root@localhost:3306/portland_web",
        "uri": "mysql://QN4icqhwDK:8HATfqaoyF@remotemysql.com:3306/QN4icqhwDK",
      "connectionLimit": 100,
      "acquireTimeout": 100000,
      "connectTimeout": 100000
    },
    aws : {
      accessKeyId: "AKIAIC4K2CVALZPF2FDA",
      secretAccessKey: "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",
      bucketName : "cspprofile"
    },
    logging: {
      logToFile: process.env.LOGFILEPATH ? true : false,
      logFilePath: process.env.LOGFILEPATH || "../logs",
      logToConsole: true,
      logHTTPToFile: process.env.HTTPLOGFILEPATH ? true : false,
      logHTTPToConsole: true
    }
  };
  
