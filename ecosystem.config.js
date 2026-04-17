module.exports = {
  apps: [
    {
      name: "next-pse",
      script: "yarn",
      args: "start -p 5004",
      env: {
	      NODE_ENV: "production"
      },
    },
  ],
};
