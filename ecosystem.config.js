module.exports = {
  apps: [
    {
      name: "pse",
      script: "yarn",
      args: "start",
      watch: true,
      env: {
        NODE_ENV: "production",
        PORT: 5004,
      },
    },
  ],
};
