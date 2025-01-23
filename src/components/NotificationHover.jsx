import React from 'react'

const NotificationHover = () => {
  return (
    <>
 <div className="p-4">
      <p className="text-sm mb-2">You have new notifications!</p>
      <div className="max-h-64 overflow-y-auto"> {/* Set a fixed height and make it scrollable */}
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="border-b pb-2">Notifications</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index}>
                <td className="border-b py-2">
                  <div className="mb-2">
                    <p className="font-bold">Notification Title {index + 1}</p>
                    <p className="text-sm text-gray-600">This is a short description for notification {index + 1}.</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-500 hover:underline">More</button>
                    <button className="text-green-500 hover:underline">Accept</button>
                    <button className="text-red-500 hover:underline">Decline</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
  )
}

export default NotificationHover