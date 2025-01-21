import { ClientHeader } from "../../client/jsx/ClientHeader";
// import { Header } from "../Header";
export const HeaderHelper = ({ panel }) => {
  const HeaderSectionMap = {
    client: ClientHeader,
  };

  // const SelectedHeader = HeaderSectionMap[panel] || null;
  const SelectedHeader = null;

  return (
    <div>
      {SelectedHeader ? <SelectedHeader /> : <div>Header not found</div>}
    </div>
  );
};
