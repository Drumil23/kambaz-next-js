export interface Assignment {
    _id: string;
    title: string;
    course: string;
    description: string;
    points: number;
    dueDate: string;
    availableFrom: string;
    type: string;
    status: "PUBLISHED" | "DRAFT";
}

export interface Course {
    _id: string;
    name: string;
    number: string;
    description?: string;
    image?: string;
    startDate: string;
    endDate: string;
}

export interface Enrollment {
    _id: string;
    user: string;
    course: string;
}

export interface Module {
    _id: string;
    name: string;
    description: string;
    course: string;
    lessons?: {
        _id: string;
        name: string;
        description: string;
    }[];
}