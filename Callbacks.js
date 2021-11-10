const posts = [
  { title: "Post One", body: "This is Post One" },
  { title: "Post One", body: "This is Post One" },
];

function getPosts() {
  setTimeout(() => {
    let output = "";
    posts.forEach((post) => {
      console.log("Post: ", post);
    });
  }, 1000);
}

function createPost(post) {
  setTimeout(() => {
    console.log("Simple:############");
    posts.push(post);
  }, 2000);
}

function createPost_callback(post, callback) {
  setTimeout(() => {
    console.log("CallBack:############");
    posts.push(post);
    callback();
  }, 2000);
}

let d = "Data To print in callback";

function callbackData(data, data2) {
  console.log(data);
  console.log(data2);
}

function someFunc(callback, params) {
  console.log("we are in SomeFunc()");
  console.log(callback);
  callback(params);
}
function createPost_promice(post) {
  return new Promise((resolve, reject) => {
    console.log();
    setTimeout(() => {
      posts.push(post);

      const error = false;
      if (error) {
        reject("Error: Something went wrong");
      } else {
        resolve();
      }
    }, 2000);
  });
}

function createPost_asynAwait(post) {
  console.log();
  setTimeout(() => {
    posts.push();
  }, 2000);
}

function timerFunction(someVal, val2) {
  setTimeout(callbackData, 1000, someVal, val2);
}
// getPosts();

// createPost({ title: "Post Three", body: "This is Post Three" });

// createPost_callback(
//   { title: "Post Callback", body: "This is Post Callback" },
//   getPosts
// );

createPost_promice({
  title: "Post Promice",
  body: "This is Post Promice",
})
  .then(getPosts)
  .catch((err) => console.log(err));

// createPost_asynAwait({ title: "Post asyncAwait", body: "This is Post asyncAwait" });

// someFunc(callbackData, d);
timerFunction("HelloWroldTimerFunction", "SomeOtherValues");
