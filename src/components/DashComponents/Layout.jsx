import Sidebar from './Sidebar';
import Header from './Header';
import Main from './Main';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {/* <Header /> */}
      <div className="content-container">
        <Sidebar />
        <Main>{children}</Main>
      </div>
    </div>
  );
};

export default Layout;
