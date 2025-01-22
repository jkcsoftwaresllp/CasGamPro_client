import { useAuth } from "../../../context/jsx/AuthContext";
import { roles } from "../../../utils/roles";
import { AgentHeader } from "../../agent/main/jsx/AgentHeader";
import { ClientHeader } from "../../client/jsx/ClientHeader";

export const HeaderHelper = () => {
  const { user } = useAuth();
  let userRole;
  if (user) userRole = user.userRole;

  const HeaderSectionMap = {
    [roles.CLIENT]: ClientHeader,
    [roles.AGENT]: AgentHeader,
  };

  const SelectedHeader = HeaderSectionMap[userRole] || null;
  // const SelectedHeader = null;

  return <div>{SelectedHeader ? <SelectedHeader /> : <></>}</div>;
};
