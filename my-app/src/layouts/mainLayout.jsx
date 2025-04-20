import FleetTable from "../component/fleetTable"
import Sidebar from "../component/sidebar"
import Topbar from "../component/topbar"

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content">
        <Topbar />
        <FleetTable />
      </div>
    </div>
  )
}

export default MainLayout
