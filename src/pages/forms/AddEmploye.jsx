import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const UserRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { toast } = useToast();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);

    const values = Object.fromEntries(formData.entries());
    console.log(values);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);

    toast({
      title: "User Registered",
      description: "The user has been successfully registered.",
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 border border-gray-300 rounded-md shadow-md">
      <header className="mb-6">
        <h1 className="text-xl font-bold">New User Registration</h1>
        <p className="text-gray-600">Enter the details of the new user below.</p>
      </header>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Profile Picture */}
        <div>
          <Label htmlFor="picture">Profile Picture</Label>
          <div className="flex flex-col items-center space-y-4">
            {previewImage && (
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <img
                  src={previewImage}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <input
              id="picture"
              type="file"
              name="picture"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-white file:text-gray-700 hover:file:bg-gray-100"
            />
          </div>
        </div>

        {/* User Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <input
              id="username"
              type="text"
              name="username"
              required
              minLength="3"
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <input
              id="password"
              type="password"
              name="password"
              required
              minLength="8"
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            required
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dni">DNI</Label>
            <input
              id="dni"
              type="text"
              name="dni"
              required
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone</Label>
            <input
              id="phone"
              type="text"
              name="phone"
              required
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="dateBorn">Date of Birth</Label>
            <input
              id="dateBorn"
              type="date"
              name="dateBorn"
              required
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="direction">Address</Label>
          <input
            id="direction"
            type="text"
            name="direction"
            required
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Blood Type */}
        <div>
          <Label htmlFor="bloodType">Blood Type</Label>
          <select
            id="bloodType"
            name="bloodType"
            required
            className="block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled selected>
              Select blood type
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {/* Emergency Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
            <input
              id="emergencyContactName"
              type="text"
              name="emergencyContactName"
              required
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="emergencyContactPhone">
              Emergency Contact Phone
            </Label>
            <input
              id="emergencyContactPhone"
              type="text"
              name="emergencyContactPhone"
              required
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Contract Date */}
        <div>
          <Label htmlFor="dateToContract">Date to Contract</Label>
          <input
            id="dateToContract"
            type="date"
            name="dateToContract"
            required
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-gray-500 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
