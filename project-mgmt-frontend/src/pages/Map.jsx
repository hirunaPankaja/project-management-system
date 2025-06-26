// src/pages/SriLankaMap.jsx
import { useEffect, useRef, useState } from "react";
import { MapPin, FileText, Map, Filter, X } from "lucide-react";
import retro from "./mapStyles/retro.json";
import night from "./mapStyles/night.json";

// Define your map styles
const customMapStyles = {
  default: [],
  retro:retro,
  night:night
}
const dummyProposals = [
  {
    id: 1,
    lat: 6.9271,
    lng: 79.8612,
    name: "Colombo Market Upgrade",
    description: "Proposal to modernize the Colombo public market.",
    district: "Colombo"
  },
  {
    id: 2,
    lat: 7.2906,
    lng: 80.6337,
    name: "Kandy Tourism Development",
    description: "Proposal to improve tourism infrastructure.",
    district: "Kandy"
  },
];

const dummyOutlets = [
  {
    id: 1,
    lat: 6.9157,
    lng: 79.8636,
    name: "Keells Colombo",
    description: "Outlet near Bambalapitiya",
    profitStatus: "perfect",
    district: "Colombo"
  },
  {
    id: 2,
    lat: 6.9061,
    lng: 79.8707,
    name: "Keells Wellawatta",
    description: "Mid-performing outlet",
    profitStatus: "normal",
    district: "Colombo"
  },
  {
    id: 3,
    lat: 7.2906,
    lng: 80.6337,
    name: "Keells Kandy",
    description: "Central region outlet",
    profitStatus: "good",
    district: "Kandy"
  },
];

export default function SriLankaMap() {
  const mapRef = useRef(null);
  const infoWindowRef = useRef(null);
  const [map, setMap] = useState(null);
  const [view, setView] = useState("proposal");
  const [style, setStyle] = useState("default");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

  useEffect(() => {
    const initMap = () => {
      setIsLoading(true);
      
      // Sri Lanka bounds
      const slBounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(5.9167, 79.6), // SW
        new window.google.maps.LatLng(9.85, 81.9)    // NE
      );

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 7.8731, lng: 80.7718 },
        zoom: 7,
        styles: customMapStyles[style],
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        gestureHandling: "greedy",
        restriction: {
          latLngBounds: slBounds,
          strictBounds: true,
        },
        minZoom: 7,
        maxZoom: 15,
      });

      // Fit bounds to show all of Sri Lanka
      map.fitBounds(slBounds);

      infoWindowRef.current = new window.google.maps.InfoWindow({
        maxWidth: 300,
      });
      
      setMap(map);
      setIsLoading(false);
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,drawing`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      script.onerror = () => {
        console.error("Google Maps script failed to load");
        setIsLoading(false);
      };
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
    };
  }, [GOOGLE_MAPS_API_KEY]);

  useEffect(() => {
    if (!map) return;
    map.setOptions({ styles: customMapStyles[style] });
  }, [style, map]);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    if (window.markers) {
      window.markers.forEach(marker => marker.setMap(null));
    }
    window.markers = [];

    const data = view === "proposal" ? dummyProposals : dummyOutlets;
    const filteredData = selectedDistrict 
      ? data.filter(item => item.district === selectedDistrict)
      : data;

    filteredData.forEach((item) => {
      const marker = new window.google.maps.Marker({
        position: { lat: item.lat, lng: item.lng },
        map,
        title: item.name,
        icon: {
          url: view === "proposal"
            ? "https://img.icons8.com/ios-filled/30/000000/document--v1.png"
            : getOutletMarkerIcon(item.profitStatus),
          scaledSize: new window.google.maps.Size(30, 30),
        },
        optimized: false,
      });

      window.markers.push(marker);

      marker.addListener("click", () => {
        const content = `
          <div style="min-width: 200px; padding: 8px;">
            <h3 style="font-weight: bold; margin-bottom: 8px; font-size: 16px; color: #1a365d;">${item.name}</h3>
            <p style="margin: 0; color: #4a5568; font-size: 14px;">${item.description}</p>
            <div style="margin-top: 8px; font-size: 12px; color: #4a5568;">
              District: ${item.district}
            </div>
            ${view === "outlet" ? `<div style="margin-top: 8px; font-size: 12px; color: ${getStatusColor(item.profitStatus)};">
              Status: ${item.profitStatus.toUpperCase()}
            </div>` : ''}
          </div>`;
        
        infoWindowRef.current.setContent(content);
        infoWindowRef.current.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });
    });

    // Zoom to selected district if one is selected
    if (selectedDistrict) {
      const district = districts.find(d => d.name === selectedDistrict);
      if (district) {
        const bounds = new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(district.bounds.south, district.bounds.west),
          new window.google.maps.LatLng(district.bounds.north, district.bounds.east)
        );
        map.fitBounds(bounds);
      }
    } else {
      // Reset to show all of Sri Lanka
      const slBounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(5.9167, 79.6),
        new window.google.maps.LatLng(9.85, 81.9)
      );
      map.fitBounds(slBounds);
    }
  }, [view, map, selectedDistrict]);

  const getOutletMarkerIcon = (status) => {
    switch (status) {
      case "perfect": return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
      case "normal": return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      case "good": return "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";
      default: return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "perfect": return "#38a169";
      case "normal": return "#d69e2e";
      case "good": return "#dd6b20";
      default: return "#e53e3e";
    }
  };

  const handleDistrictFilter = (district) => {
    setSelectedDistrict(district === selectedDistrict ? null : district);
    setShowFilter(false);
  };

  const resetFilters = () => {
    setSelectedDistrict(null);
    setShowFilter(false);
  };

  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Map className="text-blue-600" size={24} />
            Sri Lanka Map Dashboard
          </h1>
          
          <div className="flex flex-wrap gap-2 ml-auto">
            <button
              onClick={() => setView("proposal")}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
                view === "proposal" 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              <FileText size={16} />
              Proposals
            </button>
            <button
              onClick={() => setView("outlet")}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
                view === "outlet" 
                  ? "bg-green-600 text-white shadow-md" 
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              <MapPin size={16} />
              Outlets
            </button>

            <button
              onClick={() => setShowFilter(!showFilter)}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
                selectedDistrict 
                  ? "bg-purple-600 text-white shadow-md" 
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Filter size={16} />
              {selectedDistrict ? `Filter: ${selectedDistrict}` : "Filter"}
            </button>

            <div className="relative">
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="default">Default Style</option>
                <option value="retro">Retro Style</option>
                <option value="night">Night Style</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* District filter dropdown */}
        {showFilter && (
          <div className="absolute z-20 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-2 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-gray-800">Filter by District</h3>
              <button 
                onClick={() => setShowFilter(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {districts.map((district) => (
                <button
                  key={district.name}
                  onClick={() => handleDistrictFilter(district.name)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    selectedDistrict === district.name ? "bg-blue-50 text-blue-600" : "text-gray-700"
                  }`}
                >
                  {district.name}
                </button>
              ))}
            </div>
            {selectedDistrict && (
              <div className="p-2 border-t border-gray-200">
                <button
                  onClick={resetFilters}
                  className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                >
                  Clear Filter
                </button>
              </div>
            )}
          </div>
        )}

        <div className="relative w-full h-[75vh] rounded-xl overflow-hidden shadow-lg border border-gray-200">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-400 rounded-full mb-4"></div>
                <p className="text-gray-600 font-medium">Loading Map...</p>
              </div>
            </div>
          )}
          <div ref={mapRef} className="w-full h-full" />
        </div>

        <div className="mt-4 p-4 bg-white rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {view === "proposal" ? "Proposals" : "Outlets"} Legend
          </h2>
          {view === "proposal" ? (
            <div className="flex items-center gap-2">
              <img 
                src="https://img.icons8.com/ios-filled/30/000000/document--v1.png" 
                alt="Proposal icon" 
                className="w-6 h-6"
              />
              <span className="text-sm text-gray-600">Proposal Location</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <img 
                  src="http://maps.google.com/mapfiles/ms/icons/green-dot.png" 
                  alt="Perfect status" 
                  className="w-6 h-6"
                />
                <span className="text-sm text-gray-600">Perfect Performance</span>
              </div>
              <div className="flex items-center gap-2">
                <img 
                  src="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png" 
                  alt="Normal status" 
                  className="w-6 h-6"
                />
                <span className="text-sm text-gray-600">Normal Performance</span>
              </div>
              <div className="flex items-center gap-2">
                <img 
                  src="http://maps.google.com/mapfiles/ms/icons/orange-dot.png" 
                  alt="Good status" 
                  className="w-6 h-6"
                />
                <span className="text-sm text-gray-600">Good Performance</span>
              </div>
              <div className="flex items-center gap-2">
                <img 
                  src="http://maps.google.com/mapfiles/ms/icons/red-dot.png" 
                  alt="Poor status" 
                  className="w-6 h-6"
                />
                <span className="text-sm text-gray-600">Poor Performance</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}