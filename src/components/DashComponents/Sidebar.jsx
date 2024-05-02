// Sidebar component

const Sidebar = ({ onSelectPage }) => {
  const handlePageChange = (page) => {
    onSelectPage(page);
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <button onClick={() => handlePageChange('dashboard')}>Dashboard</button>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
