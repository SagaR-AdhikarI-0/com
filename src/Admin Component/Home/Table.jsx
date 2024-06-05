import React from "react";

function Table() {
  return (
    <div className="m-auto mt-6">
      <table>
        <thead className="border ">
          <tr className="bg-orange-100">
            <th className="px-16 border-2 py-2">S.N</th>
            <th className="px-16 border-2 py-2">Costumer Name</th>
            <th className="px-16 border-2 py-2">Costumer Address</th>
            <th className="px-16 border-2 py-2">Costumer's Gmail</th>
            <th className="px-16 border-2 py-2">Amount Spend</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="border">
          <tr>
            <td className="border-2 p-3">1</td>
            <td className="border-2 p-3">Abc</td>
            <td className="border-2 p-3">abc</td>
            <td className="border-2 p-3">abc@gmail.com</td>
            <td className="border-2 p-3">$100</td>
            <td className="border-2 p-3">Acttive a week ago</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
