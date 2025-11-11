"use client"
import { FaTrash } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function LessonControlButtons({ lessonId, deleteLesson }: { lessonId?: string; deleteLesson?: (id: string) => void }) {
    return (
        <div className="float-end">
            <FaTrash className="text-danger me-2 mb-1" style={{ cursor: "pointer" }} onClick={() => lessonId && deleteLesson?.(lessonId)} />
            <GreenCheckmark />
            <BsPlus className="ms-2 me-2" style={{ cursor: "pointer" }} />
            <IoEllipsisVertical className="fs-4" />
        </div>);
}

    