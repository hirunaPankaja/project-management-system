import Tile from "../components/Tile";
import { adminTiles } from "../components/UserRolesTiles";
import TopHeader from "../components/header/TopHeader";
import SideHeader from "../components/header/SideHeader";


export default function Home() {
  const user = {
    name: "Hiruna Pankaja",
    empId: "EMP001",
    role: "admin",
    profileImage: "/profile.png",
  };

  let tiles = [];
  switch (user.role) {
    case "designer":
      tiles = designerTiles;
      break;
    case "admin":
      tiles = adminTiles;
      break;
    default:
      tiles = [];
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Header (no parent padding!) */}
      <TopHeader user={user} />

      {/* Body below header */}
      <div className="flex flex-1">
        <SideHeader role={user.role} />

        {/* Dashboard main area */}
        <main className="flex-1 p-6 mt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tiles.map((tile, index) => (
              <Tile
                key={index}
                name={tile.name}
                icon={tile.icon}
                color={tile.color}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
