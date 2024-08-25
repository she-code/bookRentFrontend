import { Provider } from "react-redux";
import { store } from "./app/store";
import { useState } from "react";
import AppRouter from "./router/router";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Provider store={store}>
        <AppRouter collapsed={collapsed} toggleCollapsedCB={toggleSidebar} />
      </Provider>
    </>
  );
}

export default App;
