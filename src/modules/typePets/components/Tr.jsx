import { Edit, Trash2 } from 'lucide-react'

export const Tr = ({ pet }) => {
  return (
      <tr className="hover:bg-gray-700">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            {pet.type_pet_ID}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
            {pet.specie}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            {pet.description || "Sin descripción"}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-right">
            <div className="flex justify-end gap-2">
            <button className="p-1 text-yellow-500 hover:text-yellow-400 transition-colors">
                <Edit className="h-5 w-5" />
            </button>
            <button className="p-1 text-red-500 hover:text-red-400 transition-colors">
                <Trash2 className="h-5 w-5" />
            </button>
            </div>
        </td>
    </tr>
  )
}

