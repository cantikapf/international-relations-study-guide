import React, { useState, useCallback } from 'react'
import classNames from 'classnames'
import useLocalStorage from '@illinois/react-use-local-storage'

import { Button } from './button'
import * as classes from '../styles/choice.module.sass'

const Choice = ({ id = '0', children = [] }) => {
    const [selected, setSelected] = useState(null)
    const [answer, setAnswer] = useState(null)
    const [isCompleted, setIsCompleted] = useLocalStorage(`quiz_${id}_completed`, false)
    
    const options = children.filter(child => child !== '\n')

    const handleAnswer = useCallback(() => {
        setAnswer(selected)
        if (selected !== null) {
            const isCorrect = !!options[selected]?.props?.correct
            if (isCorrect && !isCompleted) {
                setIsCompleted(true)
                window.dispatchEvent(new Event('quiz_completed'))
            }
        }
    }, [selected, options, isCompleted, setIsCompleted])
    return (
        <>
            {options.map(({ key, props }, i) => (
                <p key={key} className={classes.option}>
                    <input
                        className={classes.input}
                        name={`choice-${id}`}
                        id={`choice-${id}-${i}`}
                        value={i}
                        type="radio"
                        checked={selected === i}
                        onChange={() => setSelected(i)}
                    />
                    <label
                        className={classes.label}
                        htmlFor={`choice-${id}-${i}`}
                        dangerouslySetInnerHTML={{ __html: `<span>${props.text}</span>` }}
                    />
                </p>
            ))}
            <Button variant="primary" onClick={handleAnswer}>
                Submit
            </Button>
            {options.map(({ key, props }, i) => {
                const isCorrect = !!props.correct
                return answer === i ? (
                    <div
                        key={key}
                        className={classNames(classes.answer, { [classes.correct]: isCorrect })}
                    >
                        <strong
                            className={classNames(classes.answerLabel, {
                                [classes.answerLabelCorrect]: isCorrect,
                            })}
                        >
                            {isCorrect ? "That's correct! " : 'Incorrect. '}
                        </strong>
                        {props.children}
                    </div>
                ) : null
            })}
        </>
    )
}

export const Option = ({ children }) => {
    return children
}

export default Choice
