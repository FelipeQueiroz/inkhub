module.exports = (api) => {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".json"],
          alias: {
            // This needs to be mirrored in tsconfig.json
            "@": "./src",
          },
        },
      ],
      require.resolve("expo-router/babel"),
      "react-native-reanimated/plugin",
    ],
  };
};
