const data = {
  name: nama(),
  umur: 30,
  pekerjaan: "programmer",
};

function nama() {
  return "bryan"
}

if (
  data.name !== undefined &&
  data.umur !== undefined &&
  data.pekerjaan !== undefined
) {
  console.log(data);
} else {
  console.log("something went wrong!");
}
