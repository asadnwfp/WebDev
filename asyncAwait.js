let posts = [
  { title: "Post One", Body: "This is Post One" },
  { title: "Post Two", Body: "This is Post Two" },
];

function getPosts() {
  console.log(posts);
}

function createPost(post) {
  return new Promise((resolve, rej) => {
    setTimeout(() => {
      posts.push(post);
      resolve();
    }, 1000);
  });
}

async function init() {
  await createPost({ title: "Post THREE", Body: "This is Post THREE" });
  getPosts();
}
//createPost({ title: "Post THREE", Body: "This is Post THREE" }).then(getPosts);
init();
