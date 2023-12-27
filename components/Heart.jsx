import React from "react";
import { Input } from "@nextui-org/react";

const para = [
    ["age", "Age of the individual"],
    ["sex", "Gender of the individual"],
    ["cp", "Chest pain type"],
    ["trestbps", "Resting blood pressure (in mm Hg)"],
    ["chol", "Serum cholesterol level (in mg/dl)"],
    ["fbs", "Fasting blood sugar > 120 mg/dl"],
    ["restecg", "Resting electrocardiographic results"],
    ["thalach", "Maximum heart rate achieved"],
    ["exang", "Exercise-induced angina"],
    ["oldpeak", "ST depression induced by exercise relative to rest"],
    ["slope", "The slope of the peak exercise ST segment"],
    ["ca", "Number of major vessels colored by fluoroscopy"],
    ["Thalassemia", "a blood disorder"]
];

function Heart() {
    return (
        <div className="flex flex-col h-auto  gap-4">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                {para.map((para) => (
                    <Input
                        key={para}
                        type="text"
                        label={para[0]}
                        placeholder={para[1]}
                        className="max-w-[220px]"
                    />
                ))}
            </div>
        </div>
    );
}

export default Heart;
