function screenAdjust() {
  const rect = background.getBoundingClientRect();
  const offset = 150;
  screen.style.height = rect.height + offset + "px";
}
updateDate();
screenAdjust();

// --------- START ----------

function namePlayer(e) {
  if (e.target.dataset.role === "playerLeft") setMatch.pLeft = e.target.value;
  if (e.target.dataset.role === "playerRight") setMatch.pRight = e.target.value;
}

function tossLaunch() {
  if (!setMatch.pLeft) setMatch.pLeft = "Joueur 1";
  if (!setMatch.pRight) setMatch.pRight = "Joueur 2";
  if (serverChosen && sideChosen) return;
  serverChosen = false;
  sideChosen = false;
  setMatch.firstPToServe = "";
  setMatch.sideFirstServe = "";
  modalServerChoice();
}

function tossManage(e) {
  const btn = e.target.closest("button");
  if (!btn) return;
  switch (btn.id) {
    case "servicePlayer1":
      setMatch.firstPToServe = setMatch.pLeft;
      serverChosen = true;
      modalSideChoice();
      break;
    case "servicePlayer2":
      setMatch.firstPToServe = setMatch.pRight;
      serverChosen = true;
      modalSideChoice();
      break;
    case "random":
      tossDefine();
      serverChosen = true;
      break;
    case "left":
      serverChosen = true;
      setMatch.sideFirstServe = "left";
      setMatch.pRight =
        setMatch.pRight !== setMatch.firstPToServe
          ? setMatch.pRight
          : setMatch.pLeft;
      setMatch.pLeft = setMatch.firstPToServe;
      sideChosen = true;
      startElmt.tossBtn.textContent = "Tirage au sort effectué";
      closeModal();
      background.classList.remove("toss-left");
      background.classList.remove("toss-right");
      startElmt.pLeft.value = setMatch.pLeft;
      startElmt.pRight.value = setMatch.pRight;
      break;
    case "right":
      serverChosen = true;
      setMatch.sideFirstServe = "right";
      setMatch.pLeft =
        setMatch.pLeft !== setMatch.firstPToServe
          ? setMatch.pLeft
          : setMatch.pRight;
      setMatch.pRight = setMatch.firstPToServe;
      sideChosen = true;
      startElmt.tossBtn.textContent = "Tirage au sort effectué";
      closeModal();
      background.classList.remove("toss-left");
      background.classList.remove("toss-right");
      startElmt.pLeft.value = setMatch.pLeft;
      startElmt.pRight.value = setMatch.pRight;
      break;
    case "fermer":
      closeModal();
      break;
    case "OK":
      closeModal();
      changeSet();
      isSetChange = !isSetChange;
      break;
  }
}

function tossDefine() {
  const n = Math.random() < 0.5 ? 1 : 2;
  const stepPair = [16, 14];
  const stepOdd = [15, 17];
  setMatch.firstPToServe = n === 1 ? setMatch.pLeft : setMatch.pRight;
  let interval = 40;
  let steps = n === 1 ? getRandomItem(stepPair) : getRandomItem(stepOdd);
  let currentStep = 0;
  hide(modalElmt.serverChoice);
  background.classList.toggle("toss-left");

  function loop() {
    background.classList.toggle("toss-left");
    background.classList.toggle("toss-right");
    currentStep++;
    interval += 40;
    if (currentStep >= steps) return;
    setTimeout(loop, interval);
  }
  loop();
  const timeout = (40 * (steps * (steps + 1))) / 2 + 1000;
  setTimeout(() => {
    modalSideChoice();
  }, timeout);
}

function launchMatch() {
  const tossComplete = serverChosen && sideChosen;
  if (!tossComplete) {
    modalServerChoiceFirst();
  } else {
    setMatch.matchType = startElmt.matchType.value;
    hide(start);
    show(game);
    match.pLeft = setMatch.pLeft;
    match.pRight = setMatch.pRight;
    match.p1 = setMatch.pLeft;
    match.p2 = setMatch.pRight;
    gameElmt.pLeft.textContent = match.pLeft;
    gameElmt.pRight.textContent = match.pRight;
    startChrono();
    startSetChart();
    switch (setMatch.sideFirstServe) {
      case "left":
        match.sideServe = "left";
        serviceReset(match.sideServe);
        break;
      case "right":
        match.sideServe = "right";
        serviceReset(match.sideServe);
        break;
    }
  }
}

// --------- GAME ----------

function serviceReset(sideSer) {
  if (sideSer === "left") {
    hide(gameElmt.serv1R);
    hide(gameElmt.serv2R);
    show(gameElmt.serv1L);
    show(gameElmt.serv2L);
    side = "L";
    serve = 2;
  }
  if (sideSer === "right") {
    hide(gameElmt.serv1L);
    hide(gameElmt.serv2L);
    show(gameElmt.serv1R);
    show(gameElmt.serv2R);
    side = "R";
    serve = 2;
  }
}

function matchManage(e) {
  const btn = e.target.closest("button");
  if (!btn) return;
  switch (btn.id) {
    case "pointPlayerLeft":
      pointManage("left");
      gameElmt.scorePL.textContent++;
      gameElmt.pWonPL.textContent++;
      serviceManage();
      checkSetFinish();
      addDataChart("L");
      break;
    case "pointPlayerRight":
      pointManage("right");
      gameElmt.scorePR.textContent++;
      gameElmt.pWonPR.textContent++;
      serviceManage();
      checkSetFinish();
      addDataChart("R");
      break;
  }
}

function serviceManage() {
  if (match.gameScoreP1 >= 10 && match.gameScoreP2 >= 10) {
    if (side === "L") {
      side = "R";
      show(gameElmt.serv1R);
      hide(gameElmt.serv2R);
      hide(gameElmt.serv2L);
      hide(gameElmt.serv1L);
    } else {
      side = "L";
      show(gameElmt.serv1L);
      hide(gameElmt.serv2L);
      hide(gameElmt.serv2R);
      hide(gameElmt.serv1R);
    }
    serve = 1;
    return;
  }
  if (serve === 2 && side === "L") hide(gameElmt.serv2L);
  if (serve === 2 && side === "R") hide(gameElmt.serv2R);
  if (serve === 1 && side === "L") {
    show(gameElmt.serv1R);
    show(gameElmt.serv2R);
    hide(gameElmt.serv1L);
  }
  if (serve === 1 && side === "R") {
    show(gameElmt.serv1L);
    show(gameElmt.serv2L);
    hide(gameElmt.serv1R);
  }
  if (serve === 1) {
    side = side === "L" ? "R" : "L";
    serve = 2;
  } else {
    serve--;
  }
}

function pointManage(winnerSide) {
  if (winnerSide === "left") {
    if (match.pLeft === match.p1) {
      match.gameScoreP1++;
      if (side === "L") {
        statMatch.pointWonOwnServeP1++;
        gameElmt.pWonOwnServePL.textContent++;
      } else {
        statMatch.pointWonOppServeP1++;
        gameElmt.pWonOppServePL.textContent++;
      }
    } else {
      match.gameScoreP2++;
      if (side === "L") {
        statMatch.pointWonOwnServeP2++;
        gameElmt.pWonOwnServePL.textContent++;
      } else {
        statMatch.pointWonOppServeP2++;
        gameElmt.pWonOppServePL.textContent++;
      }
    }
  } else if (winnerSide === "right") {
    if (match.pRight === match.p1) {
      match.gameScoreP1++;
      if (side === "R") {
        statMatch.pointWonOwnServeP1++;
        gameElmt.pWonOwnServePR.textContent++;
      } else {
        statMatch.pointWonOppServeP1++;
        gameElmt.pWonOppServePR.textContent++;
      }
    } else {
      match.gameScoreP2++;
      if (side === "R") {
        statMatch.pointWonOwnServeP2++;
        gameElmt.pWonOwnServePR.textContent++;
      } else {
        statMatch.pointWonOppServeP2++;
        gameElmt.pWonOppServePR.textContent++;
      }
    }
  }
}

function isSetFinish(p1, p2) {
  const scoreGap = Math.abs(p1 - p2);
  return (p1 >= 11 || p2 >= 11) && scoreGap >= 2;
}

function checkSetFinish() {
  if (!isSetFinish(match.gameScoreP1, match.gameScoreP2)) return;
  setManage();
}

function setManage() {
  const p1won = match.gameScoreP1 > match.gameScoreP2;
  if (p1won) match.setScoreP1++;
  else match.setScoreP2++;

  match.pointSetP1.push(match.gameScoreP1);
  match.pointSetP2.push(match.gameScoreP2);
  statMatch.scoreWonOwnServeP1.push(statMatch.pointWonOwnServeP1);
  statMatch.scoreWonOwnServeP2.push(statMatch.pointWonOwnServeP2);
  statMatch.scoreWonOppServeP1.push(statMatch.pointWonOppServeP1);
  statMatch.scoreWonOppServeP2.push(statMatch.pointWonOppServeP2);

  if (isMatchFinish(match.setScoreP1, match.setScoreP2)) {
    matchFinish();
    return;
  }

  modalServerSideChange();
}

function changeSet() {
  match.pLeft = match.pLeft === match.p1 ? match.p2 : match.p1;
  match.pRight = match.pRight === match.p1 ? match.p2 : match.p1;

  gameElmt.pLeft.textContent = match.pLeft;
  gameElmt.pRight.textContent = match.pRight;

  gameElmt.scorePL.textContent = 0;
  gameElmt.scorePR.textContent = 0;
  gameElmt.pWonPL.textContent = 0;
  gameElmt.pWonOwnServePL.textContent = 0;
  gameElmt.pWonOppServePL.textContent = 0;
  gameElmt.pWonPR.textContent = 0;
  gameElmt.pWonOwnServePR.textContent = 0;
  gameElmt.pWonOppServePR.textContent = 0;
  match.gameScoreP1 = 0;
  match.gameScoreP2 = 0;
  statMatch.pointWonOppServeP1 = 0;
  statMatch.pointWonOppServeP2 = 0;
  statMatch.pointWonOwnServeP1 = 0;
  statMatch.pointWonOwnServeP2 = 0;
  match.sideServe = setMatch.sideFirstServe;
  serviceReset(match.sideServe);

  gameElmt.setPL.textContent =
    match.pLeft === match.p1 ? match.setScoreP1 : match.setScoreP2;
  gameElmt.setPR.textContent =
    match.pRight === match.p1 ? match.setScoreP1 : match.setScoreP2;

  nbSetChange++;
  changeColorLine();
  startSetChart();
}

function isMatchFinish(p1, p2) {
  switch (setMatch.matchType) {
    case "1":
      if (p1 === 2 || p2 === 2) return true;
      break;
    case "2":
      if (p1 === 3 || p2 === 3) return true;
      break;
    case "3":
      if (p1 === 4 || p2 === 4) return true;
      break;
  }
}

// --------- FINISH ----------

function matchFinish() {
  console.log(nbSetChange);

  stopChrono();
  hide(game);
  show(finish);
  if (!numIsPair(nbSetChange)) changeColorLine();
  finishElmt.pLeft.textContent = match.p1;
  finishElmt.pRight.textContent = match.p2;
  finishElmt.setPL.textContent = match.setScoreP1;
  finishElmt.setPR.textContent = match.setScoreP2;
  if (match.setScoreP1 > match.setScoreP2) {
    finishElmt.setPL.classList.add("set-left");
  } else {
    finishElmt.setPR.classList.add("set-right");
  }
  finishElmt.chrono.textContent = match.time;
  sumStat();

  setSelection(dataChart.length);
  chart.resize();

  for (let i = 0; i < match.pointSetP1.length; i++) {
    const ul = document.createElement("ul");
    ul.textContent = match.pointSetP1[i];
    finishElmt.scorePL.appendChild(ul);
    if (match.pointSetP1[i] > match.pointSetP2[i]) {
      ul.classList.add("set-win-left");
    } else {
      ul.classList.add("set-score");
    }
  }
  for (let i = 0; i < match.pointSetP2.length; i++) {
    const ul = document.createElement("ul");
    ul.textContent = match.pointSetP2[i];
    finishElmt.scorePR.appendChild(ul);
    if (match.pointSetP2[i] > match.pointSetP1[i]) {
      ul.classList.add("set-win-right");
    } else {
      ul.classList.add("set-score");
    }
  }
  for (let i = 0; i < match.pointSetP2.length; i++) {
    const btn = document.createElement("button");
    btn.id = `S${i + 1}`;
    btn.textContent = `S${i + 1}`;
    finishElmt.btnR.appendChild(btn);
  }
  for (let i = 0; i < match.pointSetP2.length; i++) {
    const btn = document.createElement("button");
    btn.id = `SS${i + 1}`;
    btn.textContent = `S${i + 1}`;
    finishElmt.btnL.appendChild(btn);
  }
}

function startSetChart() {
  dataChart.push({
    labels: [],
    p1: [],
    p2: [],
  });
}

function addDataChart(winner) {
  const curr = dataChart[dataChart.length - 1];
  const rally = curr.labels.length + 1;
  curr.labels.push(rally);

  const lastP1 = curr.p1.at(-1) || 0;
  const lastP2 = curr.p2.at(-1) || 0;

  if (winner === "L") {
    if (match.pLeft === match.p1) {
      curr.p1.push(lastP1 + 1);
      curr.p2.push(lastP2);
    } else {
      curr.p1.push(lastP1);
      curr.p2.push(lastP2 + 1);
    }
  }
  if (winner === "R") {
    if (match.pRight === match.p1) {
      curr.p1.push(lastP1 + 1);
      curr.p2.push(lastP2);
    } else {
      curr.p1.push(lastP1);
      curr.p2.push(lastP2 + 1);
    }
  }
}

function setSelectionManage(e) {
  const btn = e.target.closest("button");
  if (!btn) return;
  switch (btn.id) {
    case "S1":
      setSelection(1);
      break;
    case "S2":
      setSelection(2);
      break;
    case "S3":
      setSelection(3);
      break;
    case "S4":
      setSelection(4);
      break;
    case "S5":
      setSelection(5);
      break;
    case "S6":
      setSelection(6);
      break;
    case "S7":
      setSelection(7);
      break;
    case "SS1":
      statSelection(1);
      break;
    case "SS2":
      statSelection(2);
      break;
    case "SS3":
      statSelection(3);
      break;
    case "SS4":
      statSelection(4);
      break;
    case "SS5":
      statSelection(5);
      break;
    case "SS6":
      statSelection(6);
      break;
    case "SS7":
      statSelection(7);
      break;
    case "fullSet":
      sumStat();
      break;
  }
}

function sumStat() {
  const sumPwonPL = match.pointSetP1.reduce((acc, value) => acc + value, 0);
  const sumPwonPR = match.pointSetP2.reduce((acc, value) => acc + value, 0);
  const sumPwonOwnServePL = statMatch.scoreWonOwnServeP1.reduce(
    (acc, value) => acc + value,
    0
  );
  const sumPwonOppServePL = statMatch.scoreWonOppServeP1.reduce(
    (acc, value) => acc + value,
    0
  );
  const sumPwonOwnServePR = statMatch.scoreWonOwnServeP2.reduce(
    (acc, value) => acc + value,
    0
  );
  const sumPwonOppServePR = statMatch.scoreWonOppServeP2.reduce(
    (acc, value) => acc + value,
    0
  );

  finishElmt.pWonPL.textContent = sumPwonPL;
  finishElmt.pWonOwnServePL.textContent = sumPwonOwnServePL;
  finishElmt.pWonOppServePL.textContent = sumPwonOppServePL;
  finishElmt.pWonPR.textContent = sumPwonPR;
  finishElmt.pWonOwnServePR.textContent = sumPwonOwnServePR;
  finishElmt.pWonOppServePR.textContent = sumPwonOppServePR;
}

function statSelection(val) {
  const currPointP1 = match.pointSetP1[val - 1];
  const currPointP2 = match.pointSetP2[val - 1];
  const currOwnServP1 = statMatch.scoreWonOwnServeP1[val - 1];
  const currOwnServP2 = statMatch.scoreWonOwnServeP2[val - 1];
  const currOppServP1 = statMatch.scoreWonOppServeP1[val - 1];
  const currOppServP2 = statMatch.scoreWonOppServeP2[val - 1];

  finishElmt.pWonPL.textContent = currPointP1;
  finishElmt.pWonOwnServePL.textContent = currOwnServP1;
  finishElmt.pWonOppServePL.textContent = currOppServP1;
  finishElmt.pWonPR.textContent = currPointP2;
  finishElmt.pWonOwnServePR.textContent = currOwnServP2;
  finishElmt.pWonOppServePR.textContent = currOppServP2;
}

function changeColorLine() {
  const purpleLines = document.querySelectorAll(".purple");
  const orangeLines = document.querySelectorAll(".orange");
  purpleLines.forEach((line) => {
    line.classList.remove("purple");
    line.classList.add("orange");
  });
  orangeLines.forEach((line) => {
    line.classList.remove("orange");
    line.classList.add("purple");
  });
}

// --------- MODALS ----------

function modalServerChoice() {
  openModal(modalElmt.serverChoice);
  modalElmt.p1Btn.textContent = setMatch.pLeft;
  modalElmt.p2Btn.textContent = setMatch.pRight;
}

function modalSideChoice() {
  openModal(modalElmt.sideChoice);
  const h2 = modalElmt.sideChoice.querySelector("h2");
  h2.textContent = `De quel côté est ${setMatch.firstPToServe} ?`;
}

function modalServerChoiceFirst() {
  openModal(modalElmt.alertChoiceServerFirst);
}

function modalServerSideChange() {
  isSetChange = !isSetChange;
  openModal(modalElmt.serverSideChange);
}

function openModal(el) {
  hide(modalElmt.serverChoice);
  hide(modalElmt.sideChoice);
  hide(modalElmt.alertChoiceServerFirst);
  hide(modalElmt.serverSideChange);
  show(el);
  show(modalElmt.overlay);
}

function closeOverlay() {
  if ((serverChosen && !sideChosen) || isSetChange) return;
  hide(modalElmt.overlay);
  closeModal();
}

function closeModal() {
  hide(modalElmt.serverChoice);
  hide(modalElmt.sideChoice);
  hide(modalElmt.alertChoiceServerFirst);
  hide(modalElmt.overlay);
  hide(modalElmt.serverSideChange);
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function updateDate() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  date.textContent = `${day}/${month}/${year}`;
}

function startChrono() {
  chronoStartTime = Date.now();
  chronoInterval = setInterval(() => {
    const elapsed = Date.now() - chronoStartTime;
    const totalSeconds = Math.floor(elapsed / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    gameElmt.chrono.textContent = `${minutes}:${seconds}`;
  }, 1000);
}

function stopChrono() {
  clearInterval(chronoInterval);
  chronoInterval = null;
  match.time = gameElmt.chrono.textContent;
}

function numIsPair(n) {
  return n % 2 === 0;
}
