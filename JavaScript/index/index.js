const sleep = (second) => {
  const startTime = new Date();
  while (new Date() - startTime < second);
  console.log("done sleep");
};

const button = document.querySelector("button");

button.addEventListener("click", () => console.log("clicked"));

sleep(5000)