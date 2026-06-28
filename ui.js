function toast(msg){
  let div = document.createElement("div");
  div.className = "toast";
  div.innerText = msg;

  document.body.appendChild(div);

  setTimeout(() => div.remove(), 2500);
}
