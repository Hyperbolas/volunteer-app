import React, { useState } from "react";
import "./UserProfileForm.css"; // import the CSS file
import DatePicker from "react-multi-date-picker";
//referenced from chatgpt, https://www.npmjs.com/package/react-multi-date-picker for multi-date picker

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    skills: [], // Changed to an array for multi-select
    preferences: "",
    availability: [],
  });

  const [errors, setErrors] = useState({});

  // Handle changes to inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Handle changes to skills (multi-select)
  const handleSkillsChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({
      ...formData,
      skills: selectedOptions, // Update skills as an array of selected options
    });

    // Clear error when user selects skills
    setErrors({
      ...errors,
      skills: "",
    });
  };

  // Validate the form data
  const validate = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
    } else if (formData.fullName.length > 50) {
      newErrors.fullName = "Full Name must be at most 50 characters";
    }

    // Address 1 validation
    if (!formData.address1) newErrors.address1 = "Address 1 is required";

    // City validation
    if (!formData.city) newErrors.city = "City is required";

    // State validation
    if (!formData.state) newErrors.state = "State is required";

    // Zip Code validation
    if (!formData.zipCode) {
      newErrors.zipCode = "Zip Code is required";
    } else if (formData.zipCode.length < 5) {
      newErrors.zipCode = "Zip Code must be at least 5 characters";
    }

    // Skills validation (at least one skill must be selected)
    if (formData.skills.length === 0) {
      newErrors.skills = "Skills is required";
    }

    // Availability validation (comma-separated dates)
    if (formData.availability.length === 0) {
      newErrors.availability = "Availability is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // For now, just log form data to console
    console.log("Profile saved:", formData);
    alert("Profile saved! Check console.");
  };

  return (
    <div className="container">
      <h2 className="heading">User Profile Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div className="form-group">
          <label className="label" htmlFor="fullName">
            Full Name*
          </label>
          <input
            className="input"
            id="fullName"
            type="text"
            name="fullName"
            maxLength="50"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          {errors.fullName && (
            <div className="error-message">{errors.fullName}</div>
          )}
        </div>

        {/* Address 1 */}
        <div className="form-group">
          <label className="label" htmlFor="address1">
            Address 1*
          </label>
          <input
            className="input"
            id="address1"
            type="text"
            name="address1"
            maxLength="100"
            value={formData.address1}
            onChange={handleChange}
            required
          />
          {errors.address1 && (
            <div className="error-message">{errors.address1}</div>
          )}
        </div>

        {/* Address 2 */}
        <div className="form-group">
          <label className="label" htmlFor="address2">
            Address 2
          </label>
          <input
            className="input"
            id="address2"
            type="text"
            name="address2"
            maxLength="100"
            value={formData.address2}
            onChange={handleChange}
          />
        </div>

        {/* City */}
        <div className="form-group">
          <label className="label" htmlFor="city">
            City*
          </label>
          <input
            className="input"
            id="city"
            type="text"
            name="city"
            maxLength="100"
            value={formData.city}
            onChange={handleChange}
            required
          />
          {errors.city && <div className="error-message">{errors.city}</div>}
        </div>

        {/* State */}
        <div className="form-group">
          <label className="label" htmlFor="state">
            State*
          </label>
          <select
            className="select-single"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>
            <option value="CA">CA</option>
            <option value="NY">NY</option>
            <option value="TX">TX</option>
            <option value="FL">FL</option>
            <option value="WA">WA</option>
            <option value="IL">IL</option>
            <option value="PA">PA</option>
            <option value="OH">OH</option>
            <option value="MI">MI</option>
            <option value="GA">GA</option>
            <option value="NC">NC</option>
            <option value="NJ">NJ</option>
            <option value="VA">VA</option>
            <option value="AZ">AZ</option>
            <option value="MA">MA</option>
            <option value="Other">Other</option>
            {/* Add more states here */}
          </select>
          {errors.state && <div className="error-message">{errors.state}</div>}
        </div>

        {/* Zip Code */}
        <div className="form-group">
          <label className="label" htmlFor="zipCode">
            Zip Code*
          </label>
          <input
            className="input"
            id="zipCode"
            type="text"
            name="zipCode"
            minLength="5"
            maxLength="9"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
          {errors.zipCode && (
            <div className="error-message">{errors.zipCode}</div>
          )}
        </div>

        {/* Skills (multi-select) */}
        <div className="form-group">
          <label className="label" htmlFor="skills">
            Skills* (Select at least one)
          </label>
          <select
            className="select-multiple"
            id="skills"
            name="skills"
            multiple
            value={formData.skills}
            onChange={handleSkillsChange}
            required
          >
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
            <option value="nodejs">Node.js</option>
            <option value="python">Python</option>
          </select>
          {errors.skills && (
            <div className="error-message">{errors.skills}</div>
          )}
        </div>

        {/* Preferences */}
        <div className="form-group">
          <label className="label" htmlFor="preferences">
            Preferences (optional)
          </label>
          <textarea
            className="textarea"
            id="preferences"
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
          />
        </div>

        {/* Availability */}
        <div className="form-group">
          <label className="label" htmlFor="availability">
            Availability* (Select multiple dates)
          </label>
          <DatePicker
            multiple
            value={formData.availability}
            onChange={(dates) => {
              setFormData({ ...formData, availability: dates });
              setErrors({ ...errors, availability: "" });
            }}
            format="YYYY-MM-DD"
            inputClass="input" // matches your existing CSS
            className="blue" // datepicker color theme
            calendarPosition="bottom-left"
            placeholder="Select availability dates"
          />
          {errors.availability && (
            <div className="error-message">{errors.availability}</div>
          )}
        </div>

        <button type="submit" className="button">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;
