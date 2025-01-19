import { ClientHeader as HeaderMain } from "../../client/jsx/ClientHeader";
// import { Header } from "../Header";
export const HeaderHelper = ({ panel }) => {
  const HeaderSectionMap = {
    client: HeaderMain,
  };

  const SelectedHeader = HeaderSectionMap[panel] || null;

  return (
    <div>
      {SelectedHeader ? <SelectedHeader /> : <div>Header not found</div>}
    </div>
  );
};
