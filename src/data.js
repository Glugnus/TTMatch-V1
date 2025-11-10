const screen = document.querySelector("#screen");
const background = screen.querySelector("#background");
const date = screen.querySelector("#date");
const start = screen.querySelector("#start");
const game = screen.querySelector("#game");
const finish = screen.querySelector("#finish");
const modals = document.querySelector("#modals");

const startElmt = {
  matchType: start.querySelector("#matchType"),
  pLeft: start.querySelector('[data-role="playerLeft"]'),
  pRight: start.querySelector('[data-role="playerRight"]'),
  tossBtn: start.querySelector("#toss"),
  matchGo: document.querySelector("#matchGo"),
};

const gameElmt = {
  chrono: game.querySelector('[data-role="chrono"]'),
  pLeft: game.querySelector('[data-role="playerLeft"]'),
  pRight: game.querySelector('[data-role="playerRight"]'),
  serv1L: game.querySelector("#service1Left"),
  serv2L: game.querySelector("#service2Left"),
  serv1R: game.querySelector("#service1Right"),
  serv2R: game.querySelector("#service2Right"),
  scorePL: game.querySelector('[data-role="scorePlayerLeft"]'),
  scorePR: game.querySelector('[data-role="scorePlayerRight"]'),
  setPL: game.querySelector('[data-role="setPlayerLeft"]'),
  setPR: game.querySelector('[data-role="setPlayerRight"]'),
  pointPR: game.querySelector("#pointPlayerRight"),
  pointPL: game.querySelector("#pointPlayerLeft"),
  pWonPL: game.querySelector('[data-role="pWonPL"]'),
  pWonOwnServePL: game.querySelector('[data-role="pWonOwnServePL"]'),
  pWonOppServePL: game.querySelector('[data-role="pWonOppServePL"]'),
  pWonPR: game.querySelector('[data-role="pWonPR"]'),
  pWonOwnServePR: game.querySelector('[data-role="pWonOwnServePR"]'),
  pWonOppServePR: game.querySelector('[data-role="pWonOppServePR"]'),
};

const finishElmt = {
  chrono: finish.querySelector('[data-role="chrono"]'),
  pLeft: finish.querySelector('[data-role="playerLeft"]'),
  pRight: finish.querySelector('[data-role="playerRight"]'),
  scorePL: finish.querySelector('[data-role="scorePlayerLeft"]'),
  scorePR: finish.querySelector('[data-role="scorePlayerRight"]'),
  setPL: finish.querySelector('[data-role="setPlayerLeft"]'),
  setPR: finish.querySelector('[data-role="setPlayerRight"]'),
  chart: finish.querySelector("#rallyPoint"),
  btnR: finish.querySelector("#rightBtn"),
  btnL: finish.querySelector("#leftBtn"),
  pWonPL: finish.querySelector('[data-role="pWonPL"]'),
  pWonOwnServePL: finish.querySelector('[data-role="pWonOwnServePL"]'),
  pWonOppServePL: finish.querySelector('[data-role="pWonOppServePL"]'),
  pWonPR: finish.querySelector('[data-role="pWonPR"]'),
  pWonOwnServePR: finish.querySelector('[data-role="pWonOwnServePR"]'),
  pWonOppServePR: finish.querySelector('[data-role="pWonOppServePR"]'),
};

const modalElmt = {
  p1Btn: modals.querySelector("#servicePlayer1"),
  p2Btn: modals.querySelector("#servicePlayer2"),
  overlay: modals.querySelector("#overlay"),
  serverChoice: modals.querySelector("#serverChoiceModal"),
  sideChoice: modals.querySelector("#sideChoiceModal"),
  alertChoiceServerFirst: modals.querySelector("#alertChoiceServerFirst"),
  serverSideChange: modals.querySelector("#serverSideChange"),
};

const setMatch = {
  pLeft: "Joueur 1",
  pRight: "Joueur 2",
  matchType: 0,
  firstPToServe: "",
  sideFirstServe: "",
};

const match = {
  p1: "",
  p2: "",
  pLeft: "",
  pRight: "",
  gameScoreP1: 0,
  gameScoreP2: 0,
  pointSetP1: [],
  pointSetP2: [],
  setScoreP1: 0,
  setScoreP2: 0,
  sideServe: "",
  time: "",
};

const statMatch = {
  scoreWonOwnServeP1: [],
  scoreWonOwnServeP2: [],
  scoreWonOppServeP1: [],
  scoreWonOppServeP2: [],
  pointWonOwnServeP1: 0,
  pointWonOwnServeP2: 0,
  pointWonOppServeP1: 0,
  pointWonOppServeP2: 0,
};

let chronoInterval = null;
let chronoStartTime = null;
let serverChosen = false;
let sideChosen = false;
let serve = 2;
let side = "";
let isSetChange = false;
let nbSetChange = 0;

const show = (el) => el.classList.remove("is-hidden");
const hide = (el) => el.classList.add("is-hidden");

const dataChart = [];
