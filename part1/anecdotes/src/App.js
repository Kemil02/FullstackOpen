import { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

function getRandomInt(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max));
}

function getTopIndex(arr) {
    var top = 0
    var topIndex = 0
    //console.log("lenth: ", arr.length)
    for (var i = 0; i < arr.length; i++) {
        //console.log(arr[i])
        if (arr[i] > top) {
            top = arr[i]
            topIndex = i
        }
    }
    return(topIndex)
}




const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [points, setPoints] = useState(anecdotes.map(() => 0))

    const [selected, setSelected] = useState(0)

    const [topAnecdote, setTopAnecdote] = useState(anecdotes[0])

    const voteFunc = () => {
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)

        setTopAnecdote(anecdotes[getTopIndex(copy)])
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {anecdotes[selected]}
            <p>has {points[selected]} votes</p>
            <Button text={"vote"} handleClick={voteFunc} />
            <Button text={"Next anecdote"} handleClick={() => setSelected(getRandomInt(anecdotes.length))}/>
            <h1>Anecdote with most votes</h1>
            {topAnecdote}


        </div>
    )
}

export default App