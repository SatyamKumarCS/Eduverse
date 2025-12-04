"use client";
import { useState } from "react";

export default function Logger() {
	const [visitors] = useState(12053);

	return (
		
        <div className="w-fit m-auto font-semibold gap-3 bg-gradient-to-b from-cyan-100/20 text-lg sm:text-xs p-3 sm:p-2 rounded-md shadow-md z-50">
        Visitors: <span className="text-green-500"> {visitors} </span>
      </div>
	);
}
