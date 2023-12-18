import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button, IconButton } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axios from "../../config/axios.config";

export default function Pagination({ state: setState }) {
    const [active, setActive] = React.useState(1);

    const [doc, setDoc] = useState(0)

    // const doc = 20;

    useEffect(() => {
        axios.get('/testCount')
            .then(res => {
                console.log(res.data)
                setDoc(res.data?.count)
            })
    }, [])

    const pageButton = Math.ceil(doc / 10);
    // console.log(pageButton)

    const getItemProps = (index) => ({
        variant: active === index ? "filled" : "text",
        color: "gray",
        onClick: () => {
            setActive(index)
            axios.get(`/getPageData?skip=${index - 1}`)
                .then(res => {
                    setState(res.data)
                })
        },
    });

    const next = () => {
        if (active === 5) return;
        setActive(active + 1);

        axios.get(`/getPageData?skip=${active}`)
        .then(res => {
            setState(res.data)
        })

    };

    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
        axios.get(`/getPageData?skip=${active - 2}`)
        .then(res => {
            setState(res.data)
        })

    };

    const getButton = () => {
        const button = []
        for (let i = 1; i <= pageButton; i++) {
            button.push(<IconButton key={i} {...getItemProps(i)}>{i}</IconButton>)
        }
        return button;

    }

    return (
        doc > 10 && <div className="flex items-center gap-4 justify-center">
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={active === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">
                {getButton()}

            </div>
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={next}
                disabled={active === pageButton}
            >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
}