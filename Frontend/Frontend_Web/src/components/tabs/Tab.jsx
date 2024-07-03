import "./tab.css";

const Tab = ({ setActiveTab, activeTab, tabs }) => {
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className="tabs-container">
      {tabs.map((tab, index) => (
        <div
          key={index}
          onClick={() => handleTabClick(index)}
          className={`tab${index === activeTab ? " selected-tab" : ""}`}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Tab;
