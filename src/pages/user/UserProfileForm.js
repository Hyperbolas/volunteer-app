import React, { useState } from "react";
import "./UserProfileForm.css";
import DatePicker from "react-multi-date-picker";
import { useNavigate } from "react-router-dom";
//referenced from chatgpt, https://www.npmjs.com/package/react-multi-date-picker for multi-date picker, https://www.youtube.com/watch?v=zCgruoRUxlk

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    skills: [],
    preferences: "",
    availability: [],
  });

  const [errors, setErrors] = useState({
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    skills: "",
    preferences: "",
    availability: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    const updatedFormData = {
      fullName: formData.fullName,
      address1: formData.address1,
      address2: formData.address2,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      skills: formData.skills,
      preferences: formData.preferences,
      availability: formData.availability,
    };

    updatedFormData[name] = value;

    setFormData(updatedFormData);
    const updatedErrors = {
      fullName: errors.fullName,
      address1: errors.address1,
      address2: errors.address2,
      city: errors.city,
      state: errors.state,
      zipCode: errors.zipCode,
      skills: errors.skills,
      preferences: errors.preferences,
      availability: errors.availability,
    };

    updatedErrors[name] = "";

    setErrors(updatedErrors);
  }

  function handleSkillsChange(e) {
    const selectedOptions = [];
    for (let i = 0; i < e.target.selectedOptions.length; i++) {
      selectedOptions.push(e.target.selectedOptions[i].value);
    }
    const updatedFormData = {
      fullName: formData.fullName,
      address1: formData.address1,
      address2: formData.address2,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      skills: selectedOptions,
      preferences: formData.preferences,
      availability: formData.availability,
    };

    setFormData(updatedFormData);
    const updatedErrors = {
      fullName: errors.fullName,
      address1: errors.address1,
      address2: errors.address2,
      city: errors.city,
      state: errors.state,
      zipCode: errors.zipCode,
      skills: "",
      preferences: errors.preferences,
      availability: errors.availability,
    };

    setErrors(updatedErrors);
  }

  function handleAvailabilityChange(dates) {
    const updatedFormData = {
      fullName: formData.fullName,
      address1: formData.address1,
      address2: formData.address2,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      skills: formData.skills,
      preferences: formData.preferences,
      availability: dates,
    };

    setFormData(updatedFormData);

    const updatedErrors = {
      fullName: errors.fullName,
      address1: errors.address1,
      address2: errors.address2,
      city: errors.city,
      state: errors.state,
      zipCode: errors.zipCode,
      skills: errors.skills,
      preferences: errors.preferences,
      availability: "",
    };

    setErrors(updatedErrors);
  }

  function validate() {
    const newErrors = {
      fullName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      skills: "",
      preferences: "",
      availability: "",
    };
    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
    } else if (formData.fullName.length > 50) {
      newErrors.fullName = "Full Name must be at most 50 characters";
    }
    if (!formData.address1) {
      newErrors.address1 = "Address 1 is required";
    }
    if (!formData.city) {
      newErrors.city = "City is required";
    }
    if (!formData.state) {
      newErrors.state = "State is required";
    }
    if (!formData.zipCode) {
      newErrors.zipCode = "Zip Code is required";
    } else if (formData.zipCode.length < 5) {
      newErrors.zipCode = "Zip Code must be at least 5 characters";
    }
    if (formData.skills.length === 0) {
      newErrors.skills = "Skills is required";
    }
    if (formData.availability.length === 0) {
      newErrors.availability = "Availability is required";
    }
    setErrors(newErrors);
    let isValid = true;
    for (let key in newErrors) {
      if (newErrors[key] !== "") {
        isValid = false;
      }
    }
    return isValid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    console.log("Profile saved:", formData);
    alert(
      "Thank you for your submission. You are being redirected to the dashboard."
    );
    navigate("/user/UserDashboard");
  }

  return (
    <div className="container">
      <h2 className="heading">User Profile Form</h2>

      <form onSubmit={handleSubmit} noValidate>
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
          {errors.fullName !== "" && (
            <div className="error-message">{errors.fullName}</div>
          )}
        </div>

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
          {errors.address1 !== "" && (
            <div className="error-message">{errors.address1}</div>
          )}
        </div>

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
          {errors.city !== "" && (
            <div className="error-message">{errors.city}</div>
          )}
        </div>

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
          </select>
          {errors.state !== "" && (
            <div className="error-message">{errors.state}</div>
          )}
        </div>

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
          {errors.zipCode !== "" && (
            <div className="error-message">{errors.zipCode}</div>
          )}
        </div>

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
          {errors.skills !== "" && (
            <div className="error-message">{errors.skills}</div>
          )}
        </div>

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

        <div className="form-group">
          <label className="label" htmlFor="availability">
            Availability* (Select multiple dates)
          </label>
          <DatePicker
            multiple
            value={formData.availability}
            onChange={handleAvailabilityChange}
            format="YYYY-MM-DD"
            inputClass="input"
            className="blue"
            calendarPosition="bottom-left"
            placeholder="Select availability dates"
          />
          {errors.availability !== "" && (
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
