const Header = ({ course }) => <h2>{course.name}</h2>

const Total = ({ sum }) => <p>Total of {sum} exercises</p>


const Course = ({ course }) => {
    const { name, parts } = course
    return (
        <div>
            <Header course={course} />
            <ul>
                {parts.map((part) => (
                    <li key={part.id}>
                        {part.name} {part.exercises}
                    </li>
                ))}
            </ul>
            <Total sum={parts.reduce((s, p) => s + p.exercises, 0)} />
        </div>
    )
}

export default Course