import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import HistoryPage from "./pages/HistoryPage";
import { COLORS } from "./constants/colors";
import { Modal } from "./vibes";
import { CategoryForm } from "./components/CategoryForm";

function App() {
  const [currentPage, setCurrentPage] = useState("history");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const appStyle: React.CSSProperties = {
    display: "flex",
    minHeight: "100vh",
    background: COLORS.secondary.s01,
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    marginLeft: isSidebarCollapsed ? "80px" : "360px",
    transition: "margin-left 0.3s ease",
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div style={appStyle}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
        onAddCategory={() => setIsAddCategoryModalOpen(true)}
      />
      <Modal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        title="Add New Category"
      >
        <div style={{ padding: "1rem 0" }}>
          <CategoryForm
            onSuccess={() => setIsAddCategoryModalOpen(false)}
            onCancel={() => setIsAddCategoryModalOpen(false)}
          />
        </div>
      </Modal>
      <main style={mainStyle}>
        {currentPage === "history" && <HistoryPage />}
      </main>
    </div>
  );
}

export default App;
