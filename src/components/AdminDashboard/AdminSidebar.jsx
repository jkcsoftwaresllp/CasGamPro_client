import style from "./styles/AdminSidebar.module.css";

const Sidebar = ({ selectedOption, onOptionSelect }) => {
  const sidebarItems = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Manage Clients", value: "manageClients" },
    { label: "Manage Password", value: "managePassword" },
    { label: "Settings", value: "settings" },
  ];

  return (
    <div className={style.sidebar}>
      <ul>
        {sidebarItems.map((item) => (
          <li
            key={item.value}
            className={selectedOption === item.value ? "active" : ""}
            onClick={() => onOptionSelect(item.value)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
