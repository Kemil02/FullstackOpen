import { useState } from 'react'


const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const StatisticLine = ({ text, value }) => {
    return(
        <p>{text} {value}</p>
        )
}

const Statistics = (props) => {
    const { good, neutral, bad } = props
    const all = good + neutral + bad

    if (all == 0) {
        return (
            <p>No feedback given</p>
            )
    }
    else {
        return (

            <table>
                <tbody>
                    <tr>
                        <td>good</td>
                        <td>{good}</td>
                    </tr>
                    <tr>
                        <td>neutral</td>
                        <td>{neutral}</td>
                    </tr>
                    <tr>
                        <td>bad</td>
                        <td>{bad}</td>
                    </tr>
                    <tr>
                        <td>all</td>
                        <td>{good + bad + neutral}</td>
                    </tr>
                    <tr>
                        <td>average</td>
                        <td>{(good - bad) / all}</td>
                    </tr>
                    <tr>
                        <td>positive</td>
                        <td>{(100 * good / all) + " %"}</td>
                    </tr>

                </tbody>
            </table>

        )
    }
    
}





const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>

            <Button handleClick={() => setGood(good + 1)} text="good" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
            <Button handleClick={() => setBad(bad + 1)} text="Bad" />

            <h1>statistics</h1>

            <Statistics good={good} neutral={neutral} bad={bad} />
            


        </div>
    )
}

export default App