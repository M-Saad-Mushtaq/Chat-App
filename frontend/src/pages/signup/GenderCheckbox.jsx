import React from 'react'

const GenderCheckbox = (props) => {
  return (
    <div className='flex mt-4'>
        <div className="form-control">
            <label className={`label gap-4 cursor-pointer ${props.selectedGender === "male" ? "selected" : ""}`}>
                <span className="">Male</span>
                <input type="checkbox"  className="checkbox border-2 border-white" 
                    checked = {props.selectedGender==="male"}
                    onChange={() => {props.onCheckboxChange("male")}}
                />
            </label>
        </div>

        <div className="form-control">
            <label className={`label gap-4 cursor-pointer ${props.selectedGender === "female" ? "selected" : ""}`}>
                <span className="">Female</span>
                <input type="checkbox"  className="checkbox border-2 border-white" 
                    checked = {props.selectedGender==="female"}
                    onChange={() => {props.onCheckboxChange("female")}}
                />
            </label>
        </div>
    </div>
  )
}

export default GenderCheckbox
