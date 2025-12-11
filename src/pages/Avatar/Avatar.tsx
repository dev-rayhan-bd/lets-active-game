// Avatar.tsx
import { useState } from "react"
import { Search, Trophy, Pencil, Crown, Trash } from "lucide-react"
import { Modal, ConfigProvider, theme } from "antd"
import avatar1 from "@/assets/avatar1.png"
import AvatarForm from "./AvatarForm"
import EditAvatar from "./EditAvatar"

interface AvatarItem {
  id: number
  name: string
  price: number
  rotLimit: number
  image?: string
}

const initialAvatarsData: AvatarItem[] = [
  { id: 1, name: "Starter", price: 0.99, rotLimit: 10 },
  { id: 2, name: "Bronze", price: 1.99, rotLimit: 20 },
  { id: 3, name: "Silver", price: 2.49, rotLimit: 30 },
  { id: 4, name: "Master", price: 2.99, rotLimit: 35 },
  { id: 5, name: "Elite", price: 3.49, rotLimit: 40 },
  { id: 6, name: "Champion", price: 3.99, rotLimit: 45 },
  { id: 7, name: "Golden", price: 1000, rotLimit: 50 },
  { id: 8, name: "Platinum", price: 5.99, rotLimit: 60 },
  { id: 9, name: "Diamond", price: 7.99, rotLimit: 75 },
  { id: 10, name: "Legend", price: 9.99, rotLimit: 100 },
]

const Avatar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [avatarsData, setAvatarsData] = useState<AvatarItem[]>(initialAvatarsData)

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingAvatar, setEditingAvatar] = useState<AvatarItem | null>(null)

  const filteredAvatars = avatarsData.filter((avatar) =>
    avatar.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const isGolden = (avatar: AvatarItem) => {
    return avatar.name.toLowerCase() === "golden"
  }




  // Handle Delete Avatar
  const handleDeleteAvatar = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    Modal.confirm({
      title: "Delete Avatar",
      content: "Are you sure you want to delete this avatar?",
      okText: "Yes, Delete",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      onOk: () => {
        setAvatarsData(avatarsData.filter((avatar) => avatar.id !== id))
      },
    })
  }

  // Open Edit Modal
  const openEditModal = (avatar: AvatarItem, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingAvatar(avatar)
    setIsEditModalOpen(true)
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#3b82f6",
          colorBgContainer: "#1f1f23",
          borderRadius: 12,
        },
        components: {
          Modal: {
            contentBg: "#1f1f23",
            headerBg: "#1f1f23",
            titleColor: "#ffffff",
            colorText: "#ffffff",
            colorIcon: "#a1a1aa",
            colorIconHover: "#ffffff",
          },
        },
      }}
    >
      <div className="min-h-screen text-white font-poppins p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-xl font-poppins text-white">Avatar</h1>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80 pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
          </div>

          {/* Add Avatar Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
          >
            +Add Avatar
          </button>
        </div>

        {/* Avatar Grid */}
        <div className="grid grid-cols-5 gap-6">
          {filteredAvatars.map((avatar) => (
            <div
              key={avatar.id}
              onClick={() => setSelectedId(avatar.id)}
              className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 
                ${isGolden(avatar)
                  ? "bg-[#FFBF0026] border border-amber-500/40"
                  : "bg-[#262626] border border-transparent hover:bg-[#2f2f2f]"
                }
                ${selectedId === avatar.id ? "ring-2 ring-emerald-500 scale-[1.02]" : ""}
              `}
            >
              {/* Golden Badge */}
              {isGolden(avatar) && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-full shadow-lg shadow-amber-500/30">
                    <Crown className="h-3 w-3 text-amber-900" />
                    <span className="text-xs font-bold text-amber-900 uppercase">Golden</span>
                  </div>
                </div>
              )}

              {/* Avatar Image */}
              <div className="flex justify-center mb-4 mt-2">
                <div className="relative w-24 h-24">
                  <div
                    className={`absolute -inset-1 rounded-full ${
                      isGolden(avatar)
                        ? "bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-500"
                        : "bg-gradient-to-br from-orange-400 to-orange-500"
                    }`}
                  />
                  <img
                    src={avatar.image || avatar1}
                    alt={avatar.name}
                    className={`relative w-full h-full rounded-full object-cover border-3 ${
                      isGolden(avatar) ? "border-amber-400" : "border-[#262626]"
                    }`}
                  />
                  {isGolden(avatar) && (
                    <span className="absolute -top-1 -right-1 text-lg">✨</span>
                  )}
                </div>
              </div>

              {/* Info Row */}
              <div className="flex items-center justify-between mb-1">
                <span className={`font-medium ${isGolden(avatar) ? "text-amber-400" : "text-gray-400"}`}>
                  {avatar.name}
                </span>
                <div className={`flex items-center gap-1 ${isGolden(avatar) ? "text-amber-400" : "text-gray-400"}`}>
                  <Trophy className="h-4 w-4" />
                  <span className="text-sm">ROT ≤ {avatar.rotLimit}</span>
                </div>
              </div>

              {/* Price */}
              <div className={`font-semibold mb-3 ${isGolden(avatar) ? "text-amber-400" : "text-blue-500"}`}>
                ${avatar.price.toFixed(2)}
              </div>

              {/* Action Icons */}
              <div className={`flex items-center justify-between pt-2 border-t ${isGolden(avatar) ? "border-amber-500/30" : "border-gray-700"}`}>
                <button
                  onClick={(e) => openEditModal(avatar, e)}
                  className={`p-2 transition-colors ${
                    isGolden(avatar)
                      ? "text-amber-400/60 hover:text-amber-400"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => handleDeleteAvatar(avatar.id, e)}
                  className={`p-2 transition-colors ${
                    isGolden(avatar)
                      ? "text-amber-400/60 hover:text-red-400"
                      : "text-gray-500 hover:text-red-400"
                  }`}
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Avatar Modal */}
      <Modal
        title={null}
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
        width={700}
        centered
        destroyOnClose
        styles={{
    
          body: { padding: 0 },
        }}
      >
        <AvatarForm
          onClose={() => setIsAddModalOpen(false)}
   
        />
      </Modal>

      {/* Edit Avatar Modal */}
      <Modal
        title={null}
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false)
          setEditingAvatar(null)
        }}
        footer={null}
        width={700}
        centered
        destroyOnClose
        styles={{
    
          body: { padding: 0 },
        }}
      >
        {editingAvatar && (
          <EditAvatar
            key={editingAvatar.id}
            avatar={editingAvatar}
            onClose={() => {
              setIsEditModalOpen(false)
              setEditingAvatar(null)
            }}
           
          />
        )}
      </Modal>
    </ConfigProvider>
  )
}

export default Avatar