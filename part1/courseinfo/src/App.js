const course = {
    name: 'Half Stack application development',
    parts: [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]
}
const Header = () => {
    return (
        <h1>{course.name}</h1>
    )
}

const Content = () => {
    return(
        <>
            <p>{course.parts[0].name} {course.parts[0].exercises}</p>
            <p>{course.parts[1].name} {course.parts[1].exercises}</p>
            <p>{course.parts[2].name} {course.parts[2].exercises}</p>
        </>
    )
}

const Total = () => {
    return (
        <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
        }</p>
    )
}


const App = () => {

    return (
        <div>
            <Header />
            <Content/>
            <Total/>
        </div>
    )
}

export default App