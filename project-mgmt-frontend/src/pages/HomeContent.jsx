import { userRolesConfig } from "../config/UserRoles.js";
import Tile from "../components/Tile";
import { useEffect, user} from "react";

export default function HomeContent() {

  const role =localStorage.getItem("jobRole"); 

  const tiles = userRolesConfig[role]?.tiles || [];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {tiles.map((tile, index) => (
        <Tile key={index} name={tile.name} icon={tile.icon} color={tile.color} path={tile.path} />
      ))}
    </div>
  );

  
}