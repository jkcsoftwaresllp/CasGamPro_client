import { HeaderMain } from "../../../layoutDash/jsx/HeaderMain";
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
