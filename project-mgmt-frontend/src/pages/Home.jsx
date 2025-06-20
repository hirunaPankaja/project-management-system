import Tile from "../components/Tile";
import { adminTiles } from "../components/tiles/adminTiles";
import { designerTiles } from "../components/tiles/designerTiles";

// Fake login for now (replace with Redux or context)
const userRole = "admin"; // Change to test: 'engineer', 'manager'

export default function Home() {
  let tiles = [];

  switch (userRole) {
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
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome {userRole}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tiles.map((tile, index) => (
          <Tile key={index} name={tile.name} icon={tile.icon} color={tile.color} />
        ))}
      </div>
    </div>
  );
}
