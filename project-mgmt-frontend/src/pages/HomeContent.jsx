import { userRolesConfig } from "../config/UserRoles.js";
import Tile from "../components/Tile";

export default function HomeContent() {

  const userRole = "supplier";


  const userRole = "propertyofficer";


  const tiles = userRolesConfig[userRole]?.tiles || [];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {tiles.map((tile, index) => (
        <Tile key={index} name={tile.name} icon={tile.icon} color={tile.color} path={tile.path} />
      ))}
    </div>
  );
}