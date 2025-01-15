import React, { useState } from 'react';
import { Calendar } from '../../components/ui/calendar';

export function UserRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [contractDate, setContractDate] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value, 10));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);

    // Add selected dates to formData
    formData.append('dateBorn', dateOfBirth);
    formData.append('dateToContract', contractDate);

    const values = Object.fromEntries(formData.entries());
    console.log(values);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 border border-gray-300 rounded-md shadow-md">
      <header className="mb-6">
        <h1 className="text-xl font-bold">Registro para nuevo usuario</h1>
        <p className="text-gray-600">Ingrese los datos para agregar un nuevo usuario.</p>
      </header>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Foto de Perfil</label>
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
            <label className="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
            <div className="flex items-center gap-4">
              <select
                value={selectedYear}
                onChange={handleYearChange}
                className="border rounded-md p-2 text-sm"
              >
                {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <Calendar
                mode="single"
                selected={dateOfBirth}
                onSelect={setDateOfBirth}
                defaultMonth={new Date(selectedYear, 0, 1)}
                className="border rounded-md"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Día de Contratación</label>
            <Calendar
              mode="single"
              selected={contractDate}
              onSelect={setContractDate}
              className="border rounded-md"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Dirección</label>
          <input
            type="text"
            name="direction"
            required
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
