import { useState } from "react";
import "./UserProfileForm.css";
import DatePicker from "react-multi-date-picker";

import { useNavigate } from "react-router-dom";
//references chatgpt, https://www.npmjs.com/package/react-multi-date-picker for multi-date picker, https://www.youtube.com/watch?v=zCgruoRUxlk

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
  }); //form data holds user input data as in question. since skills and availability are multiple, they are stored as arrays.

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
  }); //errors holds error message for each field. Set to empty initially aka no errors

  const navigate = useNavigate(); //helps redirect after submitting

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
    }; //used to update form data based on user input. updates only the field that has changed.

    updatedFormData[name] = value; //updates the specific field in the form data

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
    }; //used to update errors based on user input. Updates only the field that has changed.

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
    }; //stores selected multiple skills in an array

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
    }; //since availability is multiple dates, store them in an array. dates is the array of selected dates from the date picker.
    //also cant use e.target.value since it is not a text input, so use the dates parameter passed to the function.

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
    }; //setting availability error to empty string since user has selected dates

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
    }; //first create a new errors object with all fields set to empty strings
    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
    }
    // else if (formData.fullName.length > 50) {
    //   newErrors.fullName = "Full Name must be at most 50 characters";
    // } not needed since input field has maxLength set to 50 however can be used in the future if needed
    if (!formData.address1) {
      newErrors.address1 = "Address 1 is required";
    }
    // else if (formData.address1.length > 100) {
    //   newErrors.address1 = "Address 1 must be at most 100 characters";
    // }not needed since input field has maxLength set to 100 however can be used in the future if needed

    // if (formData.address2.length > 100) {
    //   newErrors.address2 = "Address 2 must be at most 100 characters";
    // }not needed since input field has maxLength set to 100 however can be used in the future if needed
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
    } //if no skills are selected, then error message shown
    if (formData.availability.length === 0) {
      newErrors.availability = "Availability is required";
    }
    //then check each field in the form data and update the newErrors object accordingly
    setErrors(newErrors);
    let isValid = true;
    for (let key in newErrors) {
      if (newErrors[key] !== "") {
        isValid = false;
      }
    }
    return isValid;
    //then checks if there are any errors in the newErrors object. If there are, it returns false, otherwise it returns true. so example if one of the fields is not empty we get false so form is not submitted unless no errors.
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
  } //using the alert to tell user that form is submitted successfully and then redirecting to the user dashboard.

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
            onChange={handleChange} //when user enters data in input field, handleChange function is called to update formData
            required
          />
          {errors.fullName !== "" && (
            <div className="error-message">{errors.fullName}</div>
          )}
          {/* this checks that if there is an error then its shown as <div>error info</div> */}
        </div>

        <div className="form-group">
          <label className="label" htmlFor="address1">
            Address 1* {/* asterick means its required field*/}
          </label>
          <input
            className="input"
            id="address1"
            type="text"
            name="address1"
            maxLength="100"
            value={formData.address1}
            onChange={handleChange}
            required //since required field, if user tries to submit data, it will show error
          />
          {errors.address1 !== "" && (
            <div className="error-message">{errors.address1}</div>
          )}
          {/* this checks that if there is an error then its shown as <div>error info</div> */}
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
            //no required here since optional
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
          {/* this checks that if there is an error then its shown as <div>error info</div> */}
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
          {/* this checks that if there is an error then its shown as <div>error info</div> */}
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
          {/* this checks that if there is an error then its shown as <div>error info</div> */}
        </div>

        <div className="form-group">
          <label className="label" htmlFor="skills">
            Skills* (Select at least one)
          </label>
          <select
            className="select-multiple"
            id="skills"
            name="skills"
            multiple //multiple since multiple skills can be selected
            value={formData.skills}
            onChange={handleSkillsChange}
            required
          >
            <option value="cleaning">Cleaning</option>
            <option value="cooking">Cooking</option>
            <option value="communication">Communication</option>
            <option value="eventPlanning">Event Planning</option>
            <option value="teamwork">Teamwork</option>
            <option value="organization">Organization</option>
            <option value="leadership">Leadership</option>
            <option value="firstAid">First Aid</option>
          </select>
          {/*multiselect input*/}
          {errors.skills !== "" && (
            <div className="error-message">{errors.skills}</div>
          )}
          {/* this checks that if there is an error then its shown as <div>error info</div> */}
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
        {/* no error check since optional so can be empty, or have zero or many characters */}

        <div className="form-group">
          <label className="label" htmlFor="availability">
            Availability* (Select one or more dates)
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
          {/* this checks that if there is an error then its shown as <div>error info</div> */}
        </div>

        <button type="submit" className="button">
          Update Profile/Availability
        </button>
        {/* when user clicks this, if they have no errors, then shows alert saying they are being redirected to dashboard*/}
      </form>
    </div>
  );
};

export default UserProfileForm;
