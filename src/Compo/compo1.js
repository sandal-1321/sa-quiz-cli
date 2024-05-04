import React, { useEffect, useState } from 'react'
import '../static/compo1.css'
import axios from 'axios'

export default function Compo1() {
    const [find, setFind] = useState([])
    const [arr, setArr] = useState()
    const [isalive, setIsalive] = useState();
    const [selectedValues, setSelectedValues] = useState({});
    const [err, setErr] = useState()
    const [cor, setCor] = useState()

    useEffect(() => {
        axios.get('https://sa-quiz-back.onrender.com/view')
            .then(res => {
                setFind(res.data);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
            });

    }, [find]);
    useEffect(() => {
        if (find.length > 0) {
            const answers = find.map(item => item.ans);
            setArr(answers);
        }
    }, [find]);

    const handleRadioChange = (event) => {
        const { name, value } = event.target;
        setSelectedValues({ ...selectedValues, [name]: value });
    };



    let Answ = (e) => {
        e.preventDefault();
        let correctAnswers = arr;
        let selectedValuesArray = Object.values(selectedValues);

        if (correctAnswers.length !== selectedValuesArray.length) {
            setErr("You Doesn't Answered All Questions.");
            setIsalive(true)
            return;
        }

        let correctCount = 0;
        correctAnswers.forEach((answer, index) => {
            if (selectedValues[`question-${index + 1}`] === answer) {
                correctCount++;
                setIsalive(false)
                console.log(`Answer ${index + 1} is correct.`);
            } else {
                console.log(`Answer ${index + 1} is wrong.`);
            }
        }
        );
        let correct = `You got ${correctCount} out of ${correctAnswers.length} questions right.`;
        setCor(correct);
    }






    return (
        <div className='main'>

            <div className='nav'>
                <h1> Problems on Trains - General Questions</h1>
            </div>

            <form onSubmit={Answ}>
                <div className='sec-1'>
                    {find.map((sen, index) => (
                        <div key={index} className='sec'>
                            <h3><span>{sen.no}.</span>{sen.que}</h3>
                            <div className='opt'>
                                {['a', 'b', 'c', 'd'].map((option) => (
                                    <div key={option} className='option'>
                                        <input type="radio"
                                            id={`${sen.no}-${option}`}
                                            name={`question-${sen.no}`}
                                            value={sen[option]}
                                            onChange={handleRadioChange} />
                                        <label htmlFor={`${sen.no}-${option}`}>{sen[option]}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='btn'>
                    <button>Submit</button>
                </div>
            </form >
            <div className='footer'>{isalive === true ? <h1>{err}</h1> : <h1>{cor}</h1>}</div>
        </div >
    )
}
