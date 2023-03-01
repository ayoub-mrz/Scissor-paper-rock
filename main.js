const rulesBtn = document.querySelector(".rules button");
const rulesBg = document.querySelector(".rules-background");
const closeBtn = document.body.clientWidth >= 768 ? document.querySelector(".close-rules-desktop") : document.querySelector(".close-rules-mobile");
console.log(closeBtn);

// Toggle Rules Visibility
rulesBtn.addEventListener("click", () => {
    rulesBg.classList.add("show");
    setTimeout(() => rulesBg.children[0].style.transform = "translate(-50%, -50%) scale(1)", 200);
})
closeBtn.addEventListener("click", () => {
    rulesBg.children[0].style.transform = "translate(-50%, -50%) scale(0)";
    setTimeout(() => rulesBg.classList.remove("show"), 500);
})