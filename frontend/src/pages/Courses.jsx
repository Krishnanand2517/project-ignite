import { CourseCard } from "../components";

const Courses = () => {
  const courses = [
    {
      title: "C++: Beginner to Advanced",
      slug: "/cpp-beginner-to-advanced",
      duration: "30 hours",
      difficulty: "Beginner",
      imgPath: "/dev.png",
    },
    {
      title: "Python: Beginner to Advanced",
      slug: "/python-beginner-to-advanced",
      duration: "20 hours",
      difficulty: "Beginner",
      imgPath: "/dev.png",
    },
    {
      title: "Build Smart Contracts with Solana",
      slug: "/solana-smart-contracts",
      duration: "50 hours",
      difficulty: "Intermediate",
      imgPath: "/dev.png",
    },
    {
      title: "Low Latency Programming with Rust",
      slug: "/rust-low-latency",
      duration: "45 hours",
      difficulty: "Intermediate",
      imgPath: "/dev.png",
    },
  ];

  return (
    <div className="w-full line-numbers pt-32 pb-4 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <h1 className="mb-16 text-4xl 2xl:text-6xl font-fira font-bold text-primary">
        Courses
      </h1>

      <ul className="flex flex-wrap gap-8">
        {courses.map((course) => (
          <li key={course.slug}>
            <CourseCard {...course} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
