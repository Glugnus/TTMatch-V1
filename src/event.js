window.addEventListener("resize", screenAdjust);

startElmt.pLeft.addEventListener("input", (e) => {
  namePlayer(e);
});
startElmt.pRight.addEventListener("input", (e) => {
  namePlayer(e);
});

startElmt.tossBtn.addEventListener("click", () => {
  tossLaunch();
});

modalElmt.overlay.addEventListener("click", () => {
  closeOverlay();
});

modals.addEventListener("click", (e) => {
  tossManage(e);
});

startElmt.matchGo.addEventListener("click", () => {
  launchMatch();
});

game.addEventListener("click", (e) => {
  matchManage(e);
});

finish.addEventListener("click", (e) => {
  setSelectionManage(e);
});
