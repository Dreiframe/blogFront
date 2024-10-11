import { useRef} from 'react'

import { Togglable } from './Toggleable'
import { ThingInToggle } from './ThingInToggle'

export const ToggleMain = () => {
    const noteFormRef = useRef<any>()

    const addNote = () => {
        if(noteFormRef.current){
            noteFormRef.current.toggleVisibility()
        }

        console.log('THING DONE!')
    }

    return(
        <div>
            <Togglable buttonLabel='SHOW' ref={noteFormRef}>
                <ThingInToggle onClickAction={addNote}/>
            </Togglable>
        </div>
    )
}