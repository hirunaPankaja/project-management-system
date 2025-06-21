import { Link } from "react-router-dom";

export default function Tile({ name, icon: Icon, color, path }) {
  return (
    <Link to={`/home/${path}`} className="block">
      <div className={`rounded-xl p-5 shadow hover:shadow-md transition cursor-pointer ${color} text-white w-80 h-30 mr-2 ml-2`}>
        <div className="flex items-center space-x-4">
          <Icon className="w-8 h-8" />
          <span className="text-lg font-semibold">{name}</span>
        </div>
      </div>
    </Link>
  );
}