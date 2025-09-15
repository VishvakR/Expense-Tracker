import React from "react";

function CostomTooltip({ active, payload}) {
    if(active && payload && payload.length){
        return (
            <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                <p className="text-xs font-semibold text-purple-500 mb-1">
                    {payload[0].name}
                </p>
                <p className="text-sm text-gray-600">
                    Amount: {" "} 
                    <span className="text-sm font-medium text-gray-900">
                        {payload[0].value}
                    </span>
                </p>
            </div>
        )
    };
    return null;
}

export default CostomTooltip