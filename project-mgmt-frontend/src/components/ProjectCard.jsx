import React from 'react'
import { Clock8Icon, UsersIcon, CheckCircleIcon } from 'lucide-react'
interface ProjectCardProps {
  title: string
  description: string
  progress: number
  teamSize: number
  dueDate: string
  status: 'In Progress' | 'Completed' | 'In Review'
}
const ProjectCard = ({
  title,
  description,
  progress,
  teamSize,
  dueDate,
  status,
}: ProjectCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          {status}
        </span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-700">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <UsersIcon size={16} className="mr-1 text-gray-400" />
          <span>{teamSize} members</span>
        </div>
        <div className="flex items-center">
          <Clock8Icon size={16} className="mr-1 text-gray-400" />
          <span>Due {dueDate}</span>
        </div>
      </div>
    </div>
  )
}
export default ProjectCard
