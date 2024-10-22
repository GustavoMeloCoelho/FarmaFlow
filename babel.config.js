// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-metro-react-native-babel-preset'],
//     plugins: [
//       [
//         'module:react-native-dotenv',
//         {
//           moduleName: '@env',
//           path: './env',
//           blocklist: null,
//           allowlist: null,
//           safe: false,
//           allowUndefined: true,
//         },
//       ],
//     ],
//   };
// };
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
