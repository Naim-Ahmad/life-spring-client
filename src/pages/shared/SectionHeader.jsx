import { Typography } from "@material-tailwind/react";

export default function SectionHeader({title, description}) {

    return (
        <div className="flex justify-center text-center py-10">
            <div>
            <Typography variant="h2" color="white" className="text-shadow">{title}</Typography>
            <Typography variant="h3" className="font-bold">{description}</Typography>
            </div>
        </div>
    )
}