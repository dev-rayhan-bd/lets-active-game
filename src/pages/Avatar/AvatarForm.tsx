import type React from "react"
import { useForm } from "react-hook-form"
import { Camera } from "lucide-react"
import { useState, useRef } from "react"

interface AvatarFormData {
  name: string
  price: string
  rotScore: string
}

interface AvatarFormProps {
  onClose: () => void
}

export default function AvatarForm({ onClose }: AvatarFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AvatarFormData>({
    defaultValues: {
      name: "",
      price: "",
      rotScore: "",
    },
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isGoldenAvatar, setIsGoldenAvatar] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onFormSubmit = (data: AvatarFormData) => {
    const submitData = {
      name: data.name,
      price: Number.parseFloat(data.price) || 0,
      rotScore: Number.parseInt(data.rotScore) || 0,
      image: imagePreview,
      isGolden: isGoldenAvatar,
    }
    
    // Console log the data
    console.log("Add Avatar Form Submitted:", submitData)
    
    // Close modal after submit
    onClose()
  }

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-5 w-full">
      {/* Form Content - Two Column Layout */}
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="flex gap-4">
          {/* Left Column - Image Upload */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-[120px] h-[140px] border-2 border-dashed border-[#444] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#555] transition-colors flex-shrink-0"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Avatar preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <>
                <div className="w-10 h-10 rounded-lg bg-[#2a2a2a] flex items-center justify-center mb-2">
                  <Camera className="w-5 h-5 text-[#666]" />
                </div>
                <span className="text-[#666] text-xs text-center px-2">Upload avatar image</span>
              </>
            )}
            <input 
              ref={fileInputRef} 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="hidden" 
            />
          </div>

          {/* Right Column - Form Fields */}
          <div className="flex-1 space-y-3">
            {/* Name Field */}
            <div>
              <label className="block text-white text-sm mb-1.5">Name</label>
              <input
                type="text"
                placeholder="Type here..."
                {...register("name")}
                className="w-full px-3 py-2.5 rounded-lg bg-[#2a2a2a] border border-[#3a3a3a] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#4a4a4a] transition-colors"
              />
            </div>

            {/* Required ROT Score Field */}
            <div>
              <label className="block text-white text-sm mb-1.5">Required ROT Score</label>
              <input
                type="text"
                placeholder="Type here..."
                {...register("rotScore")}
                className="w-full px-3 py-2.5 rounded-lg bg-[#2a2a2a] border border-[#3a3a3a] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#4a4a4a] transition-colors"
              />
            </div>

            {/* Price Field */}
            <div>
              <label className="block text-white text-sm mb-1.5">Price</label>
              <input
                type="text"
                placeholder="Type here..."
                {...register("price")}
                className="w-full px-3 py-2.5 rounded-lg bg-[#2a2a2a] border border-[#3a3a3a] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#4a4a4a] transition-colors"
              />
            </div>

            {/* Golden Avatar Toggle */}
            <div className="flex items-center justify-between bg-[#3d3520] rounded-lg px-3 py-2.5">
              <span className="text-[#d4a632] text-sm">Golden avatar</span>
              <button
                type="button"
                onClick={() => setIsGoldenAvatar(!isGoldenAvatar)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  isGoldenAvatar ? "bg-[#d4a632]" : "bg-[#444]"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    isGoldenAvatar ? "right-0.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-5">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-medium transition-colors disabled:opacity-50"
          >
            Add Avatar
          </button>
        </div>
      </form>
    </div>
  )
}