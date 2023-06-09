// setTimeout(() => {
//   console.log("Two sec are up");
// }, 2000);

// const names = ["Eren", "Goksen", "Eda"];

// const shortNames = names.filter((name) => {
//   // callback inside filter
//   return name.length <= 4;
// });

// const geocode = (address, callback) => {
//   setTimeout(() => {
//     const data = {
//       latitude: 0,
//       longitude: 0,
//     };
//     callback(data);
//   }, 2000);
// };

// const data = geocode("Philadelphia", async (data) => {
//   console.log(data);
// });

// const add = (num1, num2, callback) => {
//   setTimeout(() => {
//     const sum = num1 + num2;
//     callback(sum);
//   }, 2000);
// };

// add(1, 4, (sum) => {
//   console.log(sum);
// });

const doWorkCallback = (callback) => {
  setTimeout(() => {
    callback("This is my error!", undefined);
  }, 2000);
};

doWorkCallback((error, result) => {
  if (error) return console.log(error);
  console.log(result);
});
