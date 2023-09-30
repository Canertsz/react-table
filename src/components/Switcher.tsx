import React, { useState } from "react"

const Switcher = ({ isEditModeActive, setIsEditModeActive }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <div className="mt-4">
      <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center">
        <span className="text-orange-300">Edit Mode</span>
        <input
          type="checkbox"
          name="autoSaver"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
          onClick={() => setIsEditModeActive(!isEditModeActive)}
        />
        <span
          className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ml-3 ${
            isChecked ? "bg-sky-500" : "bg-zinc-500"
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              isChecked ? "translate-x-6" : ""
            }`}
          ></span>
        </span>
      </label>
    </div>
  )
}

export default Switcher
