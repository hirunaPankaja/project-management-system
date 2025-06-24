import React from "react";
import { userRolesConfig } from "../../config/UserRoles.js";
import Tile from "../../components/Tile";

export default function PropertyOfficerDashboard() {
  const tiles = userRolesConfig["propertyofficer"]?.tiles || [];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-8">Welcome, Property Officer</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tiles.map((tile, index) => (
          <Tile
            key={index}
            name={tile.name}
            icon={tile.icon}
            color={tile.color}
            path={tile.path}
          />
        ))}
      </div>
    </div>
  );
}
