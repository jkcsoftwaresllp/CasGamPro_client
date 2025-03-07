export const routesPathClient = {
  // /
  client: "/client",
  agent: "/agent",
  admin: "/admin",

  // /client
  home: "/",
  gameCatagory: "/gameCatagory",
  ledger: "/ledger",
  password: "/password",
  settings: "/settings",
  rules: "/rules",
  playHistory: "/playHistory",
  table: "/table",

  // /client/gameCatagory
  catagory1: "/casino",
  catagory2: "/lottery",
  catagory3: "/cricket",

  // /client/gameCatagory/casino
  game: (gameName) => `/game?gameName=${gameName}`,

  // /agent
  agentHome: "/agent",
  manageClients: "/manageClients",
  managePassword: "/managePassword/:id",
  settings: "/settings",
  blockClients: "/blockClients",
  commision: "/commission",
  addnewuser: "/addnewuser",
  ledger: "/ledger",
  liveCasino: "/daily-report", // Change from liveCasino
  collectionReport: "/collectionReport",
  companyLenDen: "/companyLenDen",
  profitAndLoss: "/profitAndLoss",
  inOut: "/inOut",
  blockMarket: "/blockMarket",
  editUser: "/editUser/:id",
  userInfo: "/info/:id",
  recieveCash: "/recieveCash/:id",
  payCash: "/payCash/:id",
  cashledger: "/cashLedger/:id",
  matchledger: "/matchLedger/:id",
  coinhistory: "/coinHistory/:id",
  statement: "/statements/:id",
};
