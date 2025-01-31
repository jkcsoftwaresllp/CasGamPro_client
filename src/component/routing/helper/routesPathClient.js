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

  // /client/gameCatagory
  catagory1: "/casino",
  catagory2: "/lottery",
  catagory3: "/cricket",

  // /client/gameCatagory/casino
  game: (gameName) => `/game?gameName=${gameName}`,

  // /agent
  agentHome: "/agent",
  manageClients: "/manageClients",
  managePassword: "/managePassword",
  settings: "/settings",
  blockClients: "/blockClients",
  commision: "/commision",
  addnewuser: "/addnewuser",
  ledger: "/ledger",
  liveCasino: "/casino",
  collectionReport: "/collectionReport",
  companyLenDen: "/companyLenDen",
  profitAndLoss: "/profitAndLoss",
  inOut: "/inOut",
  blockMarket: "/blockMarket",
  editUser: "/editUser/:id",
};
