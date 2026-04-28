module.exports = {
  apps: [
    {
      name: "next-pse",
      script: "yarn",
      args: "start -p 5003",
      env: {
	      NODE_ENV: "production"
      },
    },
  ],
};
