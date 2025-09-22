import { redirect } from "next/navigation";


export default async function CoursesPage({ params, }: { params: Promise<{ cid: string }>; }) {
 const { cid } = await params;
 redirect(`/Courses/${cid}/Home`);
}
// redirect to the Home page of the course with id cid