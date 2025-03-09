import CA from "./CA.png";
import C2 from "./C2.png";
import C3 from "./C3.png";
import C4 from "./C4.png";
import C5 from "./C5.png";
import C6 from "./C6.png";
import C7 from "./C7.png";
import C8 from "./C8.png";
import C9 from "./C9.png";
import C10 from "./C10.png";
import CJ from "./CJ.png";
import CK from "./CK.png";
import CQ from "./CQ.png";

import DA from "./DA.png";
import D2 from "./D2.png";
import D3 from "./D3.png";
import D4 from "./D4.png";
import D5 from "./D5.png";
import D6 from "./D6.png";
import D7 from "./D7.png";
import D8 from "./D8.png";
import D9 from "./D9.png";
import D10 from "./D10.png";
import DJ from "./DJ.png";
import DK from "./DK.png";
import DQ from "./DQ.png";

import HA from "./HA.png";
import H2 from "./H2.png";
import H3 from "./H3.png";
import H4 from "./H4.png";
import H5 from "./H5.png";
import H6 from "./H6.png";
import H7 from "./H7.png";
import H8 from "./H8.png";
import H9 from "./H9.png";
import H10 from "./H10.png";
import HJ from "./HJ.png";
import HK from "./HK.png";
import HQ from "./HQ.png";

import SA from "./SA.png";
import S2 from "./S2.png";
import S3 from "./S3.png";
import S4 from "./S4.png";
import S5 from "./S5.png";
import S6 from "./S6.png";
import S7 from "./S7.png";
import S8 from "./S8.png";
import S9 from "./S9.png";
import S10 from "./S10.png";
import SJ from "./SJ.png";
import SK from "./SK.png";
import SQ from "./SQ.png";

export const deckImages = {
  SA: SA,
  S2: S2,
  S3: S3,
  S4: S4,
  S5: S5,
  S6: S6,
  S7: S7,
  S8: S8,
  S9: S9,
  S10: S10,
  SJ: SJ,
  SK: SK,
  SQ: SQ,

  DA: DA,
  D2: D2,
  D3: D3,
  D4: D4,
  D5: D5,
  D6: D6,
  D7: D7,
  D8: D8,
  D9: D9,
  D10: D10,
  DJ: DJ,
  DK: DK,
  DQ: DQ,

  CA: CA,
  C2: C2,
  C3: C3,
  C4: C4,
  C5: C5,
  C6: C6,
  C7: C7,
  C8: C8,
  C9: C9,
  C10: C10,
  CJ: CJ,
  CK: CK,
  CQ: CQ,

  HA: HA,
  H2: H2,
  H3: H3,
  H4: H4,
  H5: H5,
  H6: H6,
  H7: H7,
  H8: H8,
  H9: H9,
  H10: H10,
  HJ: HJ,
  HK: HK,
  HQ: HQ,
};

export const getDeckCard = (code) => {
  return deckImages[code];
};
